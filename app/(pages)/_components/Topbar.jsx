import { FaFileMedical } from "react-icons/fa";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const Topbar = () => {
  return (
    <section className="flex h-[65px] items-center justify-between px-10 w-full border-b border-gray-400 font-semibold bg-white text-black dark:text-white dark:bg-[#1D232A]">
      <Link href="/" className="flex items-center font-semibold text-2xl">
        <FaFileMedical className="text-3xl mr-2 text-blue-500" />
        HomeTail
      </Link>
      <ThemeSwitch />
    </section>
  );
};
export default Topbar;
