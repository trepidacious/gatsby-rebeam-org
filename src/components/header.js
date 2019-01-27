import React from 'react'
import { Link } from 'gatsby'
import { Container, Menu, Segment, Icon } from 'semantic-ui-react'
import Logo from './logo.js'

const Header = ({ siteTitle }) => (
  <Segment
    inverted
    textAlign='center'
    vertical
  >
    <Menu
      fixed='top'
      inverted
      size='huge'
      style={{ background: '#464444' }}
      secondary
    >
      <Container >
        <Menu.Item as={Link} to="/">
          <Logo />{siteTitle}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as='a' href='https://github.com/trepidacious' title='Github' target="_blank">
            <Icon name="github" link inverted size='large' fitted></Icon>
          </Menu.Item>
        </Menu.Menu>
        
      </Container>
    </Menu>
  </Segment>
)

export default Header
