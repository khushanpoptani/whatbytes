"use client"; // Required for useState in Next.js App Router

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Next.js optimized image component
import Logo from "../Images/Logo.png";
import Profile from "../Images/Profile.png";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <header style={styles.header}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <Image src={Logo} alt="WhatBytes Logo" width={30} height={30} />
        <span style={styles.logoText}>WhatBytes</span>
      </div>

      {/* Profile Section */}
      <div style={styles.profileContainer} ref={modalRef}>
        <div style={styles.profile} onClick={() => setIsModalOpen(!isModalOpen)}>
          <Image src={Profile} alt="User Profile" width={30} height={30} style={styles.profileImage} />
          <span style={styles.profileName}>Khushan Poptani</span>
        </div>

        {/* Profile Modal - Now positioned under the Profile Section */}
        {isModalOpen && (
          <div
            style={{
              ...styles.modalContainer,
              opacity: isModalOpen ? 1 : 0,
              transform: isModalOpen ? "translateY(0)" : "translateY(-10px)",
              pointerEvents: isModalOpen ? "auto" : "none",
            }}
          >
            <h3 style={styles.modalTitle}>Khushan Poptani</h3>
            <p style={styles.modalText}>📧 poptanikhushan@gmail.com</p>
            <p style={styles.modalText}>📞 9084712373</p>
            <div style={styles.buttonContainer}>
              <button style={styles.viewProfile} onClick={() => alert("View Profile Clicked")}>
                View Profile
              </button>
              <button style={styles.logout} onClick={() => alert("Logout Clicked")}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Internal styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
    marginLeft: "10px",
  },
  profileContainer: {
    position: "relative",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "#F7F7F7",
    borderRadius: "8px",
    cursor: "pointer",
  },
  profileImage: {
    borderRadius: "50%",
    marginRight: "8px",
  },
  profileName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
  },
  modalContainer: {
    position: "absolute",
    top: "150%",
    right: "-1%",
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
    zIndex: 10,
  },
  modalTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "10px",
  },
  modalText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  viewProfile: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  logout: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Header;
