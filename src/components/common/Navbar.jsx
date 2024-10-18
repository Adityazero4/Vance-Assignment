import React from "react";
import { FaCircleArrowDown } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="bg-[#111111] h-20 flex items-center justify-between px-[200px] sticky top-0">
      <img src="/assets/navbar/vance-logo.svg" />
      <a
        className="text-[#0B0B0B] bg-green-btn px-4 h-11 gap-x-3 rounded-full text-sm flex justify-center items-center font-bold"
        href="https://play.google.com/store/apps/details?id=tech.vance.app&pli=1"
        target="_blank"
      >
        <span>Download app</span>
        <FaCircleArrowDown size={15} />
      </a>
    </div>
  );
};

export default Navbar;
