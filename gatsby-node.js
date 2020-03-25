const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const createMultipleMarkdownPages = async ({templatePath, dir}) => {
    const component = path.resolve(templatePath)
    const result = await graphql(
      `
        {
          allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/(${dir})/"  }}
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
    )
  
    if (result.errors) {
      throw result.errors
    }
  
    const posts = result.data.allMarkdownRemark.edges
  
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
  
      createPage({
        path: post.node.fields.slug,
        component,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }
  

  createMultipleMarkdownPages({templatePath: './src/templates/blog-post.tsx', dir: 'blog'})
  createMultipleMarkdownPages({templatePath: './src/templates/single-post.tsx', dir: 'intro'})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      authors: [AuthorsYaml] @link(by: "name")
    }
  `
  createTypes(typeDefs)
}