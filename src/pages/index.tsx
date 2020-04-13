import React from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import { Link } from "gatsby";
import { ListGroup } from "react-bootstrap";
// import { Archive, ChatQuote, LayoutTextWindowReverse, FileEarmarkText } from "react-bootstrap-icons";

export default () => {
  return (
    <Layout
      description="Rebeam blog - Scala, tree data system, notes"
      keywords="Scala, React, Tree, Blog"
      hero={
        <Hero
          title="rebeam.org"
          subtitle="Projects, blog and general information for rebeam."
        />
      }
      noBlogList
    >
      <ListGroup variant="flush">
        <ListGroup.Item>
          A domain registered to have a reasonable package for code on github
        </ListGroup.Item>
        <ListGroup.Item>
          A place to try out (and example of) static website development
        </ListGroup.Item>
        <ListGroup.Item>
          A place to dump <Link to="/blog">blog entries</Link> with no better
          place to go
        </ListGroup.Item>
        <ListGroup.Item>
            At some point, a place to host docs and examples for projects
        </ListGroup.Item>
      </ListGroup>

    </Layout>
  );
};
