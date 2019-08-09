import BlogList from "./blog-list";
import { graphql, StaticQuery } from "gatsby";
import Nav from "./header";
// import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import Helmet from "react-helmet";
import { Container, Grid, Segment } from "semantic-ui-react";

import "semantic-ui-less/semantic.less";

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
          meta={[
            { name: "description", content: description },
            { name: "keywords", content: keywords },
          ]}
        />

        <Nav/>

        <div style={{ flex: "1 0 auto" }}>
          {hero}

          <Container style={{ marginTop: hero ? "32px" : "92px" }}>
            <Grid centered>
              <Grid.Row>
                <Grid.Column
                  mobile={16}
                  tablet={noBlogList ? 14 : 10}
                  computer={noBlogList ? 14 : 10}
                >
                  {children}
                </Grid.Column>
                {!noBlogList && (
                  <Grid.Column only="tablet computer" tablet={4} computer={4}>
                    <BlogList />
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Container>
        </div>

        <Segment
          inverted
          vertical
          style={{ padding: "1.5em 0", marginTop: "3em" }}
          className="theme-dark-grey"
        >
          <Container>
            <Grid inverted stackable centered>
              <Grid.Column mobile={16} tablet={14} computer={14}>
                {/* Footer */}
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    )}
  />
);

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
//   description: PropTypes.string,
//   keywords: PropTypes.string,
// };

export default Layout;
