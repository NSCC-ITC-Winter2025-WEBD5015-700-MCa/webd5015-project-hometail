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
          <div className="w-full max-w-[500px] aspect-[16/9]">
            <Image
              src={Keyfeature1}
              className="rounded-lg  w-full h-auto object-cover"
              alt="Keyfeature1"
              
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
                  <h3 className="leading-relaxed text-lg font-bold">AI Pet Matching Preferences</h3>
                  <p className="leading-relaxed text-lg">Our AI helps match pets with adopters based on lifestyle and preferences.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex gap-4">
                <div>
                  <FiCheckCircle size={30} color="#43b7ff" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="leading-relaxed text-lg font-bold">Verified & Trusted Listings</h3>
                  <p className="leading-relaxed text-lg">All properties go through a verification process to ensure safety and authenticity for tenants.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex gap-4">
                <div>
                  <FiCheckCircle size={30} color="#43b7ff" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="leading-relaxed text-lg font-bold">Easy Pet Search</h3>
                  <p className="leading-relaxed text-lg">Quickly find pets based on breed, age, and location</p>
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
                <h3 className="leading-relaxed text-lg font-bold">Favorite Pets</h3>
                <p className="leading-relaxed text-lg">Save pets you like and revisit them anytime.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4">
              <div>
                <FiCheckCircle size={30} color="#43b7ff" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="leading-relaxed text-lg font-bold">Instant Adoption Requests</h3>
                <p className="leading-relaxed text-lg">Instant Adoption Requests</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4">
              <div>
                <FiCheckCircle size={30} color="#43b7ff" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="leading-relaxed text-lg font-bold">Simple Profile Setup</h3>
                <p className="leading-relaxed text-lg"> No hidden fees,see upfront rental costs and terms clearly before committing.</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[500px] aspect-[16/9]">
            <Image
              src={Keyfeature2}
              className="rounded-lg  w-full h-auto object-cover"
              alt="Keyfeature2"
              
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFeatures;
