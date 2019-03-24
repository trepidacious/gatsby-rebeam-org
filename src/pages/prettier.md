---
title: "Configuring Prettier with VS Code"
date: "2019-03-24"
tags: ["Prettier", "Gatsby", "Javascript", "Git", "VS Code"]
description: "Configure Prettier to work with VS Code, command line and Git"
---

### Introduction

[Prettier](https://prettier.io) provides opinionated code formatting for Javascript, JSX and many other languages and formats. If nothing else it will catch missing semicolons and use quotation marks consistently.

### Add to VS Code

[prettier-vscode](https://github.com/prettier/prettier-vscode) seems to be the preferred option - just install as usual, then use the "Format Document" command to format the current document. This is handy for one-off conversions using the version of prettier and default configuration bundled with the extension, but there are advantages to installing prettier ourselves - we can then determine the version and configuration to use.

### Install and test Prettier

First, [install](https://prettier.io/docs/en/install.html) prettier itself:

```
yarn add prettier --dev
```

Next, try checking our sources with the default settings:

```
.\node_modules\.bin\prettier --check "src/**/*.js"
```

This uses the `prettier` binary installed in node_modules, and runs a check on all `.js` files in our `src` directory and subdirectories. You should see a list of the files checked and time taken, then a message telling you whether any code style issues were found. The fiels themselves will not be changed.

### Configuration

There are quite a few ways to [configure prettier](). We'll just create a `.prettierrc` file in the root of our project, and specify a single setting:

```json
{
  "endOfLine": "lf"
}
```

This uses the (sensible) default settings for everything except line endings - here we check we have LF rather than CRLF, to avoid confusion. You can omit this if you want, and just have a blank configuration: `{}`. The advantage of having a configuration file, even an empty one, is that it ensures that our command-line `prettier` and the VS Code plugin are using the same (default) settings.

There are a variety of [options](https://prettier.io/docs/en/options.html) available - but before changing them, consider reading the [Option Philosophy](https://prettier.io/docs/en/option-philosophy.html) for a number of good reasons why you should stick to the defaults!

### Command line

When you first add prettier, you may well have a large number of files that need to be formatted. We ready saw how to run a check against all `.js` files in `src`:

```
.\node_modules\.bin\prettier --check "src/**/*.js"
```

To write the changes to files, we use `--write`:

```
.\node_modules\.bin\prettier --write "src/**/*.js"
```

To make this easier, we can add yarn scripts - add the "format" and "check-format" lines to the "scripts" section of your `package.json` file:

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.js\"",
    "check-format": "prettier --check \"src/**/*.js\""
  }
}
```

We can then run a check using yarn:

```
> yarn check-format
yarn run v1.9.4
$ prettier --check "src/**/*.js"
Checking formatting...
All matched files use Prettier code style!
Done in 0.89s.
```

### Format before committing to Git

Using a [pre-commit hook](https://prettier.io/docs/en/precommit.html) allows us to ensure we only ever commit properly-formatted code. I used [option 1](https://prettier.io/docs/en/precommit.html#option-1-lint-staged-https-githubcom-okonet-lint-staged).

First install `lint-staged` and `husky`:

```
yarn add lint-staged husky --dev
```

Then configure in `package.json` - we'll just run on `.js` and `.json` files for now:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,json}": ["prettier --write", "git add"]
  }
}
```

