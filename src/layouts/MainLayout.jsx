import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="text-2xl"
        >
          <FaBars />
        </button>

        <h1 className="font-bold text-blue-600">
          AI Interview Portal
        </h1>
      </div>

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <div className="fixed left-0 top-0 z-50">
              <div className="relative">

                <button
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className="absolute top-4 right-4 text-xl"
                >
                  <FaTimes />
                </button>

                <Sidebar />
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-6">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
};

export default MainLayout;