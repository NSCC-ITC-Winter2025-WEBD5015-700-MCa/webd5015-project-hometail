import Image from "next/image";
import Keyfeature1 from "@/public/Keyfeature1.jpg";
import Keyfeature2 from "@/public/Keyfeature2.jpg";
import { FiCheckCircle } from "react-icons/fi";

const KeyFeatures = () => {
  return (
    <>
      <section
        id="Features"
        className="w-full flex justify-center pt-32 max-md:pt-16 light-text dark-text"
      >
        <div className="flex gap-10 items-center w-4/5 max-lg:w-full max-lg:flex-col max-lg:gap-16">
          <div className="w-1/2 flex justify-center max-lg:w-4/5">
            <Image
              src={Keyfeature1}
              className="rounded-lg opacity-50 w-full"
              alt=""
              placeholder="blur"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-8 max-lg:w-full">
            <div className="flex flex-col gap-8">
              <div className="flex gap-6 pb-6 max-md:pb-0">
                <h2 className="text-4xl font-bold leading-relaxed">
                  <span className="text-primary">Key </span>features
                </h2>
              </div>
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div>
                  <FiCheckCircle size={30} color="#43b7ff" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="leading-relaxed text-lg font-bold">AI Pet Matching</h3>
                  <p className="leading-relaxed text-lg">Find pet-friendly rentals effortlessly with our AI-powered pet compatibility tool.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex gap-4">
                <div>
                  <FiCheckCircle size={30} color="#43b7ff" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="leading-relaxed text-lg font-bold">Smart Budget Planner</h3>
                  <p className="leading-relaxed text-lg">Get insights on affordability and plan your rent expenses with ease.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex gap-4">
                <div>
                  <FiCheckCircle size={30} color="#43b7ff" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="leading-relaxed text-lg font-bold">Virtual Property Tours</h3>
                  <p className="leading-relaxed text-lg">Explore properties from the comfort of your home with immersive virtual tours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="Features"
        className="w-full flex justify-center max-lg:pt-8 bg-white dark:bg-[#1D232A] light-text dark-text"
      >
        <div className="flex gap-10 items-center w-4/5 max-lg:w-full max-lg:flex-col max-lg:gap-16">
          <div className="w-1/2 flex flex-col gap-8 max-lg:w-full">
            {/* Feature 4 */}
            <div className="flex gap-4">
              <div>
                <FiCheckCircle size={30} color="#43b7ff" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="leading-relaxed text-lg font-bold">24/7 Tenant Support</h3>
                <p className="leading-relaxed text-lg">Get assistance anytime with our round-the-clock support for renters.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4">
              <div>
                <FiCheckCircle size={30} color="#43b7ff" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="leading-relaxed text-lg font-bold">Seamless Communication</h3>
                <p className="leading-relaxed text-lg">Chat directly with landlords or property managers to speed up the rental process.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4">
              <div>
                <FiCheckCircle size={30} color="#43b7ff" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="leading-relaxed text-lg font-bold">Transparent Pricing</h3>
                <p className="leading-relaxed text-lg"> No hidden fees—see upfront rental costs and terms clearly before committing.</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center max-lg:w-4/5">
            <Image
              src={Keyfeature2}
              className="rounded-lg opacity-50 w-full"
              alt=""
              placeholder="blur"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
