import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between text-center py-4 px-7 bg-[#23272157]  border-b-[.1px]  border-gray-700 ">
      <div className="">
        <h1 className=" text-2xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 ">
          GigaArt
        </h1>
      </div>
      <div>
        <NavLink
          to="/generate"
          className=" text-white font-bold py-2 px-4 rounded transition transform text-[15px] bg-gradient-to-r from-purple-400 via-purple-400 to-blue-500 active:scale-95"
        >
          Get Started Now
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
