import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"
import { List } from "semantic-ui-react";
import { Link } from "gatsby";

export default () => {
  return (
    <Layout 
      description="Rebeam blog - Scala, tree data system, notes" 
      keywords="Scala, React, Tree, Blog"
      hero = {<Hero title='rebeam.org' subtitle='Projects, blog and general information for rebeam.'></Hero>}
      noBlogList>    
         
      <h3>
      rebeam.org is (in no particular order):
      </h3>

      <p>
        <List relaxed>
          <List.Item>
            <List.Icon name='box' color='violet'></List.Icon> 
            <List.Content>
              A domain registered to have a reasonable package for code on github
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='globe' color='teal'></List.Icon> 
            <List.Content>
              A place to try out (and example of) static website development
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='pencil' color='yellow'></List.Icon> 
            <List.Content>
              A place to dump <Link to='/blog'>blog entries</Link> with no better place to go
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='file alternate' color='red'></List.Icon> 
            <List.Content>
              At some point, a place to host docs and examples for projects
            </List.Content>
          </List.Item>
        </List>
      </p>

    </Layout>
  )
}
