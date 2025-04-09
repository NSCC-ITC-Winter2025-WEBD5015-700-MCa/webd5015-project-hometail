"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import LoginForm from "@/app/(pages)/(auth)/login/LoginForm";
import OAuthButtons from "@/app/(pages)/(auth)/OAuthButtons";
import ErrorMessage from "@/app/(pages)/_components/ErrorMessage";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    loading: false,
    isEmailLoading: false,
    isGoogleLoading: false,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between p-24 text-black dark:text-white">
        <div className="dark:bg-[#212121] border-2 border-gray-400 dark:border-none p-8 rounded-lg shadow-md w-96">
          <Link href="/" className="absolute">
            <button className="btn btn-ghost">
              <FaArrowLeft size={25} />
            </button>
          </Link>
          <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>

          {/* Email Login Form */}
          <LoginForm
            setLoading={setLoading}
            loading={loading}
            setError={setError}
          />

          {/* Error Message */}
          <div className="min-h-6">
            <ErrorMessage error={error} />
          </div>

          {/* OAuth Buttons */}
          <OAuthButtons setLoading={setLoading} loading={loading} />

          <div className="mt-8 text-center">
            <Link href="/register">
              <span className="text-primary link-hover">Create an account</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
