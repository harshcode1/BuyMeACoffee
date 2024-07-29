"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// When we are in the client component then we should import router from next/navigation


const Navbar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
  };
  
  return (
    <nav className="bg-blue-950 text-white flex justify-between items-center px-4 h-16">
      <Link href="/" className="logo font-bold flex justify-center items-center">
        <Image src="/coffee.gif" width={40} height={40} alt="BuyMeACoffee" />
        <span>BuyMeACoffee</span>
      </Link>
      <div>
        {session && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleDropdownToggle}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.name}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {showDropdown && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Your page
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {!session && (
          <Link href="/login" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;