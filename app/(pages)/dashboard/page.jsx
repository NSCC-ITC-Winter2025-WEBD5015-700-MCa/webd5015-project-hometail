'use client'
import { useSession } from "next-auth/react";
import Sidebar from "./_components/Sidebar";
const Dashboard = () => {
  
  const { data: session } = useSession();
  //console.log(session)


  return (
    <>
    <Sidebar />
    <div className="text-2xl flex justify-center items-center">Your are logged in as: { session?.user?.name ?? 'Name not available'}</div>
      
      <div className="min-h-[100vh]"></div>
    </>
  )
};
export default Dashboard;
