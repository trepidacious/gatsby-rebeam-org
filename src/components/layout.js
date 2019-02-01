import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Grid } from 'semantic-ui-react'

import Header from './header'

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

        <Container style={{marginTop: '50px'}}>

          <Grid relaxed stackable>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              {children}
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
