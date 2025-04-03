"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CiDark, CiLight } from "react-icons/ci";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Ensure that the theme logic runs only after the component is mounted
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="loading loading-spinner"></div>; // A loading spinner until theme is resolved

  // Main return with theme switch toggle based on current theme
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        checked={resolvedTheme === "light"} // Make sure the checkbox reflects the current theme
      />
      <CiDark className="fill-current swap-off dark:text-white" size={30} />
      <CiLight className="fill-current swap-on text-black" size={30} />
    </label>
  );
}
