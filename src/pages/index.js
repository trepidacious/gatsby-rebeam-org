import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"

export default () => {
  return (
    <Layout 
      description="Rebeam blog - Scala, tree data system, notes" 
      keywords="Scala, React, Tree, Blog"
      hero = {<Hero></Hero>}
      noBlogList>
{/*       
      <h2>
        Rebeam
      </h2>

      <p>
        Projects, blog and general information for rebeam.
      </p> */}

    </Layout>
  )
}
