"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext.js";

import UserDropdown from "./UserDropdown.js";

export default function Navbar() {
  const { currentUser } = useAuth();
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <Link
            href="/"
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          >
            Dashboard
          </Link>
          {!currentUser && (
            <Link
              href="login/"
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Log in
            </Link>
          )}
          {/* User */}
          {currentUser && (
            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <UserDropdown />
            </ul>
          )}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
