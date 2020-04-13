import React from "react";

import Layout from "../components/layout";
import * as Unicons from "@iconscout/react-unicons";

export default () => {
  return (
    <Layout
      description="Rebeam project list"
      keywords="Scala, React, Tree, Blog"
    >
      <p>
        <Unicons.UilCheckCircle size="140" color="#AD82F9" /> TODO: List of projects, docs etc.
      </p>
    </Layout>
  );
};
