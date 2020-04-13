import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import rehypeReact from "rehype-react";
import SmartLink from "../components/smart-link";
import BlogTag from "../components/blog-tag";
import DateTag from "../components/date-tag";
import { Table, Alert, Badge } from "react-bootstrap";
import * as Unicons from "@iconscout/react-unicons";

const MessageInfo: React.FunctionComponent = ({ children }) => (
  <Alert variant="secondary" className="markdown-message">
    {/* <Icon name="quote left" color="black" /> */}
    {children}
  </Alert>
);

const CustomTable: React.FunctionComponent = ({ children }) => (
  <Table striped bordered hover color="violet">
    {children}
  </Table>
);

const VioletHeart: React.FunctionComponent = ({ }) => (
  <Unicons.UilHeart size="20" color="#AD82F9" />
);

// This will render the htmlAst contents of a post
// using rehype, allowing us to replace elements with
// react components - we currently use this to style
// lists etc. as Semantic components
// See https://using-remark.gatsbyjs.org/custom-components/
// TODO restore icon
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // icon: Icon,
    badge: Badge,
    a: SmartLink,
    blockquote: MessageInfo,
    alert: Alert,
    table: CustomTable,
    heart: VioletHeart,
  },
}).Compiler;

const BlogPost: React.FunctionComponent<{data: any}> = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout description={post.frontmatter.title}>
      <div>
        <h2>{post.frontmatter.title}</h2>

        <p>{post.frontmatter.description}</p>
        <p>
          <DateTag date={post.frontmatter.date}/>
          {post.frontmatter.tags.map((tag: any) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </p>
        <hr />

        {renderAst(post.htmlAst)}

      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      # Use just html if using dangerouslySetInnerHtml above
      htmlAst
      frontmatter {
        title
        date
        description
        tags
      }
    }
  }
`;

export default BlogPost;
