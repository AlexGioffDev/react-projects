import React from "react";

type PropsPage = {
  children: JSX.Element[];
  title: string;
  menuId: string;
  isOpen: boolean;
  onToggle: (menuId: string) => void;
  closeAllMenus: () => void;
};

export const MenuDropDown = ({
  children,
  title,
  menuId,
  isOpen,
  onToggle,
  closeAllMenus,
}: PropsPage) => {
  return (
    <div className="relative">
      <button
        className={`w-full text-left px-4 py-2 rounded-md flex items-center justify-between hover:bg-slate-200 ${
          isOpen ? "bg-slate-200" : ""
        }`}
        onClick={() => onToggle(menuId)}
      >
        <span
          className={`
            transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }
          `}
        >
          &larr;
        </span>
        <p>{title}</p>
      </button>
      <div
        className={`absolute right-full top-0 bg-slate-50 w-[10rem] p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            onClick: closeAllMenus,
          })
        )}
      </div>
    </div>
  );
};
