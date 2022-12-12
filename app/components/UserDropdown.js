"use client";
import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import { useAuth } from "../contexts/AuthContext.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useRouter();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <button
        className="text-blueGray-500 block"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-black bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={
                currentUser.photoURL
                  ? currentUser.photoURL
                  : "../../static/images/800x800.jpg"
              }
            />
          </span>
        </div>
      </button>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          {currentUser && currentUser.email}
        </a>
        <Link
          href="/user"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Profile
        </Link>

        {currentUser && (
          <>
            <div className="h-0 my-2 border border-solid border-blueGray-100" />
            <button
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UserDropdown;
