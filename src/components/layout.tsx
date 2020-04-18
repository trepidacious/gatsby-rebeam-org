import BlogList from "./blog-list";
import { graphql, StaticQuery } from "gatsby";
import Nav from "./header";
import React, { ReactNode } from "react";
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from "react-bootstrap";

// See https://css-tricks.com/couple-takes-sticky-footer/ for footer layout, requires this
// component to be in a 100% height parent, see site.overrides for styles to achieve this
const Layout: React.FunctionComponent<
  { noBlogList?: boolean, hero?: ReactNode, description?: string, keywords?: string, children?: ReactNode }
> = ({ noBlogList, hero, description, keywords, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>

        <Helmet
          title={data.site.siteMetadata.title}
          defer={false}
          meta={[
            { name: "description", content: description },
            { name: "keywords", content: keywords },
          ]}
        />

        <Nav/>

        <div style={{ flex: "1 0 auto" }}>
          {hero}

          <Container style={{ marginTop: hero ? "3rem" : "7rem", paddingBottom: "6rem" }}>
            <Row xs={12}>
              <Col
                // At sizes under medium, blog list is hidden so we use all columns
                xs={12}
                // At medium and larger, we need to make space for blog list if
                // displaued
                md={noBlogList ? 12 : 8}
              >
                {children}
              </Col>

              {!noBlogList && (
                <Col
                  // Fill remaining space when displayed
                  xs={4}
                  // Hide by default, display as block on medium and larger screens
                  className="d-none d-md-block"
                >
                  <BlogList />
                </Col>
              )}
            </Row>
          </Container>
        </div>

        {/* <Segment
          inverted
          vertical
          style={{ padding: "1.5em 0", marginTop: "3em" }}
          className="theme-dark-grey"
        >
          <Container>
            <Grid inverted stackable centered>
              <Col mobile={16} tablet={14} computer={14}>
              </Col>
            </Grid>
          </Container>
        </Segment> */}
      </div>
    )}
  />
);

export default Layout;
