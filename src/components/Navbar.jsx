/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="hidden lg:flex items-center gap-6 font-semibold text-base">
        <li key="/">
          <Link to="/" className=" rounded-md transition-all cursor-pointer">
            Home
          </Link>
        </li>
        <li key="/addcard"></li>

        <li key="/settings">
          <Link
            to="/settings"
            className=" rounded-md transition-all cursor-pointer"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
