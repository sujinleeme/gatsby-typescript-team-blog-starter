import React from "react";
import { Link, graphql } from "gatsby";

import { Avatar, AvatarWrapper } from "../components/avatar";
import Layout from "../components/layout";
import SEO from "../components/seo";

import { Author, Page } from "../types";

import { rhythm, scale } from "../styles";

interface BlogPostProps {
  data: {
    markdownRemark: Page;
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: {
    previous: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
    next: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  };
}

const BlogPostTemplate = ({ data, pageContext }: BlogPostProps) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={window.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1
        style={{
          marginTop: rhythm(1),
          marginBottom: 0,
        }}
      >
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <AvatarWrapper>
        {post.frontmatter.authors &&
          post.frontmatter.authors.map((author: Author) => (
            <Avatar
              key={author.name}
              src={author.image.childImageSharp.fixed}
              name={author.name}
              twitter={author.twitter}
            />
          ))}
      </AvatarWrapper>
      {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title}
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`;
