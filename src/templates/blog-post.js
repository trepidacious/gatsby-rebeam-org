import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import rehypeReact from "rehype-react"
import { List, Icon, Label, Divider } from "semantic-ui-react";

/**
 * Case-insensitive regex to identify absolute URLs
 * Matches start of line, then either:
 * a) a letter, then zero or more letters or 
 *    numbers, then a colon (a protocol)
 * b) a double forward slash (start of a 
 *    protocol-relative path)
 */
const absoluteRegex = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const SemanticOL = ({children}) => <List relaxed ordered as='ol'>{children}</List> 
const SemanticUL = ({children}) => <List relaxed bulleted as='ul'>{children}</List> 
const SemanticLI = ({children}) => <List.Item as='li'>{children}</List.Item> 
const RelativeOrAbsoluteLink = ({href, children}) => {
  if (absoluteRegex.test(href)) {
    return <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
  } else {
    return <Link to={href}>{children}</Link>
  } 
}

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
    'a': RelativeOrAbsoluteLink
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