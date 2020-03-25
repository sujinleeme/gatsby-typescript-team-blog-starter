import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from "styled-components"

import Avatar from '../components/avatar'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { ChildImageSharp, Author } from '../types'

interface Props {
  data: {
    markdownRemark: {
      id?: string
      excerpt: string
      html: string
      frontmatter: {
        title: string
        date: string
        description: string
      }
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const BlogPostTemplate = ({ data }: Props) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    typeof window !== 'undefined' && (
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
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </Layout>
    )
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query SinglePostBySlug($slug: String!) {
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
      }
    }
  }
`

const AvatarWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rhythm(1)};
`