---
title: "Tagless Final"
date: "2019-02-26"
tags: ["Scala", "functional programming", "tagless"]
description: "A walkthrough from State to Free to tagless final"
---

<message negative=true>The following are largely notes for myself. Feel free to add an issue to the site's github repo (link at right of the header) with errors or suggestions.</message>

Also note that the code is available on [scalafiddle.io](https://scalafiddle.io/sf/Oku0bdX/0).

### Scope, required background

There are already a number of great resources about tagless final in Scala looking at the technique from a theoretical point of view, with a level of detail and assumed expertise suitable for other people developing the cutting edge of Scala, and some guides to just using the style with examples, so it would be pointless to try to add to these. However one area where this doc might help is in providing a walkthrough from a simple use case, to "inventing" tagless final style, motivated by shortcomings of other typical techniques (plain monads, Free, etc.). We can see what each technique provides, what the common features are, and so explain how tagless final builds on these to provide some new capabilities.

A brief initial ramble gives an outline of why we might want to use pure functions, and what we get from using monads, but the details are not covered for either topic. The reader might also want to read up on State if they are not already familiar with it.

### Motivation

Like probably many other people using Scala, for the past few years I've been on an enjoyable wander through functional programming concepts. Pretty soon after grasping the concept of pure functions, it seems to be fairly natural to say "Ok that's great for calculations, but how do I actually make anything change? How do I write a value to a file, or even read the time or generate a random number?".

Of course the answer here turns out to lie in something that seems like a word-trick at first - you don't write programs that have actual side effects, you produce data that represents those programs. This data can be passed around, modified and inspected, and will never actually do anything until it reaches the famous "end of the world" - something at the "edge" of your application that can take the representation of programs, and make them happen, including the actual side-effects. 

Again this seems a little like a trick - if we end up triggering side-effects like writing to disk in the end, why go to this trouble to delay it? The answer here is relatively straightforward - if side-effects cause problems with reasoning, reliability, our understanding of the code, etc. then pushing them to the "end of the world", or the "edges" of our program means that we only need to worry about them in those places. The rest of the time we can be happy that everything we have is a pure function or data, and act accordingly.

The result of all the above is that we hope to end up writing most of our code without side effects, only representations of them - we'll refer to these as "programs" for simplicity. If we are performing pure calculations, this doesn't really make much difference - we just calculate results from inputs as we normally would. If we are writing something modelling actual changes in the real world we will need some more tools!

### Configuration data example

For example, let's say we are writing an editor for some data. Imagine a simple configuration format that's just of `type Data = Map[String, String]`. As long as we use an immutable `Map` the data itself is very straightforward. However we now need to represent edits to the data, and here is where we are presented with a pretty wide range of options.

### Plain functions are too plain

The simplest possible way to represent an edit is directly as `Data => Data`. We can apply this to some input data, and get a new output data with edits applied. We can of course compose functions so we can apply one modification after another. However that is about all we can do with these functions. Any "program" we write with them will look pretty simple, since each stage (function) can only influence the next by changing the contents of the data, and we don't really want to encourage adding arbitrary contents to the data just to "pass on information" to the following stages. As a simple example, we might want to read a value from the Data, and then write it back at a later stage, but there is no way to pass this value from an earlier function to a later one.

### Just use State!

Luckily there is a common solution to this - the `State` monad, and it will do the job pretty well. I've always found the name slightly misleading - the monad definitely deals with the concept of state, but instances of the monad actually represent transformations of data (the state), rather than the state itself, which is just what we are after for representing edits to our data. 

Even better, State can produce an "output" alongside the modified data, this is the `A` in its type, `State[S, A]`. Each `State` value is essentially a function `S => (S, A)` - it takes the state data `S`, and produces both a new state data value, and an "output" `A`. 

This means that when `State`s are combined using `flatMap`, they are not just run one after another in sequence, but in fact each `State` in the sequence can use the outputs of all previous `State`s (as well as the `Data`) to determine what `Data` and output to produce itself. 

<message info=true>If the preceding sentence doesn't make sense, try reading "State" as "Edit" and it may make more sense - when dealing with State, always remember that instances of State represent changes to state, not a particular state itself</message>

To see how using `State`, or any other monad, makes values from previous stages available to later stages, consider a very simple example:

```scala
  for {
    outputOfA <- a
    outputOfB <- b
    outputOfC <- c
  } yield (outputOfA, outputOfB, outputOfC)
```

Here we have 3 State instances, a, b and c, and we combine the "output" of each into a tuple. Now we can look at how this is "desugared" into calls to the monad's `flatMap` and `map` functions:

```scala
  a.flatMap(
    outputOfA => b.flatMap(
      outputOfB => c.map(
        outputOfC => (outputOfA, outputOfB, outputOfC)
      )
    )
  )
```

You can see that `outputOfA` is in scope for all subsequent stages, as is `outputOfB`. This is what lets us write for-comprehensions that resemble "imperative" code with side effects, but where those side effects only occur later.

This also means that we can make composable building blocks, and combine them into larger programs. We could for example have:

```scala
  val findTokens: State[Data, List[String]] = ???
  def eraseValues(values: List[String]): State[Data, Unit] = ???

  val eraseTokens: State[Data, Unit] = for {
    tokens <- findTokens
    _ <- eraseValues(tokens)
  } yield ()
```

In this fairly artificial example, `findTokens` finds any values in the config Data that might be secret tokens that shouldn't be there, and `eraseTokens` uses this list to delete any entries with those values, by providing the result of `findTokens` to `eraseValues`.

### State's shortcomings

This gives us a pretty effective approach, however there are still shortcomings. Firstly, if we use `State[Data, Unit]` directly as our "edit" type, any arbitrary transformation of the data is valid. In some situations, we might want only to permit additions to the map, or changes to particular keys, or to make sure some invariant is preserved by operations, but with `State` we will have to accept any transformation at all. 

### Okay then use Free!

This brings us to the next step - the `Free` monad. The implementation of `Free` tends a little towards boilerplate, so we'll just go over the key steps of the approach here. 

First, we define a domain-specific language (DSL) by defining some "operations" or "actions". In our case, two that would make sense would be:

1. `get`, accepting a key `String` and producing an `String` for the corresponding value (to make the examples simpler, we will return an empty string for missing keys, but in a real DSL you might want to use `Option[String]` instead).
2. `set`, accepting a key and value and putting them into the map. 

Second, we (or more accurately a library like [Cats](https://typelevel.org/cats/)) will produce a `Free` monad from these operations, which will have instances representing `get` and `set`. 

Since this is a monad, these can still be combined the usual way with flatMap and map, and used in for-comprehensions, giving us something fairly natural looking:

```scala
  for {
    a <- get("keyA")
    b <- get(a)
    _ <- set("keyC", b)
  } yield ()
```

Here we get the value for key "keyA", then use that as a key to look up another value b, then finally set the value for "keyC" to that value b, and return unit.

Instances of the `Free` monad essentially just store enough information to recreate a sequence of operations in our DSL - unlike say the `State` monad they can't be directly "run" on `Data` to produce a modified `Data` result, however they can be easily transformed into a "target" monad like `State` that we _can_ run. 

This is done by translating each operation from the DSL to an instance of the target monad. We can then use the resulting monad as usual. So we've picked up a nice bonus, in that we are no longer tied to any one target monad - if we get sick of `State` and want to use `IO`, or any other monad, we can. We'll want to keep this advantage!

### Some problems solved, more noticed

So, have we solved the original problem? Yes - by picking the desired set of operations in our DSL, we can exactly restrict what a program is capable of doing, which is what we needed. If we want to "bake in" some invariants in the `set` operation, we can - this is done when we transform to the "target" monad. If we want to omit the `set` operation completely, we can. 

The next problem comes when we want to have different sets of operations for different programs. For example we might want to have "views" as well as "edits", where a "view" can only use our `get` operation, but an "edit" can use both our `get` and our `set` operation. This would allow us to keep track of whether a given program might change the data, and check at compile-time that we won't try to change a locked configuration.

While it is possible to achieve this with Free, it requires a [significant amount of juggling and boilerplate](https://underscore.io/blog/posts/2017/03/29/free-inject.html). Hopefully tagless final will help us with this!

### Common factors

Before we get to tagless final, let's look at similarities between the two implementations we've looked at so far.

Firstly, both use monads. As described for `State`, this is what allows us to:

1. Represent a sequence of operations, where
2. each operation has access to the results of all previous operations, and 
3. each operation has access to the `Data`

Secondly, the important improvement when moving from using `State` directly to using `Free` was that we took away the ability of programs to use all the "capabilities" of `State` (e.g. arbitrary edits on the data) and instead gave them a restricted set of basic operations. In fact we took away all knowledge that we were going to end up transforming into a `State` monad at all, and made the choice of "target" monad flexible.

So essentially we want to use an arbitrary monad for our programs, and we want programs to have to build themselves from only a pre-determined set of initial values of whichever monad is in use.

Tagless final just uses a different approach to achieve this same result.

### Finally, tagless

Firstly, we require that our edit programs can produce a result in any arbitrary monad:

```scala
  trait Edit{
    def apply[F[_]: Monad](): F[Unit]
  }
```

So for any type `F[_]` with a `Monad` typeclass available, our edit needs to represent itself in that monad. If we want a State monad, we just ask for one:

```scala
  val someEdit: Edit = ???

  type S[A] = State[Data, A]

  val someEditAsState: State[Data, Unit] = someEdit[S]
```

Note we have a type alias `S[A]` to give us the required `F[_]` type parameter describing our target monad, and `edit[S]` is equivalent to `someEdit.apply[S]`.

`Edit` knows nothing about the actual monad used other than that it is a monad, so it can't cheat and use any unwanted instances of that monad. In fact at the moment it can't use any instances at all... let's fix that minor flaw!

```scala
  trait Edit{
    def apply[F[_]: Monad](implicit ops: EditOps[F]): F[Unit]
  }
```

We'll see how `EditOps` are implemented in a moment, but the purpose of the implicit `ops` parameter is to give some instances of our target monad `F` to our `Edit`, for it to use to build its output `F`. 

While we can only start from the "approved" instances of `F` provided by ops, we know that `F` is a monad, so we can compose the ops together to build larger programs. 

As an example, if ops contains just `get` and `set` operations as described above, that is all `Edit` can do. If we remove `set`, then `Edit` will be read-only - we'll see later how we can represent both read-write and read-only edits at the same time.

### So what are EditOps?

`EditOps` is just a trait doing pretty much what you might expect:

```scala
  abstract class EditOps[F[_]] {
    def get(key: String): F[String]
    def set(key: String, value: String): F[Unit]
  }
```

That is, each instance of `EditOps` works with a particular monad `F`, and will produce instances of that monad for our `get` and `set` operations. We can provide whatever operations we want to be available to programs, and only those, in the `EditOps`. They don't have to be produced by functions, we can also have just plain values etc.

### Implementing EditOps

To look at a concrete implementation, we could have the following for good old `State`:

```scala
  object EditOpsState {
    type S[A] = State[Data, A]
    implicit val instance: EditOps[S] = new EditOps[S] {
      def get(key: String): S[String] = State.inspect(_.get(key).getOrElse(""))
      def set(key: String, value: String): S[Unit] = State.modify(data => data.updated(key, value))
    }
  }
```

Again we've just aliased `State` to `S` to give it one type parameter (and we could have used [kind projector](https://github.com/non/kind-projector) for this).

### Implementing an Edit

The final step is to write an actual `Edit` implementation. This looks very similar to just using a monad like `State` directly, with a little extra boilerplate:

```scala
  val edit: Edit = new Edit{
    def apply[F[_]: Monad](implicit ops: EditOps[F]): F[Unit] = {
      import ops._
      for {
        a <- get("keyA")
        b <- get(a)
        _ <- set("keyC", b)
      } yield ()
    }
  }
```

So we still have the usual for comprehension, and indeed this looks exactly like it did before, but we add `import ops._` to get easy access to operations (we could instead use `ops.get` and `ops.set` inside the for-comprehension). We have then wrapped this up in an `Edit` instance. 

As a side-note, although this isn't too bad at present it should get better with Scala 3, for example using 

### Brief detour to the end of the world

When we want to run an `Edit` at the end of the world, we simply pick a "target" monad `F`, make sure an appropriate `EditOps` instance is in implicit scope for `F`, and then call `edit[F]` to get an instance of `F` we can run.

### So what have we achieved?

So far, we've just recreated what we had with `Free` - our operations are composed as monads, we have a restricted set of them available in programs, and we can choose any suitable "target" monad to actually run our programs (provided we implement `EditOps` for that monad).

But now we can also  achieve our goal of different sets of operations working together by splitting up our operations. We can easily have a `ReadOps` trait providing read-only operations, in this case `get`, and another `WriteOps` trait with write operations, in this case just `set`. Our Edit will now require both:

```scala
  trait Edit {
    def apply[F[_]: Monad](implicit readOps: ReadOps[F], writeOps: WriteOps[F]): F[Unit]
  }
```

But a new 'View' trait won't:

```scala
  trait View[A] {
    def apply[F[_]: Monad](implicit readOps: ReadOps[F]): F[A]
  }
```

We then know that a View can only produce a program with read-only operations - it simply has no access to any `WriteOps`. But if we want to use a `View` from within an `Edit` we can - the edit's `readOps` will be implicitly available. Since we are using implicit parameters we don't need to keep track of the ops instances, but the compiler will warn us if we try to do something requiring operations we don't have access to in a program.

By grouping the operations in traits we have a lot of flexibility in building a tree of capabilities, for example by extending traits to add extra operations or to combine multiple traits into one.

### Do we always need Monad?

In all the examples above, we've used `[F[_]: Monad]` in our `Edit` and `View` traits - i.e. we have stated that `F` must be a monad (have a `Monad` typeclass available). However this isn't required - if there is another typeclass that provides what you need for a program (for example `Applicative`) then this can be used instead. 

Again, since these are typeclasses and so are passed implicitly, you don't need to keep track of which one you are working with when using a program - the compiler will tell you if you try to use a `Monad` when you only have an `Applicative`. On the other hand it's no problem to call an `Applicative` program from a `Monad` one, since all monads are applicative. So we've actually picked up another bonus capability - precisely describing not just which operations a program uses, but how it can combine them. 

Another bonus relative to Free is that our programs (e.g. `Edit` and `View`) are essentially just functions, rather than an additional layer of representation like Free. When we `apply` them, they just build the actual monad we need directly. This does lead to one disadvantage - these functions are "opaque" - we can only tell what they do by calling them. On the plus side, we can for example use a target monad that _can_ be inspected and manipulated, perhaps even Free :) This loses the efficiency advantage, but keeps the others.

### Summary

In summary we can look at the construction of tagless final as being based on:

1. Asking programs to provide themselves "as" arbitrary monads, thus allowing us to choose the target monad while preventing the program from using any knowledge of the target monad, and 
2. Implicitly providing programs with some monad instances to start from, which they can then combine arbitrarily.

