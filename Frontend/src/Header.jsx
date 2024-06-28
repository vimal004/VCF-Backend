import React from "react";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex items-center justify-center">
      <Link to={""}>
        <img src={logo} alt="Logo" className="h-12" />
      </Link>
      <h2 className="text-gray-900 text-2xl font-semibold ml-4">
        Customer Database Management
      </h2>
    </div>
  );
}

export default Header;
