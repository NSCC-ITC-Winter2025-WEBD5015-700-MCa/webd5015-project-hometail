"use client";
//Sidebar.js
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader } from "@/utils/loader";

const Sidebar = () => {
  // State to manage the open/close state of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />
  }

  console.log(session);


  return (
    <div className="flex bg-white dark:bg-[#1D232A]">
      {/* Sidebar */}
      <div
        // Conditional class based on isOpen
        // state to control width and visibility
        className={`bg-gray-800 text-white 
                    fixed h-screen transition-all 
                    duration-300 z-10 
                    ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col items-center">
          {/* Add more sidebar items here */}
          {session?.user?.role === "admin" ? (<div className="mt-4">
            <Link
              href="/admin"
              className="text-white 
                          hover:text-gray-300"
            >
              Admin Dashboard
            </Link>
          </div>) : null}
          <div className="mt-4">
            <Link
              href="/listdog"
              className="text-white 
                          hover:text-gray-300"
            >
              List a Dog for Adoption
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/pets"
              className="text-white 
                          hover:text-gray-300"
            >
              View All Listings
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/mylistings"
              className="text-white 
                          hover:text-gray-300"
            >
              My Listings
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/subscribe"
              className="text-white 
                          hover:text-gray-300"
            >
              My Subscriptions
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/inbox"
              className="text-white 
                          hover:text-gray-300"
            >
              My Inbox
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="#"
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              className="text-white 
                          hover:text-gray-300"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div
        className={`flex-1 p-4 
                        ${isOpen ? "ml-64" : "ml-0"}`}
      >
        {/* Button to toggle sidebar */}
        <div className="ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Toggle icon based on isOpen state */}
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
