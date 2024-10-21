/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="hidden lg:flex items-center gap-12 font-semibold text-base">
        <li key="/">
          <Link to="/" className="p-3 rounded-md transition-all cursor-pointer">
            Home
          </Link>
        </li>
        <li key="/addcard">
          <Link
            to="/addcard"
            className="p-3 rounded-md transition-all cursor-pointer"
          >
            Add Card
          </Link>
        </li>

        <li key="/settings">
          <Link
            to="/settings"
            className="p-3 rounded-md transition-all cursor-pointer"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
