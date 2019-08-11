import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

export default () => (
  <Layout description="Page not found" noBlogList>
    <h2>404 Page not found</h2>
    <p>
      <Link to="/">Back to home page</Link>
    </p>
  </Layout>
);
