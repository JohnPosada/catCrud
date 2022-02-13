import React from "react";
import NavbarSectionItem from "./NavbarSectionItem";

const NavbarSection = (props) => {
  const { sections } = props;
  return (
    <div className="mt-10 flex flex-row">
      {sections.map((section) => {
        return (
          <NavbarSectionItem nameSection={section.name} key={section.name} />
        );
      })}
    </div>
  );
};

export default NavbarSection;
