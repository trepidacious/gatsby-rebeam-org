import React from "react"
import { isAbsoluteURL } from "../components/smart-link"
import { Label } from "semantic-ui-react";
import { Link } from "gatsby";

/**
 * Known tags get a custom color and url
 */
const metadata = {
  'Gatsby': {color: 'violet', url: 'https://www.gatsbyjs.org/'},
  'Semantic UI': {color: 'blue', url: 'https://react.semantic-ui.com/'},
  'Netlify': {color: 'teal', url: 'https://www.netlify.com/'},
  'Prism.js': {color: 'grey', url: 'https://prismjs.com/'},
  'Scala': {color: 'red', url: 'https://www.scala-lang.org/'},
};

const colors = [
  'red',
  'orange',
  // 'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  // 'pink',
  // 'brown',
];

function hashString(s) {
  var hash = 0, i, chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default ({tag}) => {
  const m = metadata[tag];
  if (m) {
    const url = m.url;
    if (isAbsoluteURL(url)) {
      return <Label color={m.color} as='a' href={m.url} target='_blank' rel='noopener noreferrer'>{tag}</Label>
    } else {
      return <Label color={m.color} as={Link} to={m.url}>{tag}</Label>
    }
  } else {
    const color = colors[Math.abs(hashString(tag)) % colors.length];
    return <Label color={color}>{tag}</Label>
  }
}