import FAQImage from "@/public/FAQ.jpg"; // Importing an image for the FAQ section
import Image from "next/image";

const FAQ = () => {
  const CollapseItem = ({ title, content, id }) => (
    <div className="collapse collapse-plus border-none rounded-lg shadow-md mb-4 w-full">
      {/* Checkbox for state control */}
      <input type="checkbox" id={id} className="peer hidden" />

      {/* Label to toggle collapse */}
      <label
        htmlFor={id}
        className="collapse-title flex justify-between items-center py-4 px-6 cursor-pointer text-xl font-semibold  peer-checked:bg-blue-200 peer-checked:text-blue-600 transition-all duration-300"
      >
        <span>{title}</span>
      </label>

      {/* Content Section */}
      <div className="collapse-content px-6 py-4 bg-gray-50 peer-checked:bg-blue-50 transition-all duration-300">
        <p className="text-lg text-gray-600">{content}</p>
      </div>
    </div>
  );

  return (
    <section
      id="FAQ"
      className="w-full flex justify-between items-center pt-32 pb-32 max-md:flex-col max-md:pb-16 max-md:pt-16 px-8 text-black dark:text-white"
    >
      {/* Left Section: Heading & Image */}
      <div className="w-1/2 flex flex-col items-start max-md:w-full max-md:items-center text-left max-md:text-center">
        <h2 className="text-4xl font-bold max-md:text-3xl">
          <span className="text-blue-400">Frequently </span> Asked Questions
        </h2>

        {/* Image Below Heading */}
        <Image
          src={FAQImage} // Replace with actual image path
          alt="FAQ Illustration"
          className="w-4/5 max-md:w-3/4 mt-6 rounded-lg "
        />
      </div>

      {/* Right Section: FAQ List */}
      <div className="w-1/2 flex flex-col max-md:w-full max-md:mt-8">
        <CollapseItem
          id="faq1"
          title="How do I adopt a pet?"
          content="To adopt a pet, simply browse our listings, contact the owner, and complete the adoption form."
        />
        <CollapseItem
          id="faq2"
          title="What are the adoption fees?"
          content="The adoption fee varies by pet type and location. Check the pet's page for specific details."
        />
        <CollapseItem
          id="faq3"
          title="Can I return the pet?"
          content="We hope you won't need to, but in case of an issue, please contact us and we’ll assist you with the process."
        />
        <CollapseItem
          id="faq4"
          title="How do I contact the pet owner?"
          content="Once you find a pet, you can send a message directly to the pet owner through our platform."
        />
      </div>
    </section>
  );
};

export default FAQ;
