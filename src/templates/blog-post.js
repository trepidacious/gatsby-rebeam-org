import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Label } from "semantic-ui-react";

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout description={post.frontmatter.title}>
      <div>
        <h2>{post.frontmatter.title}</h2>
        <p>
        <Label horizontal basic>{post.frontmatter.date}</Label>
        
        </p>
        
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        date
      }
    }
  }
`