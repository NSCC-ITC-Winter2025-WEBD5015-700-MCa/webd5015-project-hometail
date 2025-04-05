"use client";
import Sidebar from "../dashboard/_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }) => {
  
  const session = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {session ? <Sidebar /> : null}
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
