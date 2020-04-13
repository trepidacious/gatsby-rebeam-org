import React from "react";
import Layout from "../components/layout";
import SmartLink from "../components/smart-link";
import { graphql } from "gatsby";

export default () => (
  <Layout description="About the site">
    <p>
      rebeam.org is hosted on{" "}
      <SmartLink href="https://www.netlify.com/">Netlify</SmartLink>,
      automatically deploying from{" "}
      <SmartLink href="https://github.com/trepidacious/gatsby-rebeam-org">
        Github
      </SmartLink>
      . It is built as a static site by{" "}
      <SmartLink href="https://www.gatsbyjs.org/">Gatsby</SmartLink> and several
      Gatsby plugins, using{" "}
      <SmartLink href="https://semantic-ui.com/">Semantic UI</SmartLink> styling
      via{" "}
      <SmartLink href="https://react.semantic-ui.com/">
        React Semantic UI
      </SmartLink>
      . Blog entries are written in{" "}
      <SmartLink href="https://daringfireball.net/projects/markdown/syntax">
        Markdown
      </SmartLink>
      , rendered with <SmartLink href="https://reactjs.org/">React</SmartLink>{" "}
      components by{" "}
      <SmartLink href="https://github.com/rhysd/rehype-react">
        rehype-react
      </SmartLink>
      . Code samples are highlighted using{" "}
      <SmartLink href="https://prismjs.com/">Prism</SmartLink>. SVG graphics
      were produced using{" "}
      <SmartLink href="https://www.figma.com">Figma</SmartLink>. Code was edited
      using <SmartLink href="https://code.visualstudio.com/">VS Code</SmartLink>
      .
    </p>
    <p>
      Most of the above are covered in{" "}
      <SmartLink href="/blog">blog entries</SmartLink>.
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
