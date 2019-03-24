import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import rehypeReact from "rehype-react";
import { List, Icon, Label, Divider, Message, Table } from "semantic-ui-react";
import SmartLink from "../components/smart-link";
import BlogTag from "../components/blog-tag";

const SemanticOL = ({ children }) => (
  <List relaxed ordered as="ol">
    {children}
  </List>
);
const SemanticUL = ({ children }) => (
  <List relaxed bulleted as="ul">
    {children}
  </List>
);
const SemanticLI = ({ children }) => <List.Item as="li">{children}</List.Item>;
const MessageInfo = ({ children }) => (
  <Message icon>
    <Icon name="quote left" color="black" />
    <Message.Content>{children}</Message.Content>
  </Message>
);
const CustomTable = ({ children }) => (
  <Table celled color="violet">
    {children}
  </Table>
);

// This will render the htmlAst contents of a post
// using rehype, allowing us to replace elements with
// react components - we currently use this to style
// lists etc. as Semantic components
// See https://using-remark.gatsbyjs.org/custom-components/
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    ul: SemanticUL,
    ol: SemanticOL,
    li: SemanticLI,
    hr: Divider,
    icon: Icon,
    label: Label,
    a: SmartLink,
    blockquote: MessageInfo,
    message: Message,
    table: CustomTable,
    thead: Table.Header,
    tr: Table.Row,
    th: Table.HeaderCell,
    td: Table.Cell
  }
}).Compiler;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout description={post.frontmatter.title}>
      <div>
        <h2>{post.frontmatter.title}</h2>

        <p>{post.frontmatter.description}</p>
        <p>
          <Label>{post.frontmatter.date}</Label>
          {post.frontmatter.tags.map(tag => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </p>
        <Divider />

        {renderAst(post.htmlAst)}

        {/* 
          Alternative code to use post.html directly. To use
          this, change `htmlAst` field in graphQL query to just `html`
          <div dangerouslySetInnerHTML={{ __html: post.html }} /> 
        */}
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
