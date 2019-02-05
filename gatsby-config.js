module.exports = {
  
  siteMetadata: {
    title: `rebeam`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "rebeam",
        short_name: "rebeam",
        start_url: "/",
        background_color: "#2e3b84",
        theme_color: "#2e3b84",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icons/512x512.png", // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`, 
        path: `${__dirname}/src/`,
      },
    },
    {
      "resolve": `gatsby-transformer-remark`,
      "options": {
        "excerpt_separator": `<!--end-->`
      }
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`, // make sure to put last in the array
  ],
}
