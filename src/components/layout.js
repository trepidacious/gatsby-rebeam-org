import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Grid } from 'semantic-ui-react'

import Header from './header'
import BlogList from './blog-list'

import 'semantic-ui-less/semantic.less'

const Layout = ({ description, keywords, children }) => (
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
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
          ]}
        />

        <Header siteTitle={data.site.siteMetadata.title} />

        <Container style={{paddingTop: '80px'}}>

          <Grid centered relaxed stackable>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              {children}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <BlogList></BlogList>
            </Grid.Column>
          </Grid>

        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string
}

export default Layout
