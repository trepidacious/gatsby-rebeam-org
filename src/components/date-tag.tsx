import React from "react";
import { Badge } from "react-bootstrap";

const DateTag: React.FunctionComponent<{date: string}> = ({ date }) => (
  <Badge
    pill
    className="badge-bright-outline-grey"
    variant="light"
  >
    {date}
  </Badge>
);

export default DateTag;
