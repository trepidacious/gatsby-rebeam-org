import React, { ReactNode } from "react";
import { Color } from "./colors";
import { Badge } from "react-bootstrap";

// See https://css-tricks.com/couple-takes-sticky-footer/ for footer layout, requires this
// component to be in a 100% height parent, see site.overrides for styles to achieve this
const Tag: React.FunctionComponent<
  { color: Color, children?: ReactNode }
> = ({ color, children, ...props }) => (
  <Badge
    pill
    className={"badge-bright-outline-" + color}
    variant="light"
    {...props}
  >
    {children}
  </Badge>

);

export default Tag;
