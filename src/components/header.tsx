import React from "react";
import { Link } from "gatsby";
import { Container, Menu, Icon, Dropdown, SemanticCOLORS } from "semantic-ui-react";
import Logo from "./logo";
import LogoMobile from "./logo-mobile";

interface LinkData {
  name?: string;
  color?: SemanticCOLORS;
  to: string;
  key?: string;
}

const LinkedDropdownItem: React.FunctionComponent<LinkData> = ({ children, ...props }) => (
  <Dropdown.Item as={Link} activeClassName="active" {...props}>
    {children}
  </Dropdown.Item>
);

const LinkedMenuItem: React.FunctionComponent<LinkData> = ({ children, ...props }) => (
  <Menu.Item
    as={Link}
    activeClassName="active-border"
    className="with-border"
    {...props}
  >
    {children}
  </Menu.Item>
);

const githubIconLink = (
  <Menu.Menu position="right">
    <Menu.Item
      as="a"
      href="https://github.com/trepidacious/gatsby-rebeam-org"
      title="Github"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="github" link inverted size="large" fitted />
    </Menu.Item>
  </Menu.Menu>
);

const MobileHeader = () => (
  <Menu
    className="mobile-header theme-dark-grey"
    fixed="top"
    inverted
    size="huge"
  >
    <Container>
      <Link to="/" key="rebeam">
        <LogoMobile />
      </Link>

      <Dropdown item text="rebeam" floating pointing>
        <Dropdown.Menu>
          {links.map(({ name, color, to }) => (
            <LinkedDropdownItem color={color} to={to} key={name}>
              {name}
            </LinkedDropdownItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {githubIconLink}
    </Container>
  </Menu>
);

const DesktopHeader = () => (
  <Menu
    className="desktop-header theme-dark-grey"
    fixed="top"
    inverted
    size="huge"
  >
    <Container>
      <LinkedMenuItem color="violet" to="/" key="rebeam">
        <Logo />
        home
      </LinkedMenuItem>

      {links.slice(1).map(({ name, color, to }) => (
        <LinkedMenuItem color={color} to={to} key={name}>
          {name}
        </LinkedMenuItem>
      ))}

      {githubIconLink}
    </Container>
  </Menu>
);

const links: LinkData[] = [
  {
    name: "home",
    to: "/",
    color: "violet",
  },
  {
    name: "projects",
    to: "/projects",
    color: "teal",
  },
  {
    name: "blog",
    to: "/blog",
    color: "yellow",
  },
  {
    name: "about",
    to: "/about",
    color: "red",
  },
];

const Header = () => (
  <>
    <MobileHeader/>
    <DesktopHeader/>
  </>
);

export default Header;
