"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavbarItems } from "@/config/NavbarItems";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import useAuth from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { user } = useAuth();

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-orange-200 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img
            src="../app-icon.svg"
            className="h-8 mr-3"
            alt="greatReads Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            greatReads
          </span>
        </a>

        <div className="flex items-center md:order-2">
          {user ? (
            <Link href="/profile" className="text-xl text-white">
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full border-2"
              />
            </Link>
          ) : (
            <div className="relative ">
              <button
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <FaRegUserCircle
                  className="w-8 h-8 rounded-full"
                  alt="user icon"
                />
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 z-50 my-4 text-base list-none bg-orange-50 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                  <li>
                    <Link
                      href="/login"
                      className="block w-32 px-4 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block w-32 w-fill px-4 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign up
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <HiMenu className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-orange-200"
          id="navbar-user"
        >
          <div className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-orange-200 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-orange-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
