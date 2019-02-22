import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import rehypeReact from "rehype-react"
import { List, Icon, Label, Divider, Message } from "semantic-ui-react";
import SmartLink from "../components/smart-link"

const SemanticOL = ({children}) => <List relaxed ordered as='ol'>{children}</List> 
const SemanticUL = ({children}) => <List relaxed bulleted as='ul'>{children}</List> 
const SemanticLI = ({children}) => <List.Item as='li'>{children}</List.Item> 
const MessageInfo = ({children}) => <Message info>{children}</Message> 

// This will render the htmlAst contents of a post
// using rehype, allowing us to replace elements with
// react components - we currently use this to style
// lists etc. as Semantic components
// See https://using-remark.gatsbyjs.org/custom-components/
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    'ul': SemanticUL, 
    'ol': SemanticOL,
    'li': SemanticLI,
    'hr': Divider,
    'icon': Icon,
    'label': Label,
    'a': SmartLink,
    'blockquote': MessageInfo
  },
}).Compiler

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout description={post.frontmatter.title}>
      <div>
        <h2>{post.frontmatter.title}</h2>
        
        {
          renderAst(post.htmlAst)
        }

        {/* 
          Alternative code to use post.html directly. To use
          this, change `htmlAst` field in graphQL query to just `html`
          <div dangerouslySetInnerHTML={{ __html: post.html }} /> 
        */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      # Use just html if using dangerouslySetInnerHtml above
      htmlAst
      frontmatter {
        title,
        date
      }
    }
  }
`