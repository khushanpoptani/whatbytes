"use client"; // Ensures it's a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // For navigation
import AnalysisIcon from "../Images/Analysis.png";
import MedalIcon from "../Images/Medal.png";
import PageIcon from "../Images/Page.png";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get current route
  const router = useRouter(); // For navigation

  // Check screen width and collapse sidebar for smaller screens
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 900);
    };

    handleResize(); // Call once to check initial screen size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation function
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: isCollapsed ? "70px" : "220px",
        transition: "width 0.3s ease-in-out",
      }}
      onMouseEnter={() => setIsCollapsed(false)} // Expand when hovered
      onMouseLeave={() => setIsCollapsed(window.innerWidth < 900)} // Collapse when not hovered on small screens
    >
      <nav>
        <ul style={styles.navList}>
          {/* Dashboard */}
          <li
            onClick={() => handleNavigation("/dashboard")}
            style={{
              ...styles.navItem,
              ...(pathname === "/dashboard" ? styles.activeNav : {}),
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
          >
            <Image
              src={AnalysisIcon}
              alt="Dashboard"
              width={isCollapsed ? 40 : 20}
              height={isCollapsed ? 40 : 20}
              style={{ objectFit: "contain" }}
            />
            {!isCollapsed && <span style={styles.navText}>Dashboard</span>}
          </li>

          {/* Skill Test (Default Active Page) */}
          <li
            onClick={() => handleNavigation("/")}
            style={{
              ...styles.navItem,
              ...(pathname === "/" ? styles.activeNav : {}),
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
          >
            <Image
              src={MedalIcon}
              alt="Skill Test"
              width={isCollapsed ? 40 : 20}
              height={isCollapsed ? 40 : 20}
              style={{ objectFit: "contain" }}
            />
            {!isCollapsed && <span style={styles.navText}>Skill Test</span>}
          </li>

          {/* Internship */}
          <li
            onClick={() => handleNavigation("/internship")}
            style={{
              ...styles.navItem,
              ...(pathname === "/internship" ? styles.activeNav : {}),
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
          >
            <Image
              src={PageIcon}
              alt="Internship"
              width={isCollapsed ? 40 : 20}
              height={isCollapsed ? 40 : 20}
              style={{ objectFit: "contain" }}
            />
            {!isCollapsed && <span style={styles.navText}>Internship</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Internal styles
const styles = {
  sidebar: {
    height: "calc(100vh - 77px)", // Adjust height below the header
    backgroundColor: "#fff",
    padding: "20px",
    borderRight: "1px solid #eee",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    position: "fixed",
    top: "77px", // Below the header
    left: "0",
    // zIndex: "1000",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
    transition: "background-color 0.3s ease-in-out, padding 0.3s ease-in-out",
  },
  activeNav: {
    backgroundColor: "#F1F5FF", // Light blue background for active state
    color: "#3B82F6", // Blue text color
  },
  icon: {
    marginRight: "12px",
  },
  navText: {
    flex: 1,
    marginLeft: "20px"
  },
};

export default Sidebar;
