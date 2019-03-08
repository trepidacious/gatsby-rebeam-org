---
title: "Smart links in Markdown"
date: "2019-02-16"
tags: ["Gatsby"]
description: "Automatically use gatsby-link for internal links in markdown"
---

### Introduction

In [Gatsby: Semantic UI in Markdown posts](/semantic-ui-in-markdown-posts) we set up Semantic UI components in Markdown. Another use of custom components in Markdown is to give "smart" links, so we can use [gatsby-link](https://www.gatsbyjs.org/docs/gatsby-link/) for internal (relative) links to work nicely with the Gatsby router, or an appropriate `<a>` for external links.

### Setup

1. First we need to distinguish relative and absolute URLs - there are libraries to do this, but they tend to do a lot more than we need, so we'll start with some regex:
  ```jsx
    /**
     * Case-insensitive regex to identify absolute URLs
     * Matches start of line, then either:
     * a) a letter, then zero or more letters or 
     *    numbers, then a colon (a protocol)
     * b) a double forward slash (start of a 
     *    protocol-relative path)
     */
    const absoluteRegex = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  ```
2. Next we define a component to render as either an `<a>` set up to [open safely in a new tab](https://developers.google.com/web/tools/lighthouse/audits/noopener), or a `Link`:

   ```jsx
     const RelativeOrAbsoluteLink = ({href, children}) => {
       if (absoluteRegex.test(href)) {
         return <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
       } else {
         return <Link to={href}>{children}</Link>
       } 
     }
   ```

   Note that for different applications and site layouts you might need to tweak the logic above - for example when working with [Gatsby: Images in Markdown](./gatsby-markdown-images) you will need to add some exceptions for static and image links.

3. Finally we need to add this as a custom component for rehype, standing in for `<a>`. You can see here the semantic components from before, and some other useful mappings:
  ```jsx
    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 
        'ul': SemanticUL, 
        'ol': SemanticOL,
        'li': SemanticLI,
        'hr': Divider,
        'icon': Icon,
        'label': Label,
        'a': RelativeOrAbsoluteLink // Our new smart link
      },
    }).Compiler
  ```
  