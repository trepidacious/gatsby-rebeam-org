import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'semantic-ui-react'
import Logo from './logo.js'

const Header = ({ siteTitle }) => (
  <div style={{ background: '#464444' }}>
    <Container>
      <h1 style={{ padding: '1rem 0', marginBottom: '2rem' }}>
        <Link style={{ color: 'white' }} to="/">
          <Logo />{siteTitle}
        </Link>
      </h1>
    </Container>
  </div>
)

export default Header
