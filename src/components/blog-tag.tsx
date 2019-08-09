import React from "react";
import { isAbsoluteURL } from "./smart-link";
import { Label, SemanticCOLORS } from "semantic-ui-react";
import { Link } from "gatsby";

/**
 * Known tags get a custom color and url
 */
const metadata: Record<string, {color: SemanticCOLORS, url: string}> = {
  "Gatsby": {
    color: "violet",
    url: "https://www.gatsbyjs.org/",
  },
  "Semantic UI": {
    color: "purple",
    url: "https://react.semantic-ui.com/",
  },
  "Netlify": {
    color: "blue",
    url: "https://www.netlify.com/",
  },
  "Prism.js": {
    color: "grey",
    url: "https://prismjs.com/",
  },
  "Scala": {
    color: "red",
    url: "https://www.scala-lang.org/",
  },
  "Prettier": {
    color: "green",
    url: "https://prettier.io/",
  },
  "Javascript": {
    color: "brown",
    url: "https://en.wikipedia.org/wiki/JavaScript",
  },
  "VS Code": {
    color: "blue",
    url: "https://code.visualstudio.com/",
  },
  "Git": {
    color: "red",
    url: "https://git-scm.com/",
  },
};

const colors: SemanticCOLORS[] = [
  "red",
  // "orange",
  // 'yellow',
  // "olive",
  "green",
  // "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
];

function hashString(s: string) {
  let hash = 0;
  let i;
  let chr;
  if (s.length === 0) {
    return hash;
  }
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    // tslint:disable-next-line: no-bitwise
    hash = (hash << 5) - hash + chr;
    // tslint:disable-next-line: no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const BlogTag: React.FunctionComponent<{tag: string}> = ({ tag }) => {
  const m = metadata[tag];
  if (m) {
    const url = m.url;
    if (isAbsoluteURL(url)) {
      return (
        <Label
          basic
          color={m.color}
          as="a"
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tag}
        </Label>
      );
    } else {
      return (
        <Label basic color={m.color} as={Link} to={m.url}>
          {tag}
        </Label>
      );
    }
  } else {
    const color = colors[Math.abs(hashString(tag)) % colors.length];
    return (
      <Label basic color={color}>
        {tag}
      </Label>
    );
  }
};

export default BlogTag;
