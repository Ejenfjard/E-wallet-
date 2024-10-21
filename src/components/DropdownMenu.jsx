/** @format */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DropdownMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <i className="icon-dropdown lg:hidden block text-3xl cursor-pointer w-10 h-">
        <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
      </i>
      {isMenuOpen && (
        <div className="dropdownMenu absolute lg:hidden md:top-28 top-20 left-0 w-full flex flex-col items-center gap-4 font-semibold text-lg">
          <Link
            to="/"
            className="list-none w-full text-center p-4 transition-all cursor-pointer"
          >
            <li>Home</li>
          </Link>
          <Link
            to="/addcard"
            className="list-none w-full text-center p-4 transition-all cursor-pointer"
          >
            <li>Add Card</li>
          </Link>

          <Link
            to="/settings"
            className="list-none w-full text-center p-4 transition-all cursor-pointer"
          >
            <li>Settings</li>
          </Link>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
