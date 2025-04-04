import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full text-black dark:text-white mt-10">
        <footer className="footer footer-center rounded py-4 text-base">
          <nav className="flex gap-6">
            <a
              href="mailto:projecthometail@gmail.com"
              className="link link-hover dark:text-white"
            >
              Support
            </a>
            <Link href="/tos" className="link link-hover dark:text-white">
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="link link-hover dark:text-white"
            >
              Privacy Policy
            </Link>
          </nav>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All rights reserved by
              HomeTail
            </p>
          </aside>
        </footer>
      </div>
    </>
  );
};
export default Footer;
