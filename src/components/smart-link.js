import React from "react"
import { Link } from "gatsby";

/**
 * Case-insensitive regex to identify absolute URLs
 * Matches start of line, then either:
 * a) a letter, then zero or more letters or 
 *    numbers, then a colon (a protocol)
 * b) a double forward slash (start of a 
 *    protocol-relative path)
 */
const absoluteRegex = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function isAbsoluteURL(href) {
  return (
    absoluteRegex.test(href) ||
    href.startsWith('/static/') ||
    href.endsWith('.jpg') ||
    href.endsWith('.png') ||
    href.endsWith('.webp')
  );
}

export default ({href, children}) => {
  // Use a plain link in a new tab for absolute urls, for /static content, and for images
  if (isAbsoluteURL(href)) {
    return <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>

  // Assume everything else is a local link, which should go through the router
  } else {
    return <Link to={href}>{children}</Link>
  } 
}