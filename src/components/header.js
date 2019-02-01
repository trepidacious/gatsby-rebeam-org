import React from 'react'
import { Link } from 'gatsby'
import { Container, Menu, Segment, Icon, Dropdown } from 'semantic-ui-react'
import Logo from './logo.js'

const LinkedDropdownItem = ({ children, ...props }) => (
  <Dropdown.Item as={Link} activeClassName='active' {...props}>{children}</Dropdown.Item>
)

const Header = ({ siteTitle }) => (
  <Segment
    inverted
    textAlign='center'
    vertical
  >
    <Menu
      fixed='top'
      inverted
      // size='huge'
      style={{ background: '#464444' }}
      secondary
    >
      <Container >
        {/* <Menu.Item as={Link} to="/">
          <Logo />{siteTitle}
        </Menu.Item> */}
        <Menu.Item>
          <Link to='/'>
            <Logo />
          </Link>
          <Dropdown item text='rebeam' floating pointing>
            <Dropdown.Menu>
              <LinkedDropdownItem to='/' key="Home">Home</LinkedDropdownItem>
              <LinkedDropdownItem to='/image' key="Image">Image</LinkedDropdownItem>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as='a' href='https://github.com/trepidacious' title='Github' target="_blank" rel="noreferrer">
            <Icon name="github" link inverted size='large' fitted></Icon>
          </Menu.Item>
        </Menu.Menu>
        
      </Container>
    </Menu>
  </Segment>
)

export default Header
