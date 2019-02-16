---
title: "Gatsby: Setting up a site"
date: "2019-02-02"
---

Configuring Gatsby as a simple blog site.<!--end-->

<label color='violet' as='a' href='https://www.gatsbyjs.org/'>Gatsby</label>
<label color='blue' as='a' href='https://www.gatsbyjs.org/'>Semantic UI</label>
<label color='teal' as='a' href='https://www.netlify.com/'>Netlify</label>
<label color='grey' as='a' href='https://prismjs.com/'>Prism.js</label>

---

### Introduction

This website uses the [Gatsby](https://www.gatsbyjs.org/) static site generator with [Semantic UI React](https://react.semantic-ui.com/) components, markdown for blog entries, and hosting on [Netlify](https://www.netlify.com/).

The process is actually fairly straightforward and there are excellent tutorials for most of it, however there are a few areas that took a little research. For future reference, here are the relevant links and fixes:

### Gatsby setup - tutorial

The [Gatsby.js Tutorial](https://www.gatsbyjs.org/tutorial/) is absolutely excellent. Following it through fully sets up the markdown to blog conversion. While each stage tends to start by asking you to create a new page from scratch, this often isn't necessary. The sections on styling are also not required if you intend to use a self-contained UI like Semantic.

### Adding Semantic UI

Once you're finished with the tutorial, you can remove any styling you added, and copy the relevant parts of this [Gatsby Semantic UI starter](https://github.com/pretzelhands/gatsby-starter-semantic-ui). There's actually not much needed here, so just merge in the webpack config from `gatsby-node.js` and add any packages from `package.json` you are missing (less + gatsby plugin, semantic-ui-less and semantic-ui-react). You can now just import and use Semantic components in pages.

### Setting up a layout with Semantic

Replace the layout provided by the tutorial with one using Semantic - I started from the [homepage layout example](https://react.semantic-ui.com/layouts/homepage) which shows the use of a `Menu`, `Container` etc. to give a fixed top bar. This was tweaked substantially to give the current [header.js](https://github.com/trepidacious/gatsby-rebeam-org/blob/master/src/components/header.js) used on this site.

### Customising Semantic theme

The semantic theme can be overriden in `src/semantic/site`. For example fonts and colors are defined in in `site.variables`. We can add new colors:

```less
@themeDarkGrey       : #2E3947;
@themeGrey           : #37474F;
@themeLightGrey      : #4F5A5A;
@themeBrightYellow   : #FFECB2;
@themeRed            : #EC6B6B;
@themeCyan           : #16E6E6;
@themeBrightCyan     : #8DF7F7;
@themeYellow         : #FFC400;
@themePurple         : #AD82F9;
@themeBrightPurple   : #C3A0FF;
```

These will be available in other `less` files. `site.overrides` can be used for styling custom classes etc.

To find other variables to customise, have a look in `node_modules/semantic-ui-less/themes/default` - you can copy and paste to the corresponding location in your site's theme, then modify. You only need to copy the variables you want to modify, other values will be inherited from the default theme.

### Semantic fonts

Fonts are also configured in `src/semantic/site/site.variables`. The default theme only uses one, Lato. We can add more variables to define a font for code examples:

```less
@codeFontName           : 'Fira Mono';
@codeGoogleFontName     : 'Fira+Mono';
@codeGoogleFontSizes    : '400';

@codeFont          : @codeFontName, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
```

We then need to modify the font request to get both the existing page font and our new code font:

```less
@googleFontRequest : '@{googleFontName}:@{googleFontSizes}|@{codeGoogleFontName}:@{codeGoogleFontSizes}&subset=@{googleSubset}';
```

We can then use the `@codeFont` variable for the `font-family` of code samples - see later section on configuring `prism.js`.


### Using image and file resources

Using a plain image file (or an SVG as used for the logo on this site) was not covered by the Gatsby tutorial - however there is a good [doc page on adding images, fonts and files](https://www.gatsbyjs.org/docs/adding-images-fonts-files/) - essentially just import the file as if it were a JS file, and this will give you a path you can use in an `img`'s `src` attribute.

### Making a responsive header

The next step was to make the navbar/header for the site responsive. Initially I tried using the `Responsive` component from Semantic. This works well in `gatsby develop`, but using `gatsby build` and then `gatsby serve` produced odd errors. When viewed at desktop window sizes, the styling of some elements of the navbar was incorrect (this is intermittent, but can be reproduced consistently by running a lightouse audit - the page is incorrect after the audit completes). The root cause of this is SSR, server-side rendering. Because this is done on the server, it doesn't (easily) know what resolution the browser window will display when the server-rendered React components are "hydrated" on the client. In fact it renders at a window width of 0, and so selects the smallest display size. If this isn't what the client displays on its first render then React can't match up the server rendered data to the actual components. There are several solutions to this discussed in Semantic and React issues and docs, for example attempting to estimate the client size from its requests, or using state in components to trigger a re-render on the client. However these each have issues. As a simpler solution, the header just renders both the mobile and desktop components (they are both fixed to the top of the window so overlap), and uses plain CSS media queries to set the one we don't need to `display: none`. While this is a little less efficient (there is an extra set of invisible components at all times) it does work fine with SSR.

Here's the mobile version of the header:
```jsx
// Mobile header
<Menu 
  className='mobile-header'
  fixed='top'
  inverted
  size='huge'
  style={{ background: '#464444' }}>

  <Container>

    <Link to='/' key='rebeam'>
      <LogoMobile />
    </Link>
    
    <Dropdown item text='rebeam' floating pointing>
      <Dropdown.Menu >
        {links.map(({name, color, to}) => (
          <LinkedDropdownItem color={color} to={to} key={name}>
            {name}
          </LinkedDropdownItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Menu position='right'>
      <Menu.Item as='a' href='https://github.com/trepidacious' title='Github' target="_blank" rel="noreferrer">
        <Icon name="github" link inverted size='large' fitted></Icon>
      </Menu.Item>
    </Menu.Menu>

  </Container>

</Menu>
```

### Optimised images with gatsby-image

Finally, the `image.js` page shows a very simple example of the use of the `gatsby-image` plugin/component to display the site logo. This uses a source image at 512x512 resolution, displaying at 256x256. If you check the page you can see that this produces a `picture` tag with multiple sources for 1x, 1.5x and 2x screens (i.e. normal and "hidpi" or "retina" displays). In addition, the image has a preloaded thumbnail that is then "blurred up" to the real image when it loads. This does show a possible issue with the plugin - each time the page displays (e.g. using forward/back in browser) the low-resolution thumbnail image is displayed behind the real one and then faded out. This is only visible because the image is non-rectangular with an alpha channel - should probably file an issue on this!

### Code highlighting with Prism.js

There's an excellent tutorial for the [gatsby-remark-prism](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/) plugin. There's a lot of detail here, covering displaying line numbers, line highlighting etc., and since we have semantic-ui set up we can use less for our code styling. Feel free to read the whole tutorial, but the required parts are:

1. [Install](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#install)
2. [How to use](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#how-to-use) - adding the plugin to `gatsby-config.js`. You might want to set `noInlineHighlight: true`.
3. Instead of following [Include CSS](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#include-css) you can instead have a look at `src/semantic/site/site.overrides`, where we have translated the `tomorrow` theme into less, allowing the colors to be chosen with variables. This allows us to reuse our theme colors from `site.variables`, and use the `@codeFont` font family we defined in "Semantic fonts" earlier. We've also tweaked the formatting a little to give us rounded borders, to align the text to our columns, and to add some responsive variations. Finally we've adjusted the inline-code styles since we are not using prism.js for these, so we can remove the required `"language-"` class and use a light grey background with dark text - using the dark background here is a little jarring.
4. We can now add some nicely formatted code to our markdown in the normal way, see [Usage in Markdown](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#usage-in-markdown)
