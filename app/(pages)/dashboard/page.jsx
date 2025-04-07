"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="text-2xl flex justify-center items-center bg-white dark:text-white dark:bg-[#1D232A]">
        Your are logged in as: {session?.user?.name ?? "Name not available"}
      </div>
      <div className="min-h-[100vh] bg-white dark:bg-[#1D232A]"></div>
      <Footer />
    </>
  );
};
export default Dashboard;
