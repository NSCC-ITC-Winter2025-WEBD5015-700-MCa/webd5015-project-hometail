"use client";

import { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const plans = [
  {
    link: "https://buy.stripe.com/cN26qR16F2UUe1G7sv",
    priceId: "price_1Q8UhYHbTfdUSDfilKK7lqyt",
    price: 9.99,
    duration: "/month",
  },
  {
    link: "https://buy.stripe.com/6oEbLb4iRanm2iY148",
    priceId: "price_1Q8Ul0HbTfdUSDfisT1dNt3Z",
    price: 99,
    duration: "/year",
  },
];

// export const plansTest = [
//   {
//     link: "https://buy.stripe.com/test_dR6bKB9KA36i5Gg5kk",
//     priceId: "price_1Q6xtyHbTfdUSDfiVTbqlxuT",
//     price: 9.99,
//     duration: "/month",
//   },
//   {
//     link: "https://buy.stripe.com/test_5kA4i98GwgX8fgQeUV",
//     priceId: "price_1Q6y1RHbTfdUSDfiONvUDLW2",
//     price: 99,
//     duration: "/year",
//   },
// ];

const Pricing = ({ title, width }) => {
  const { data: session, status: status } = useSession();
  const path = usePathname();
  const [plan, setPlan] = useState(plans[0]);
  const [isYearly, setIsYearly] = useState(false);

  const handlePricingToggle = (e) => {
    setIsYearly(e.target.value === "yearly");
  };

  const planTypes = [
    {
      name: "Free Account",
      priceMonthly: "FREE",
      priceYearly: "FREE",
      description: "Limited access to pet adoption features.",
      features: [
        { text: "Browse pet listings", available: true },
        { text: "See limited details of pets", available: true },
        { text: "Message pet owner", available: false },
        { text: "List a pet for adoption", available: false },
        { text: "Adopt a pet", available: false },
      ],
      isPopular: false,
      hasToggle: false,
    },
    {
      name: "Premium Account",
      priceMonthly: "9.99",
      priceYearly: "99",
      description: "Full access to pet adoption features.",
      features: [
        { text: "Browse pet listings", available: true },
        { text: "See all details of pets", available: true },
        { text: "Can message pet owner", available: true },
        { text: "Can adopt pet", available: true },
        { text: "Can list pet for adoption", available: true },
      ],
      isPopular: true,
      hasToggle: true,
    },
  ];

  return (
    <>
      <section
        id="Pricing"
        className={`w-full flex justify-center light-text dark-text ${
          path === "/subscribe" ? "pb-14" : "pb-32"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold max-md:text-3xl dark-text light-text">
              {title}
            </h2>
          </div>
          <div className="flex">
            <div className="flex max-md:flex-col justify-center gap-20 max-md:gap-10">
              {/* Free Account Plan */}
              {path === "/" && (
                <div
                  className={`p-8 rounded-lg shadow-lg relative border-2 border-gray-400 ${width}`}
                >
                  <h2 className="text-2xl font-semibold mb-4 text-success">
                    Free Account
                  </h2>
                  <p className="mb-8 light-text dark-text h-[60px]">
                  {planTypes[0].description}
                  </p>
                  <div className="h-[120px]">
                    <div className="text-5xl font-bold mb-6 flex items-center justify-center">
                      FREE
                    </div>
                  </div>
                  <Link href="/login">
                    <button className="btn btn-success mb-6 w-full">
                      Get started
                    </button>
                  </Link>
                  <ul className="text-left space-y-4 light-text dark-text">
                    {planTypes[0].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className={feature.available ? "text-green-400" : "text-red-400"}>
                    {feature.available ? <ImCheckmark /> : <ImCross />}
                        </span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Premium Account Plan  */}
              <div
                className={`p-8 rounded-lg shadow-lg relative border-2 border-blue-400 ${width}`}
              >
                {isYearly && (
                  <div className="absolute bg-blue-400 text-black top-2 right-2 text-baseline font-semibold p-2 rounded-full">
                    Popular
                  </div>
                )}
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Premium Account
                </h2>
                <p className="mb-8 light-text dark-text h-[60px]">
                  {planTypes[1].description}
                </p>
                <div className="h-[120px]">
                  <div className="text-5xl font-bold mb-6 flex items-center justify-center">
                    $
                    {isYearly
                      ? planTypes[1].priceYearly
                      : planTypes[1].priceMonthly}
                    <span className="text-base font-normal flex pl-1">
                      {isYearly ? "/yr" : "/mo"}
                    </span>
                  </div>
                  {planTypes[1].hasToggle && (
                    <div className="flex justify-center gap-4 mb-8">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          value="monthly"
                          checked={!isYearly}
                          onChange={handlePricingToggle}
                          className="radio checked:bg-blue-400"
                          onClick={() => setPlan(plans[0])}
                        />
                        <span className="text-sm">Monthly</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          value="yearly"
                          checked={isYearly}
                          onChange={handlePricingToggle}
                          className="radio checked:bg-blue-400"
                          onClick={() => setPlan(plans[1])}
                        />
                        <span className="text-sm">Yearly</span>
                      </label>
                    </div>
                  )}
                </div>
                {path === "/" ? (
                  <Link href="/login">
                    <button className="btn btn-primary mb-6 w-full text-black dark:text-white">
                      Get started
                    </button>
                  </Link>
                ) : (
                  <a
                    href={plan.link + "?prefilled_email=" + session?.user.email}
                    target="_blank"
                  >
                    <button className="btn btn-primary mb-6 w-full text-black text-base dark:text-white">
                      Subscribe
                    </button>
                  </a>
                )}
                <ul className="text-left space-y-4 light-text dark-text">
                  {planTypes[1].features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-green-400">
                        <ImCheckmark />
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;