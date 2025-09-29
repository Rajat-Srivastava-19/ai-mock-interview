"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlayCircle,
  FaHistory,
  FaUpload,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: <FaHome /> },
    { href: "/dashboard/start", label: "Start", icon: <FaPlayCircle /> },
    { href: "/dashboard/history", label: "History", icon: <FaHistory /> },
    { href: "/dashboard/upload", label: "Upload", icon: <FaUpload /> },
    { href: "/dashboard/profile", label: "Profile", icon: <FaUserCircle /> },
    {
      href: "/auth/login",
      label: "Logout",
      icon: <FaSignOutAlt />,
      style: "<text-red-4></text-red-4>00 hover:bg-red-100",
    },
  ];

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-64 bg-violet-100 rounded-2xl shadow-xl flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-violet-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-sm text-violet-800">AI Mock Interviews</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ href, label, icon, style }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
              ${
                pathname === href
                  ? "bg-violet-500 text-violet-100 shadow-sm"
                  : "text-violet-600 hover:bg-violet-600 hover:text-violet-100"
              } ${style || ""}`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="px-6 py-4 border-t border-violet-900">
        <p className="text-sm text-violet-400">© 2025 MockAI</p>
      </div>
    </aside>
  );
}
