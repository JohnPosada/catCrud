import React from "react";
import { NavLink } from "react-router-dom";

const NavbarSectionItem = (props) => {
  const { nameSection } = props;
  return (
    <NavLink
      className="group ml-10 "
      to={`/${nameSection.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {({ isActive }) => (
        <div
          className={`${
            isActive
              ? "rounded-lg bg-sky-700"
              : "group-hover:rounded-lg group-hover:bg-gray-300"
          } p-2 `}
        >
          <h2
            className={`${
              isActive ? "text-white" : "text-gray-500 group-hover:text-black"
            } `}
          >
            {nameSection}
          </h2>
        </div>
      )}
    </NavLink>
  );
};

export default NavbarSectionItem;
