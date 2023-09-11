"use client";
import Link from "next/link";
import { NavbarItems } from "@/config/NavbarItems";

function Navbar() {
  return (
    <nav className="bg-orange-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div id="navbar-logo" className="flex items-center">
          greatReads
        </div>

        <div
          className="hidden w-full md:block md:w-auto bg-orange-50"
          id="navbar-right"
        >
          <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-orange-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-orange-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NavbarItems.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
