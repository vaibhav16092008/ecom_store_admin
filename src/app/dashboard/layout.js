"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "pl-72" : "pl-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
