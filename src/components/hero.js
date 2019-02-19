import React from "react"

import logo from "../images/icons/icon.svg"
import hero from "../images/hero.svg"
import { Container, Grid } from "semantic-ui-react";

export default ({title, subtitle})  => (
  <div className='hero'>
    <img className='hero-svg-bg' src={hero} alt='Hero' width='500px' height='333px' style={{position: 'absolute', right: '0', top: '57px'}}></img>
    <Container>
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={14} computer={14}>
            <h1 className='hero-h1'>
              <img className='hero-logo' src={logo} alt='Logo' width='60px' height='60px' />
              {title}
            </h1>

            <p>
              {subtitle}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      
    </Container>

  </div>
  // <img src={logo} alt='Logo' width='40px' height='40px' style={{top: '10px', position: 'relative', marginLeft: '8px', marginRight: '8px'}}/>
)