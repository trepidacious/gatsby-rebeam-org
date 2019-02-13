import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Grid, Segment, List, Header } from 'semantic-ui-react'

import Nav from './header'
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

        <div style={{ display:"flex", minHeight:"100vh", flexDirection:"column" }}>

          <Nav siteTitle={data.site.siteMetadata.title} />

          <div style={{ flex:1 }}>
            
            <Container style={{paddingTop: '80px'}}>
              <Grid centered>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={noBlogList ? 14 : 10} computer={noBlogList ? 14: 10}>
                    {children}
                  </Grid.Column>
                  {!noBlogList && <Grid.Column only='tablet computer' tablet={4} computer={4}>
                    <BlogList></BlogList>
                  </Grid.Column>}
                </Grid.Row>
                {/* <Grid.Row>
                  <Grid.Column mobile={16} tablet={14} computer={14}>
                    Footer
                  </Grid.Column>
                </Grid.Row> */}
              </Grid>
            </Container>

          </div>

          <Segment inverted vertical style={{ padding: '1.5em 0', marginTop: '3em' }} className='theme-dark-grey'>
            <Container>
              <Grid inverted stackable centered>
                <Grid.Column mobile={16} tablet={14} computer={14}>
                  {/* Footer */}
                </Grid.Column>
              </Grid>
            </Container>
          </Segment>

        </div>
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
