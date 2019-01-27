import React from "react"
import { Link, graphql } from "gatsby"

// import { Button, List } from 'semantic-ui-react'
import Layout from "../components/layout"
import { Segment } from "semantic-ui-react";

export default ({ data }) => {
  return (
    <Layout description="Rebeam blog - Scala, tree data system, notes" keywords="Scala, React, Tree, Blog">
      
      <h2>
        Recent Blogs
      </h2>

      {/* <List selection relaxed> */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          // <List.Item key={node.id} as={Link} to={node.fields.slug}>
          //   <List.Content>
          //     <List.Header >
          //       {node.frontmatter.title} - {node.frontmatter.date}
          //     </List.Header>
          //     <List.Description>
          //     {node.excerpt}
          //     </List.Description>
          //   </List.Content>
          // </List.Item>
          <Segment vertical key={node.id}>
            <h3>
              <Link to={node.fields.slug}>
                {node.frontmatter.title} - {node.frontmatter.date}
              </Link>
            </h3>
            <p>
              {node.excerpt}
            </p>
          </Segment>

        ))}
      {/* </List> */}

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

