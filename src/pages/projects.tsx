import React from "react";

import Layout from "../components/layout";
import { Icon } from "semantic-ui-react";

export default () => {
  return (
    <Layout
      description="Rebeam project list"
      keywords="Scala, React, Tree, Blog"
    >
      <h2>Projects</h2>

      <p>
        <Icon name="pencil" color="violet" /> TODO: List of projects, docs etc.
      </p>
    </Layout>
  );
};