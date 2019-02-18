import React from "react"

import hero from "../images/hero.svg"
import { Container, Header } from "semantic-ui-react";

export default ()  => (
  <div className='hero'>
    <img src={hero} alt='Hero' width='500px' height='333px' style={{position: 'absolute', right: '0', top: '57px'}}></img>
    <Container>
      <h1 className='hero-h1'>
        rebeam.org
      </h1>

      <p>
        Projects, blog and general information for rebeam.
      </p>
    </Container>

  </div>
  // <img src={logo} alt='Logo' width='40px' height='40px' style={{top: '10px', position: 'relative', marginLeft: '8px', marginRight: '8px'}}/>
)