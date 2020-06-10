module.exports = {
  siteMetadata: {
    title: 'MegaMenu example',
    description: 'MegaMenu example, using Eufemia Drawer',
    author: 'Tobias Høegh'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/menu/*']
      }
    },
    'gatsby-plugin-react-helmet'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
}
