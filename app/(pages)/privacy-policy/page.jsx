import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white dark:bg-[#1D232A] py-10">
      <div className="flex flex-col gap-6 w-[700px] max-lg:w-full max-lg:px-6 dark-text light-text">
        <Link href="/" className="">
          <button className="btn btn-ghost light-text">
            <FaArrowLeft size={25} />
          </button>
        </Link>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="flex text-lg">
          Your privacy is important to us. It is HomeTail&apos;s policy to
          respect your privacy regarding any information we may collect from you
          across our website, app, and other sites we own and operate.
          <br />
          <br />
          HomeTail is committed to maintaining the privacy and anonymity of all
          users. We do not collect any personal patient information such as
          health card numbers, names, addresses, or any other identifying
          details. All interactions with the app are conducted anonymously to
          ensure the confidentiality of patient data. Any data used within
          HomeTail is aggregated and anonymized, with no direct links to
          individual patients. Our commitment is to safeguard privacy by
          ensuring that only non-identifiable information is processed by the
          app.
          <br />
          <br />
          We only ask for personal information when we truly need it to provide
          a service to you. We collect this information by fair and lawful
          means, with your knowledge and consent. We also let you know why
          we&apos;re collecting it and how it will be used.
          <br />
          <br />
          You can sign up with your Google account, which will prefill your
          HomeTail account username with your name and public profile picture.
          <br />
          <br />
          We retain collected information only as long as necessary to provide
          you with your requested service. What data we store, we&apos;ll
          protect within commercially acceptable means to prevent loss, theft,
          and unauthorized access, disclosure, copying, use, or modification.
          <br />
          <br />
          We do not share any personally identifying information publicly or
          with third parties, except when required to by law.
          <br />
          <br />
          HomeTail acts as a data controller and data processor regarding the
          personal data processed through HomeTail and its services, in
          compliance with applicable data protection laws.
          <br />
          <br />
          Our website and app may link to external sites not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites and cannot accept responsibility or liability for their
          respective privacy policies.
          <br />
          <br />
          You are free to refuse our request for your personal information,
          understanding that we may be unable to provide some of your desired
          services as a result.
          <br />
          <br />
          Your continued use of our website and app will be regarded as
          acceptance of our practices around privacy and personal information.
          If you have any questions about how we handle user data and personal
          information, feel free to contact us.
          <br />
          <br />
          This policy is effective as of October 10th, 2024.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
