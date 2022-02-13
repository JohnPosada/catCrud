import React from "react";
import NavbarSection from "../components/NavbarSection";
import catLogo from "../../public/cat-Logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const sections = [
    {
      name: "Create",
    },
    {
      name: "Delete",
    },
    {
      name: "Search",
    },
  ];
  return (
    <div className="flex flex-row bg-gray-200 py-5 pl-10">
      <Link to="/">
        <img className="mr-8 h-20" src={catLogo} alt="logo" />
      </Link>

      <NavbarSection sections={sections} />
    </div>
  );
};

export default Navbar;
