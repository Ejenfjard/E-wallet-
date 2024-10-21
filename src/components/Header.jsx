/** @format */

import React, { useState } from "react";
import Navbar from "./Navbar";
import logo from "../assets/logo.svg";
import DropdownMenu from "./DropdownMenu";

const Logo = () => {
  return (
    <a
      href=""
      className="flex items-end hover:scale-105 transition-all mb-2 lg:mb-6"
    >
      <img src={logo} alt="Logo" className="w-16 lg:w-24 h-auto" />
      <span className="logo-text mb-2 lg:text-2xl lg:mb-4">E-Wallet</span>
    </a>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center py-6 px-8 md:px-32">
        <Logo />

        <Navbar />
        <DropdownMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
    </>
  );
};

export default Header;
