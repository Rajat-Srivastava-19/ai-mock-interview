"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlayCircle,
  FaHistory,
  FaUpload,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Home", icon: <FaHome /> },
    { href: "/dashboard/start", label: "Start", icon: <FaPlayCircle /> },
    { href: "/dashboard/history", label: "History", icon: <FaHistory /> },
    { href: "/dashboard/upload", label: "Upload", icon: <FaUpload /> },
    { href: "/dashboard/profile", label: "Profile", icon: <FaUserCircle /> },
    { href: "/auth/login", label: "Logout", icon: <FaSignOutAlt />, style: "text-red-400" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">AI Interview</h2>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white">
          {navItems.map(({ href, label, icon, style }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-300 ${
                pathname === href
                  ? "bg-white/20 underline underline-offset-4"
                  : "hover:bg-white/10"
              } ${style || ""}`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-white/10 backdrop-blur-md border-t border-white/20">
          <nav className="flex flex-col gap-3 mt-4 text-white text-sm">
            {navItems.map(({ href, label, icon, style }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                  pathname === href
                    ? "bg-white/20 underline underline-offset-4"
                    : "hover:bg-white/10"
                } ${style || ""}`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
