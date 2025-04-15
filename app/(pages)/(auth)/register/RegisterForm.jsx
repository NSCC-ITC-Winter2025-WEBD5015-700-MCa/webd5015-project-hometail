// src/app/components/RegisterForm.js
"use client";

import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Loader } from "@/utils/loader";
import { useRouter } from "next/navigation";

const RegisterForm = ({ setSuccess, setError }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        setSuccess("Account created successfully! Please login.");
        //timeout for 2 seconds then redirect to login page with router push
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (res.status === 400) {
        setError("This email address is already in use.");
      }
    } catch (error) {
      setError("Error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        className="dark:text-white text-black input input-bordered bg-white dark:bg-[#1D232A]"
        placeholder="Email"
        required
        onFocus={() => setError("")}
      />
      <input
        type="password"
        className="dark:text-white text-black input input-bordered bg-white dark:bg-[#1D232A]"
        placeholder="Password"
        required
        onFocus={() => setError("")}
      />
      <input
        type="password"
        className="dark:text-white text-black input input-bordered bg-white dark:bg-[#1D232A]"
        placeholder="Confirm password"
        required
        onFocus={() => setError("")}
      />

      <button
        type="submit"
        className="btn btn-primary w-full text-base text-black dark:text-white"
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <MdOutlineEmail size={30} /> Create free account
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
