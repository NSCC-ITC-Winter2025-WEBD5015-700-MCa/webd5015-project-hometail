"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { Loader } from "@/utils/loader";

const LoginForm = ({ setLoading, loading, setError }) => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ loading: true, isEmailLoading: true });

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        switch (res.code) {
          case "MissingCredentials":
            setError("Please enter both email and password.");
            break;
          case "UserNotFound":
            setError("No account found with this email.");
            break;

          case "InvalidPassword":
            setError("Invalid password. Try again.");
            break;
          default:
            setError("Invalid username or password.");
        }

        setLoading({ loading: false, isEmailLoading: false });
      } else {
        // Redirect to the dashboard if login is successful
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Error, try again");
      setLoading({ loading: false, isEmailLoading: false });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        className="dark:text-white text-black input input-bordered bg-gray-300 dark:bg-[#1D232A]"
        placeholder="Email"
        required
        onFocus={() => setError(null)}
      />
      <input
        type="password"
        className="dark:text-white text-black input input-bordered bg-gray-300 dark:bg-[#1D232A]"
        placeholder="Password"
        required
        onFocus={() => setError(null)}
      />

      <button
        type="submit"
        className="btn btn-primary w-full text-base text-black dark:text-white"
        disabled={loading.loading}
      >
        {loading.isEmailLoading ? (
          <Loader />
        ) : (
          <>
            <MdOutlineEmail size={30} /> Login with email
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
