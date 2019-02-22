---
title: "Gatsby: Images in Markdown"
date: "2019-02-20"
---

Use gatsby-remark-images for optimised images in markdown<!--end-->

<label color='violet' as='a' href='https://www.gatsbyjs.org/'>Gatsby</label>

---

### Setup

This one's pretty quick - just install and configure the plugin using [the docs](https://www.gatsbyjs.org/packages/gatsby-remark-images/), and then add some normal markdown for an image, pointing to an image. You can use a nice high-resolution, high-quality original and the plugin will handle reencoding it at appropriate size and quality:

```markdown
  ![Autumn leaves](../images/gallery/leaves.jpg)
  ![Wooden post](../images/gallery/post.jpg)
```

Note that the path is relative to the Markdown document itself.

This should get you some nice looking images:

![Autumn leaves](../images/gallery/leaves.jpg)
![Wooden post](../images/gallery/post.jpg)