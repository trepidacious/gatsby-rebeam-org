---
title: "Semantic UI in Markdown posts"
date: "2019-02-15"
tags: ["Gatsby", "Semantic UI"]
description: "Configuring Gatsby to render Markdown using Semantic UI components."
---

### Introduction

In [Gatsby: Setting up a simple site](/gatsby-static-site) we set up Gatsby to process markdown files to blog pages, including highlighting code samples.

Out of the box, using the Semantic UI styles will handle simple elements in markdown, for example headers. However we can get better styling by using Semantic UI components from our markdown.

The initial setup is covered by the docs on [remark custom components](https://using-remark.gatsbyjs.org/custom-components/). We will tweak this to render some Semantic UI components:

<Alert variant="info">Note that since this entry was written, we've updated rebeam.org to use react-bootstrap. As a result, while the instructions are correct, the results shown use react-bootstrap rather than Semantic-UI.</Alert>

### Setup

1. Install [rehype-react](https://github.com/rhysd/rehype-react):
  ```
  yarn add rehype-react
  ```

2. In the page or component where you query and display posts, make a function to render the htmlAST version of your markdown using Semantic components:
  ```jsx
    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 
        'ul': SemanticUL, 
        'ol': SemanticOL,
        'li': SemanticLI 
      },
    }).Compiler
  ```
  This will render list elements as custom components, which we will create next.

3. Create new components for lists:
  ```jsx
    const SemanticOL = ({children}) => <List relaxed ordered as='ol'>{children}</List> 
    const SemanticUL = ({children}) => <List relaxed bulleted as='ul'>{children}</List> 
    const SemanticLI = ({children}) => <List.Item as='li'>{children}</List.Item> 
  ```
  Both of these just pass through children to a `List` with the appropriate props set. If you prefer a different style of Semantic list, just tweak the props.

4. Update the graphQL query to retrieve `htmlAst` instead of `html`.

5. Render the post with:
  ```jsx
    renderAst(post.htmlAst)
  ``` 
  rather than: 
  ```jsx
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  ```
  This will get you nicely styled lists - but other Semantic components can be added in the same way. See the [caveats](https://using-remark.gatsbyjs.org/custom-components/#caveats) for some gotchas! 

6. The default styling for `ul` and `ol` lists in semantic doesn't respect the `relaxed` modifier. We can use `list.overrides` to make line spacing match paragraphs, and to use the same relaxed padding as other Semantic lists:
  ```less
    ul.ui.list.relaxed li,
    ol.ui.list.relaxed li,
    .ui.list.relaxed > .item,
    .ui.list.relaxed .list > .item {
      line-height: @paragraphLineHeight;
    }

    ul.ui.list.relaxed li:not(:first-child),
    ol.ui.list.relaxed li:not(:first-child),
    .ui.list.relaxed > .item:not(:first-child),
    .ui.list.relaxed .list > .item:not(:first-child) {
      padding-top: @relaxedItemVerticalPadding;
    }

    ul.ui.list.relaxed li:not(:last-child),
    ol.ui.list.relaxed li:not(:last-child),
    .ui.list.relaxed > .item:not(:last-child),
    .ui.list.relaxed .list > .item:not(:last-child) {
      padding-bottom: @relaxedItemVerticalPadding;
    }
  ```

6. For extra credit, we can add another component mapping:
  ```jsx
    'icon': Icon
  ```
  and use it in markdown:
  ```markdown
    *Made with <icon name='heart' color='violet'></icon> by rebeam.*
  ```
  Which should produce the following rather clich&eacute; result: 
  
  *Made with <heart></heart> by rebeam.*

7. We can also display tables with Semantic:
   
   ```markdown
   | Bridge       | Designer       | Length |
   |--------------|----------------|-------:|
   | Brooklyn     | J. A. Roebling |   1595 |
   | Manhattan    | G. Lindenthal  |   1470 |
   | Williamsburg | L. L. Buck     |   1600 |
   ```

   | Bridge       | Designer       | Length |
   |--------------|----------------|-------:|
   | Brooklyn     | J. A. Roebling |   1595 |
   | Manhattan    | G. Lindenthal  |   1470 |
   | Williamsburg | L. L. Buck     |   1600 |

   This needs the following custom components:
   ```jsx
    'table': Table,
    'thead': Table.Header,
    'tr': Table.Row,
    'td': Table.Cell
   ``` 

   `Table` can also be customised - the example above uses `celled color='violet'`, see [templates/blog-post.js](https://github.com/trepidacious/gatsby-rebeam-org/blob/master/src/templates/blog-post.js).

8. We can display blockquotes with a Semantic `Message` with a quote icon:

   ```jsx
   const MessageInfo = ({children}) => 
     <Message icon>
       <Icon name='quote left' color='black'></Icon>
       <Message.Content>
         {children}
       </Message.Content>
     </Message> 
   ```

   Register this with `'blockquote': MessageInfo` in `renderAst`. This will give you:

   ```markdown
    > **Nicely formatted blockquotes**  
    > Quote all the things.
   ```

   Note we need a couple of spaces on the end of the first line to get a linebreak without a new paragraph.

   > **Nicely formatted blockquotes**  
   > Quote all the things.

   You can still use other types of component directly, for example here is `Alert` from react-bootstrap. Just register the component directly, e.g. `'alert': Alert`:

   ```jsx
   <alert variant="danger">**Scary message!**</alert>
   ```

   <alert variant="danger">**Scary message!**</alert>
