import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Img from "gatsby-image";

export default ({ data }: {data: any}) => {
  return (
    <Layout description="Image test">
      <h2>Images</h2>

      <Img fixed={data.file.childImageSharp.fixed} />
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "images/icons/512x512.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 256, height: 256) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
