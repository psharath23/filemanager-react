import React from "react";

const NavPath = props => (
  <div className="nav-path">{props.currentPath.join("/") + "/"}</div>
);

export default NavPath;
