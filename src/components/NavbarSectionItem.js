import React from "react";
import { NavLink } from "react-router-dom";

const NavbarSectionItem = (props) => {
  const { nameSection } = props;
  return (
    <NavLink
      className="ml-10"
      to={`/${nameSection.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div>{nameSection}</div>
    </NavLink>
  );
};

export default NavbarSectionItem;
