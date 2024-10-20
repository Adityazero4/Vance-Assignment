import { signOut } from "firebase/auth";
import React from "react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../../lib/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="bg-[#111111] h-20 flex items-center justify-between px-[200px] sticky top-0 border-b-[1px] border-solid border-white border-opacity-10 z-[9999]">
      <img
        src="/assets/navbar/vance-logo.svg"
        onClick={() => {
          navigate("/");
        }}
        className="cursor-pointer"
      />
      <div className="flex gap-x-6">
        {user && (
          <button
            className="text-[#0B0B0B] bg-green-btn px-4 h-11 gap-x-3 rounded-full text-sm flex justify-center items-center font-bold"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button>
        )}
        <a
          className="text-[#0B0B0B] bg-green-btn px-4 h-11 gap-x-3 rounded-full text-sm flex justify-center items-center font-bold"
          href="https://play.google.com/store/apps/details?id=tech.vance.app&pli=1"
          target="_blank"
        >
          <span>Download app</span>
          <FaCircleArrowDown size={15} />
        </a>
        {location.pathname === "/" && (
          <button
            className="text-[#0B0B0B] bg-green-btn px-4 h-11 gap-x-3 rounded-full text-sm flex justify-center items-center font-bold"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <span>Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
