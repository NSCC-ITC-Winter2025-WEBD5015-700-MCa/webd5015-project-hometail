"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Loader } from "@/utils/loader";

const OAuthButtons = () => {
  const [loading, setLoading] = useState({
    isGoogleLoading: false,
    isAppleLoading: false,
  });

  const handleGoogleSignIn = () => {
    setLoading({ isGoogleLoading: true, isAppleLoading: false });
    setTimeout(
      () => signIn("google", { redirectTo: "/dashboard" }),
      2000
    );
  };

  const handleAppleSignIn = () => {
    setLoading({ isGoogleLoading: false, isAppleLoading: true });
    setTimeout(() => signIn("apple", { redirectTo: "/dashboard" }), 2000);
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
      <button
        disabled={loading.isGoogleLoading}
        className="btn btn-neutral w-full text-base dark:text-white text-black mt-4"
        onClick={handleAppleSignIn}
      >
        {loading.isAppleLoading ? (
          <Loader />
        ) : (
          <>
            <FaApple size={30} /> Continue with Apple
          </>
        )}
      </button>
    </>
  );
};

export default OAuthButtons;
