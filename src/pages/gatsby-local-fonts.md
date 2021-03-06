---
title: "Local fonts in Gatsby"
date: "2020-04-18"
tags: ["Gatsby", "fonts"]
description: "Set up local fonts on Gatsby sites, including downloading Google fonts"
---

### Introduction

It's easy to just use a CDN for fonts, for example [Google Fonts](https://fonts.google.com/), but sometimes fonts aren't available there, for example [Metropolis](https://github.com/chrismsimpson/Metropolis), or you might want to reduce your external dependencies. There are quite a few ways of using local fonts (ones included in your site) with Gatsby, but this approach is the one that worked for me ;)

### Setup

1. First you'll need the fonts in web formats. If the font is available on [Google Fonts](https://fonts.google.com/), the quickest way is to use this [google webfonts helper](https://google-webfonts-helper.herokuapp.com/fonts), which will let you download a zip of any available fonts, and display the required CSS contents.
2. If the font isn't on [Google Fonts](https://fonts.google.com/), download it in whatever form you can find (e.g. `.ttf`), and then use a converter like [fontsquirrel](https://www.fontsquirrel.com/tools/webfont-generator), or have a look at using the python `fonttools` package to subset and convert the font, [this page](https://dev.to/benjaminblack/save-your-users-data-by-subsetting-web-fonts-5eo9) has a good description, however you might want to skip using `glyphhanger` and instead just use a predefined set of glyphs in `glyphs.txt` (*TODO*: provide a reasonable set of glyphs).
3. Now you need to configure gatsby - [this page](https://dev.to/iangloude/4-steps-to-self-hosted-fonts-in-gatsby-aj2) has a good approach using [gatsby-plugin-web-font-loader](https://www.gatsbyjs.org/packages/gatsby-plugin-web-font-loader/). Ignore the comment about this being "depreciated" (sic) - it is not deprecated as far as I can tell from the gatsby plugin page. The basic steps are repeated below.
4. Put font files in `static/fonts`, in all the formats you want to support - the "modern" recommendation is for `woff` and `woff2` to support most browsers.
5. Create a `fonts.css` file in `static/fonts`. This can be the one generated by google-webfonts-helper, or if you don't have one just use a format similar to this, replacing the font name. You should have one `@font-face` per font/style combination. Use `font-style: italic;` for italics, and if you have multiple weights `font-weight` should be a multiple of 100. Note that we've also added `font-display: swap` - this is optional, but instructs the browser to display your fall-back font first, then swap directly from this to the web font when it loads. Without this browsers may make the text invisible at some stage in the page load.

   ```css
   @font-face {
    font-family: 'HansKendrick';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('HansKendrick-Regular.eot'); /* IE9 Compat Modes */
    src: url('HansKendrick-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('HansKendrick-Regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('HansKendrick-Regular.woff') format('woff'), /* Modern Browsers */
         url('HansKendrick-Regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('HansKendrick-Regular.svg#HansKendrick-Regular') format('svg'); /* Legacy iOS */
    }
   ```

6. Install the gatsby plugin with `yarn add gatsby-plugin-web-font-loader`.
7. Add the plugin to `gatsby-config.js` in the `plugins` array. Make sure to adapt this for the list of font names you specified in `fonts.css`:

   ```json
   {
          resolve: "gatsby-plugin-web-font-loader",
          options: {
            custom: {
              families: ["HansKendrick, Font2, Font3"],
              urls: ["/fonts/fonts.css"],
            },
          },
        },
   ```

8. Note that you may need to restart `yarn develop` to see the changes - this might be caused by using static assets?
