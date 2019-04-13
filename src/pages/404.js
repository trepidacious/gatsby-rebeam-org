import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout description="Page not found" noBlogList>
    <h2>404 Page not found</h2>
    <p>
      <Link to="/">Back to home page</Link>
    </p>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
