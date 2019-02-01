import React from 'react'
import { Link } from 'gatsby'
import { Container, Menu, Icon, Responsive, Dropdown } from 'semantic-ui-react'
import Logo from './logo.js'
import LogoMobile from './logo-mobile.js'

const LinkedDropdownItem = ({ children, ...props }) => (
  <Dropdown.Item as={Link} activeClassName='active' {...props}>{children}</Dropdown.Item>
)

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
  <>
    <Responsive as={Menu} maxWidth={767} fixed='top'
      inverted
      size='huge'
      style={{ background: '#464444' }}>

      <Container >

        <Link to='/' key='rebeam'>
          <LogoMobile />
        </Link>
        
        <Dropdown item text='rebeam' floating pointing>
          <Dropdown.Menu >
            {links.map(({name, color, to}) => (
              <LinkedDropdownItem color={color} to={to} key={name}>
                {name}
              </LinkedDropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
          <Menu.Item as='a' href='https://github.com/trepidacious' title='Github' target="_blank" rel="noreferrer">
            <Icon name="github" link inverted size='large' fitted></Icon>
          </Menu.Item>
        </Menu.Menu>

      </Container>
      
    </Responsive>

    <Responsive as={Menu} minWidth={768} fixed='top'
      inverted
      size='huge'
      style={{ background: '#464444' }}>

      <Container >

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

    </Responsive>
  </>
)

export default Header
