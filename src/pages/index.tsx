import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

import SEO from "../components/seo";
import { Avatar, AvatarWrapper } from "../components/avatar";
import { rhythm } from "../styles";
import { Author, MarkdownPages } from "../types";

const BlogIndex = ({ data }: MarkdownPages) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={window.location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <AvatarWrapper>
              {node.frontmatter.authors &&
                node.frontmatter.authors.map((author: Author) => (
                  <Avatar
                    key={author.name}
                    src={author.image.childImageSharp.fixed}
                    name={author.name}
                  />
                ))}
            </AvatarWrapper>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            authors {
              description
              name
              twitter
              image {
                childImageSharp {
                  fixed(width: 50, height: 50) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
