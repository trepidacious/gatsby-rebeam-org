import React from 'react'
import { Link } from 'gatsby'
import { Container, Menu, Segment, Icon } from 'semantic-ui-react'
import Logo from './logo.js'

// const LinkedDropdownItem = ({ children, ...props }) => (
//   <Dropdown.Item as={Link} activeClassName='active' {...props}>{children}</Dropdown.Item>
// )

const LinkedMenuItem = ({ children, ...props }) => (
  <Menu.Item as={Link} activeClassName='active-border' className='with-border' {...props}>{children}</Menu.Item>
)

const links = [
  {
    name: 'home',
    to: '/',
    color: 'violet'
  },
  {
    name: 'projects',
    to: '/projects',
    color: 'teal'
  },
  {
    name: 'blog',
    to: '/blog',
    color: 'yellow'
  },
  {
    name: 'about',
    to: '/about',
    color: 'red'
  },
];

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
    >
      <Container >

        {/* <Dropdown item text='rebeam' floating pointing>
          <Dropdown.Menu >
            {links.map(({name, color, to}) => (
              <LinkedDropdownItem color={color} to={to} key={name}>
                {name}
              </LinkedDropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}

        <LinkedMenuItem color='violet' to='/' key='rebeam'>
          <Logo />
          {siteTitle}
        </LinkedMenuItem>

        {links.slice(1).map(({name, color, to}) => (
          <LinkedMenuItem color={color} to={to} key={name}>
            {name}
          </LinkedMenuItem>
        ))}

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
