"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Loader } from "@/utils/loader";

const OAuthButtons = () => {
  const [loading, setLoading] = useState({
    isGoogleLoading: false,
  });

  const handleGoogleSignIn = () => {
    setLoading({ isGoogleLoading: true });
    setTimeout(() => signIn("google", { redirectTo: "/pets" }), 2000);
  };

  return (
    <>
      <button
        className="btn btn-success w-full text-base dark:text-white text-black mt-4"
        onClick={handleGoogleSignIn}
        disabled={loading.isGoogleLoading || loading.isAppleLoading}
      >
        {loading.isGoogleLoading ? (
          <Loader />
        ) : (
          <>
            <FcGoogle size={30} /> Continue with Google
          </>
        )}
      </button>
    </>
  );
};

export default OAuthButtons;
