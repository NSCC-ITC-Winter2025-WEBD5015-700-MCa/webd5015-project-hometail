"use client";

import Pricing from "@/app/(pages)/landing/Pricing";
import ButtonCustomerPortal from "@/app/(pages)/subscribe/_components/ButtonCustomerPortal";
import { useSession } from "next-auth/react";

const Subscribe = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <Pricing width={`w-[500px] max-sm:w-[350px]`} title={"Subscribe"} />
      <h2 className="pb-5 text-xl font-bold text-center text-black dark:text-white">
        Subscription Status:{" "}
        {session?.user?.isSubscribed ? (
          <span className="text-green-400">Subscribed</span>
        ) : (
          <span className="text-blue-400">Free user</span>
        )}
      </h2>
      <ButtonCustomerPortal />
    </div>
  );
};
export default Subscribe;
