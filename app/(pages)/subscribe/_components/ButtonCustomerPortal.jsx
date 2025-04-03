"use client";

import { useSession } from "next-auth/react";

// Customer portal link
const customerPortalLink =
  "https://billing.stripe.com/p/login/test_aEU15n4bIdRZ93ObII";

const ButtonCustomerPortal = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center">
      <a
        href={customerPortalLink + "?prefilled_email=" + session?.user?.email}
        target="_blank"
      >
        <button className="btn btn-wide btn-primary text-lg text-black dark:text-white">
          Manage Billing
        </button>
      </a>
    </div>
  );
};

export default ButtonCustomerPortal;
