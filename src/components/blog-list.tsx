import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import { Card } from "react-bootstrap";

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
`;

const BlogList = () => (
  <StaticQuery
    query={query}
    render={(data) => (
      <>
        <Card>
          {/* <Card.Header>Blog Entries</Card.Header> */}

          {data.allMarkdownRemark.edges.map(({ node }: {node: any}) => (
            <Card.Body key={node.id}>
              {/* <List.Icon
                name="envelope open outline"
                size="large"
                verticalAlign="middle"
                color="grey"
              /> */}

              <Card.Title as={Link} to={node.fields.slug}>
                {node.frontmatter.title}
                {/* <Label basic pointing='left'>{node.frontmatter.date}</Label>  */}
              </Card.Title>
              <Card.Text>
                {/* <Label horizontal basic>{node.frontmatter.date}</Label> */}
                {/* {node.excerpt.split('<!--end-excerpt-->')[0]} */}
                {node.frontmatter.date}
              </Card.Text>
            </Card.Body>
          ))}

        </Card>
      </>
    )}
  />
);

BlogList.propTypes = {};

export default BlogList;
