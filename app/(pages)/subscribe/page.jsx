"use client";

// import Pricing from "@/app/components/Home/Pricing";
import ButtonCustomerPortal from "@/app/(pages)/_components/ButtonCustomerPortal";
import Navbar from "@/app/(pages)/_components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@/utils/loader";

const Subscribe = () => {
  const { data: session, status: status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  // If the user is not a new user, don't render the rest of the component
  if (!session) {
    return <Loader />; // or you can return a loading spinner or a message
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Pricing width={`w-[500px] max-sm:w-[350px]`} title={"Subscribe"} /> */}
      <ButtonCustomerPortal />
    </div>
  );
};
export default Subscribe;
