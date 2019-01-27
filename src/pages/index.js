import React from "react"
import { Link, graphql } from "gatsby"

import { Button } from 'semantic-ui-react'
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout description="Rebeam blog - Scala, tree data system, notes" keywords="Scala, React, Tree, Blog">
      
      <h2>
        <span role="img" aria-label="Waving hand">
          👋
        </span>{' '}
        Hey there!
      </h2>

      <p>
        Welcome to this humble Gatsby Semantic UI starter. It is a very thin layer
        on top of the regular Gatsby 2 starter. All that has been added is
        Semantic UI as the component library of choice.
      </p>

      <p>
        Everything is pre-setup and ready to go. You can either use the default
        Semantic UI theme as it currently runs, or you can override all variables
        and make custom CSS changes in the <code>src/semantic/site</code> folder.
      </p>

      <p>
        The folder contains all the standard settings of the default theme so you
        don't have to remember which variables are available.
      </p>

      <Button primary>I'm a button!</Button>

      {data.allMarkdownRemark.edges.map(({ node }) => (
        <p key={node.id}>
          <Link
            to={node.fields.slug}
          >
            <h3
            >
              {node.frontmatter.title}{" "}
              <span
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </p>
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

