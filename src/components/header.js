import React from 'react'
import { Link } from 'gatsby'
import { Container, Menu, Icon, Dropdown } from 'semantic-ui-react'
import Logo from './logo.js'
import LogoMobile from './logo-mobile.js'

const LinkedDropdownItem = ({ children, ...props }) => (
  <Dropdown.Item as={Link} activeClassName='active' {...props}>{children}</Dropdown.Item>
)

const LinkedMenuItem = ({ children, ...props }) => (
  <Menu.Item as={Link} activeClassName='active-border' className='with-border' {...props}>{children}</Menu.Item>
)

const githubIconLink = 
  <Menu.Menu position='right'>
    <Menu.Item as='a' href='https://github.com/trepidacious/gatsby-rebeam-org' title='Github' target="_blank" rel="noopener noreferrer">
      <Icon name="github" link inverted size='large' fitted></Icon>
    </Menu.Item>
  </Menu.Menu>

const MobileHeader = ({siteTitle}) => (
  <Menu 
    className='mobile-header theme-dark-grey'
    fixed='top'
    inverted
    size='huge'
  >

    <Container>

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

      {githubIconLink}

    </Container>

  </Menu>
)

const DesktopHeader = ({siteTitle}) => (
  <Menu 
    className='desktop-header theme-dark-grey'
    fixed='top'
    inverted
    size='huge'
  >

    <Container >

      <LinkedMenuItem color='violet' to='/' key='rebeam'>
        <Logo />
        {/* {siteTitle} */}
        home
      </LinkedMenuItem>

      {links.slice(1).map(({name, color, to}) => (
        <LinkedMenuItem color={color} to={to} key={name}>
          {name}
        </LinkedMenuItem>
      ))}

      {githubIconLink}

    </Container>

  </Menu>
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
    <MobileHeader siteTitle={siteTitle} />
    <DesktopHeader siteTitle={siteTitle} />
  </>
)

export default Header
