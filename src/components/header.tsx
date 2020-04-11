import React from "react";
import { Link } from "gatsby";
import Logo from "./logo";
import GithubLogo from "./github-logo";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Color } from "./colors";

interface LinkData {
  name?: string;
  color?: Color;
  to: string;
  key?: string;
}

const LinkedDropdownItem: React.FunctionComponent<LinkData> = ({ children, ...props }) => (  
  <Dropdown.Item as={Link} {...props}>
    {children}
  </Dropdown.Item>
);

const LinkedMenuItem: React.FunctionComponent<LinkData> = ({ children, ...props }) => (
  <Nav.Link
    as={Link}
    activeClassName="active"
    className={props.color}
    {...props}
  >
    {children}
  </Nav.Link>
);

const githubIconLink = (
  <Nav>
    <Nav.Link href="http://github.com/trepidacious/tree-react" className="github-nav" target="_blank" rel="noopener noreferrer">
      <GithubLogo/>
    </Nav.Link>
  </Nav>
);

const MobileHeader = () => (

  <Navbar bg="dark" variant="dark" fixed="top" className="mobile-header">
    <Container>

      <Nav className="mr-auto">

        <Dropdown as={NavItem}>
          <Dropdown.Toggle id="nav-dropdown-toggle" as={NavLink}>
            <Logo/>
            rebeam
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {links.map(({ name, color, to }) => (
              <LinkedDropdownItem color={color} to={to} key={name}>
                {name}
              </LinkedDropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* <NavDropdown title="rebeam" id="nav-dropdown">
          {links.map(({ name, color, to }) => (
            <LinkedDropdownItem color={color} to={to} key={name} eventKey={name}>
              {name}
            </LinkedDropdownItem>
          ))}
        </NavDropdown> */}
      </Nav>

      {githubIconLink}

    </Container>
  </Navbar>   
);

const DesktopHeader = () => (
  <Navbar bg="dark" variant="dark" fixed="top" className="desktop-header">
    <Container>

      <Nav className="mr-auto nav-underlined">
        {
          links.slice(0, 1).map(({ name, color, to }) => (
            <LinkedMenuItem color={color} to={to} key={name}>
              <Logo />
              rebeam
            </LinkedMenuItem>
          ))
        }
        {
          links.slice(1).map(({ name, color, to }) => (
            <LinkedMenuItem color={color} to={to} key={name}>
              {name}
            </LinkedMenuItem>
          ))
        }
      </Nav>

      {githubIconLink}

      {/* <Form inline>
        <FormControl type="text" placeholder="search" className="mr-sm-2" />
        <Button variant="outline-info">search</Button>
      </Form> */}
    </Container>
  </Navbar>     
);

const links: LinkData[] = [
  {
    name: "home",
    to: "/",
    color: "red",
  },
  {
    name: "projects",
    to: "/projects",
    color: "yellow",
  },
  {
    name: "blog",
    to: "/blog",
    color: "teal",
  },
  {
    name: "about",
    to: "/about",
    color: "violet",
  },
];

const Header = () => (
  <>
    <MobileHeader/>
    <DesktopHeader/>
  </>
);

export default Header;
