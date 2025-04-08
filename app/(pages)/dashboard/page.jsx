"use client";

import { useSession } from "next-auth/react";
import Sidebar from "./_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Loader } from "@/utils/loader";

const Dashboard = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="text-2xl flex justify-center items-center bg-white dark:text-white dark:bg-[#1D232A]">
        {status==="loading" ? <Loader /> : <p>Your are logged in as: {session?.user?.name}</p>}
      </div>
      <div className="min-h-[100vh] bg-white dark:bg-[#1D232A]"></div>
      <Footer />
    </>
  );
};
export default Dashboard;
