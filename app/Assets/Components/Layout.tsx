"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// Importing icons
import Logo from "../Images/Logo.png";
import Profile from "../Images/Profile.png";
import AnalysisIcon from "../Images/Analysis.png";
import MedalIcon from "../Images/Medal.png";
import PageIcon from "../Images/Page.png";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profileModalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Auto collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle navigation
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Close profile modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileModalRef.current && !profileModalRef.current.contains(event.target as Node)) {
        setIsProfileModalOpen(false);
      }
    };

    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  return (
    <main className="flex flex-col h-screen overflow-y-auto">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center">
          <Image src={Logo} alt="WhatBytes Logo" width={30} height={30} />
          <span className="ml-3 text-lg font-bold text-black">WhatBytes</span>
        </div>

        {/* Profile Section */}
        <div className="relative" ref={profileModalRef}>
          <div
            className="flex items-center px-3 py-2 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
          >
            <Image src={Profile} alt="User Profile" width={30} height={30} className="rounded-full mr-2" />
            <span className="text-sm font-medium text-black">Khushan Poptani</span>
          </div>

          {/* Profile Dropdown Modal */}
          {isProfileModalOpen && (
            <div className="absolute top-full right-0 w-64 bg-white rounded-lg shadow-lg p-4 text-center transition-opacity duration-200 ease-in-out z-10">
              <h3 className="text-lg font-bold text-black">Khushan Poptani</h3>
              <p className="text-sm text-gray-600">📧 poptanikhushan@gmail.com</p>
              <p className="text-sm text-gray-600">📞 9084712373</p>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md" onClick={() => alert("View Profile Clicked")}>
                  View Profile
                </button>
                <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-md" onClick={() => alert("Logout Clicked")}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-16 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isSidebarCollapsed ? "w-[70px]" : "w-[220px]"
        }`}
        onMouseEnter={() => setIsSidebarCollapsed(false)}
        onMouseLeave={() => setIsSidebarCollapsed(window.innerWidth < 900)}
      >
        <nav className="mt-4">
          <ul className="space-y-2">
            <li
              onClick={() => navigateTo("/dashboard")}
              className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition ${
                pathname === "/dashboard" ? "bg-blue-100 text-blue-600" : "text-black hover:bg-gray-100"
              }`}
            >
              <Image src={AnalysisIcon} alt="Dashboard" width={20} height={20} />
              {!isSidebarCollapsed && <span className="ml-3 text-sm">Dashboard</span>}
            </li>

            <li
              onClick={() => navigateTo("/")}
              className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition ${
                pathname === "/" ? "bg-blue-100 text-blue-600" : "text-black hover:bg-gray-100"
              }`}
            >
              <Image src={MedalIcon} alt="Skill Test" width={20} height={20} />
              {!isSidebarCollapsed && <span className="ml-3 text-sm">Skill Test</span>}
            </li>

            <li
              onClick={() => navigateTo("/internship")}
              className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition ${
                pathname === "/internship" ? "bg-blue-100 text-blue-600" : "text-black hover:bg-gray-100"
              }`}
            >
              <Image src={PageIcon} alt="Internship" width={20} height={20} />
              {!isSidebarCollapsed && <span className="ml-3 text-sm">Internship</span>}
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`transition-all duration-300 px-8 py-4 ${isSidebarCollapsed ? "ml-[90px]" : "ml-[240px]"}`}>
        {children}
      </main>
    </main>
  );
};

export default Layout;
