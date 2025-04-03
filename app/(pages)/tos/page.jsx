import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white dark:bg-[#1D232A] py-10">
      <div className="flex flex-col gap-6 w-[700px] max-lg:w-full max-lg:px-6 dark-text light-text">
        <Link href="/" className="">
          <button className="btn btn-ghost light-text">
            <FaArrowLeft size={25} />
          </button>
        </Link>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="flex text-lg">
          1. Introduction
          <br />
          By using HomeTail, you confirm your acceptance of, and agree to be
          bound by, these terms and conditions.
          <br />
          <br />
          2. Agreement to Terms and Conditions
          <br />
          This agreement takes effect on the date on which you first use the
          HomeTail application.
          <br />
          <br />
          3. Access and License with Termination Rights
          <br />
          HomeTail retains the right to terminate access to our app at any time
          without prior notice. This termination provision provides HomeTail
          with control over software distribution and utilization.
          <br />
          <br />
          4. Refunds
          <br />
          Due to the nature of digital products, HomeTail is non-refundable once
          access has been granted.
          <br />
          <br />
          5. Disclaimer
          <br />
          HomeTail does not warrant that it will meet your specific requirements
          or that its operation will be uninterrupted or error-free. All express
          and implied warranties not stated in this agreement (including without
          limitation, loss of profits, data loss, or business interruptions) are
          excluded to the fullest extent permitted by law.
          <br />
          <br />
          6. Warranties and Limitation of Liability
          <br />
          HomeTail disclaims all warranties, whether express or implied, as to
          the quality, fitness for a particular purpose, or otherwise of the
          software. HomeTail shall not be liable for any loss of profit,
          indirect, special, or consequential loss or damage arising from the
          use of its services.
          <br />
          <br />
          7. Responsibilities
          <br />
          HomeTail is not responsible for user-generated content or actions
          taken based on information provided by the app.
          <br />
          <br />
          8. Price Adjustments
          <br />
          Prices for HomeTail services may be adjusted as we expand and improve
          our offerings.
          <br />
          <br />
          9. General Terms and Law
          <br />
          This agreement is governed by applicable laws, and HomeTail is not
          liable for any representation, act, or omission to act by users.
          <br />
          <br />
          This policy is effective as of October 10th, 2024.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
