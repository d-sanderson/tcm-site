require('dotenv').config({
  path: '.env',
})

// console.log(process.env.GRAPHCMS_ENDPOINT, process.env.GRAPHCMS_TOKEN)

module.exports = {
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-react-helmet',
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    'gatsby-plugin-mui-emotion',
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
      },
    },
    'gatsby-plugin-image',
  ],
  siteMetadata: {
    title: 'The Composite Method by Janamarie Truesdale',
  },
}
