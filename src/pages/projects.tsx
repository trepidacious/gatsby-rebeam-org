import React from "react";

import Layout from "../components/layout";
import { Pencil } from "react-bootstrap-icons";

export default () => {
  return (
    <Layout
      description="Rebeam project list"
      keywords="Scala, React, Tree, Blog"
    >
      <p>
        <Pencil color="violet" size="20"/> TODO: List of projects, docs etc.
      </p>
    </Layout>
  );
};
