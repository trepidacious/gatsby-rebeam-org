import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { Segment, Label } from "semantic-ui-react";

export default ({ data }) => {
  return (
    <Layout noBlogList description="Rebeam blog - Scala, tree data system, notes" keywords="Scala, React, Tree, Blog">
      
      <h2>
        Recent Entries
      </h2>

      {data.allMarkdownRemark.edges.map(({ node }) => (

        <Segment vertical key={node.id}>
          <h3>
            <Link to={node.fields.slug}>
              {node.frontmatter.title}
            </Link> 
          </h3>
          <div>
            <Label horizontal basic>{node.frontmatter.date}</Label>
            {node.excerpt}
          </div>
        </Segment>

      ))}

    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

