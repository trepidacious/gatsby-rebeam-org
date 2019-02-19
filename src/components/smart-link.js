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

export default ({href, children}) => {
  if (absoluteRegex.test(href)) {
    return <a href={href} target='_blank' rel='noopener noreferrer'>{children}</a>
  } else {
    return <Link to={href}>{children}</Link>
  } 
}