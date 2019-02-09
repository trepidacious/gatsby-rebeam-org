import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import { Label, List } from "semantic-ui-react";

const query = graphql`
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

const BlogList = ({ description, keywords, children }) => (
  <StaticQuery
    query={query}
    render={data => (
      <>
        <h3>Entries</h3>
        <List divided relaxed size='tiny'>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <List.Item key={node.id}>
              <List.Icon name='code' size='large' verticalAlign='middle' color='grey' />

              <List.Content>
                <List.Header as={Link} to={node.fields.slug}>
                {node.frontmatter.title}
                {/* <Label basic pointing='left'>{node.frontmatter.date}</Label>  */}
                </List.Header>
                <List.Description>
                  {/* <Label horizontal basic>{node.frontmatter.date}</Label> */}
                  {/* {node.excerpt.split('<!--end-excerpt-->')[0]} */}
                  {node.frontmatter.date}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </>
    )}
  />
)

BlogList.propTypes = {
}

export default BlogList