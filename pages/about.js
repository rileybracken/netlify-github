import React from "react";
import DocumentTitle from "react-document-title";
import Link from "gatsby-link";

export default ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <DocumentTitle title={ siteTitle }>
      <p>About</p>
    </DocumentTitle>
  );
}

export const pageQuery = `{
  site {
    siteMetadata {
      title
    }
  }
}`;
