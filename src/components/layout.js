import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Grid } from 'semantic-ui-react'

import Header from './header'
import BlogList from './blog-list'

import 'semantic-ui-less/semantic.less'

const Layout = ({ noBlogList, description, keywords, children }) => (
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

          <Grid centered>
            <Grid.Column mobile={16} tablet={noBlogList ? 14 : 10} computer={noBlogList ? 14: 10}>
              {children}
            </Grid.Column>
            {!noBlogList && <Grid.Column only='tablet computer' tablet={4} computer={4}>
              <BlogList></BlogList>
            </Grid.Column>}
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
