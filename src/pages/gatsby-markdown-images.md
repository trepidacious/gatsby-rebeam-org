---
title: "Images in Markdown"
date: "2019-02-20"
tags: ["Gatsby"]
description: "Use gatsby-remark-images for optimised images in markdown"
---

### Setup

This one's pretty quick - just install and configure the plugin using [the docs](https://www.gatsbyjs.org/packages/gatsby-remark-images/), and then add some normal markdown for an image, pointing to an image. You can use a nice high-resolution, high-quality original and the plugin will handle reencoding it at appropriate size and quality:

```markdown
  ![Autumn leaves](../images/gallery/leaves.jpg)
  ![Wooden post](../images/gallery/post.jpg)
```

Note that the path is relative to the Markdown document itself.

<alert variant="info">Note - if you have set up "Smart" links see the additional section below for an extra step to have them work with images.</alert>

This should get you some nice looking images:

![Autumn leaves](../images/gallery/leaves.jpg)
![Wooden post](../images/gallery/post.jpg)


### SmartLink

In [Gatsby: Smart links in Markdown](./gatsby-smart-links) we set up a component to render links as either a plain `<a>` or a Gatsby `Link` according to whether they were absolute or local URLs. This has an interesting interaction with images - gatsby-remark-images will add a link around images, to something like `/static/ca7628eb6b326e542b2379b379d30197/3f5a1/leaves.jpg`, which _is_ a local link, but not to a Gatsby page, just to an image. As a result we will produce a `Link` that causes the router to give a 404 (page not found). Fixing this is relatively easy - we just add some new cases to the `SmartLink` component:

```jsx
  // Use a plain link in a new tab for absolute urls, for /static content, and for images
  if (
    absoluteRegex.test(href) ||
    href.startsWith('/static/') ||
    href.endsWith('.jpg') ||
    href.endsWith('.png') ||
    href.endsWith('.webp')
  ) {
    return <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>

  // Assume everything else is a local link, which should go through the router
  } else {
    return <Link to={href}>{children}</Link>
  } 
```

This gives an added bonus of opening images in a new tab, rather than disrupting our single-page app approach.