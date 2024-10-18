import React from "react";
import { TABS_DATA } from "../../lib/constant";
import { cn } from "../../lib/utils";

const Tabs = ({ tabs, handleTabChange }) => {
  return (
    <div className="rounded-full bg-green-btn flex justify-center items-center gap-x-2 w-[460px] p-1.5">
      {TABS_DATA.map((tab) => (
        <button
          key={tab.title}
          onClick={() => handleTabChange(tab.title)}
          className={cn(
            "flex justify-center items-center gap-x-2 py-1.5 px-4 font-semibold rounded-full transition-colors duration-200 text-xs",
            tabs === tab.title
              ? "bg-purple-600 text-white"
              : "bg-transparent text-black"
          )}
        >
          <span>{tab.title}</span>
          <span
            className={cn(
              "transition-colors duration-200",
              tabs === tab.title ? "text-white" : "text-black"
            )}
          >
            {tab.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
