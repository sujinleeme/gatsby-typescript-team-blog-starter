import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const NotFoundPage = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    typeof window !== "undefined" && (
      <Layout location={window.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
      </Layout>
    )
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
