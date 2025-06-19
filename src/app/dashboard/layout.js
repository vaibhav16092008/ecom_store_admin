"use client";

import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative">
        <Sidebar />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </SidebarProvider>
  );
}

function ContentWrapper({ children }) {
  const { isSidebarOpen, isMobile } = useSidebar();

  return (
    <div
      className={`flex flex-col w-full transition-all duration-300 ${
        isSidebarOpen && !isMobile ? "lg:ml-72" : "ml-0"
      }`}
    >
      <Navbar />
      <main className="pt-16 px-4 bg-gray-50 flex-1">{children}</main>
    </div>
  );
}
