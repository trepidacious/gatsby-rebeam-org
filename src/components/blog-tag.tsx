import React from "react";
import { isAbsoluteURL } from "./smart-link";
import { Link } from "gatsby";
import { Color } from "./colors";
import { Badge } from "react-bootstrap";

/**
 * Known tags get a custom color and url
 */
const metadata: Record<string, {color: Color, url: string}> = {
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

const colors: Color[] = [
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
        <Badge
          pill
          className={"badge-outline-" + m.color}
          variant="secondary"
          as="a"
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tag}
        </Badge>
      );
    } else {
      return (
        <Badge
          pill
          className={"badge-outline-" + m.color}
          variant="secondary"
          as={Link}
          to={m.url}
        >
          {tag}
        </Badge>
      );
    }
  } else {
    const color = colors[Math.abs(hashString(tag)) % colors.length];
    return (
      <Badge
        pill
        className={"badge-outline-" + color}
        variant="secondary"
      >
        {tag}
      </Badge>
    );
  }
};

export default BlogTag;
