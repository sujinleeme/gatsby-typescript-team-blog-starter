import { FixedObject } from "gatsby-image";

export type Author = {
  id: string;
  description: string;
  name: string;
  image: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
  twitter: string;
  github: string;
  website: string;
  linkedin: string;
};

export type MarkdownPagesProps = {
  data: {
    allMarkdownRemark: {
      edges: NodeProps[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
};

export type NodeProps = {
  node: PageProps;
};

export type PageProps = {
  id?: string;
  excerpt: string;
  html?: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    authors?: Author[];
  };
  fields: {
    slug: string;
  };
};
