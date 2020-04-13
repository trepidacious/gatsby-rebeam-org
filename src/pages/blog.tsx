import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import BlogTag from "../components/blog-tag";
import { Card, CardColumns } from "react-bootstrap";
import DateTag from "../components/date-tag";

export default ({ data }: {data: any}) => {
  return (
    <Layout
      noBlogList
      description="Rebeam blog - Scala, tree data system, notes"
      keywords="Scala, React, Tree, Blog"
    >
      <CardColumns>
        {data.allMarkdownRemark.edges.map(({ node }: {node: any}) => (
          <Card key={node.id}>
            <Card.Body>
              <Card.Title>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </Card.Title>
              <Card.Text>
                <p>{node.frontmatter.description}</p>
                <p>
                  <DateTag date={node.frontmatter.date}/>
                  {node.frontmatter.tags.map((tag: any) => (
                    <BlogTag key={tag} tag={tag} />
                  ))}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>

    </Layout>
  );
};

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
            description
            tags
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
