"use client";

import RegisterForm from "@/app/(pages)/(auth)/register/RegisterForm";
import OAuthButtons from "@/app/(pages)/(auth)/OAuthButtons";
import Link from "next/link";
import ErrorMessage from "@/app/(pages)/_components/ErrorMessage";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24 text-black dark:text-white">
        <div className="dark:bg-[#212121] border-2 dark:border-none px-8 pt-8 pb-4 rounded-lg shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 light-text dark-text">
            Register
          </h1>
          <RegisterForm setError={setError} setSuccess={setSuccess} />
          {/* Error Message */}
          <div className="min-h-6">
            <ErrorMessage error={error} success={success} />
          </div>
          <OAuthButtons /> {/* Use the OAuthButtons component here */}
          <div className="py-8 text-center">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-primary link-hover">Sign in</span>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            By signing up, you agree to our{" "}
            <Link href="/tos" className="text-primary link-hover">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary link-hover">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
