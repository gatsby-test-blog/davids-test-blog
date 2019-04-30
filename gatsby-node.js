const path = require("path")

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 100
      ) {
        edges {
          node {
            frontmatter {
              path
              date
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path, // URL
        component: blogPostTemplate,
        context: {
          // In your blog post template's graphql query, you can use slug
          // as a GraphQL variable to query for data from the markdown file.
          slug: node.frontmatter.path,
          allArticles: result.data.allMarkdownRemark.edges,
        },
      })
    })
  })
}
