import Image from "next/image";
import placeholder from "@/public/pet.jpg";
import Link from "next/link";
import button1 from "@/public/Button2.jpeg";
import button2 from "@/public/Button1.jpeg";

const Hero = () => {
  return (
    <section id="Home" className="relative w-full h-screen">
      {/* Background Image */}
      <div className="w-full">
        <Image
          src={placeholder}
          alt=""
          fill
          priority
          placeholder="blur"
          className="object-cover opacity-50"
        />
      </div>
      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col w-full px-6 pt-[20vh] gap-8 max-md:gap-16 max-md:pt-[15vh] items-center text-center justify-between">
        <h1 className="text-5xl max-md:text-4xl leading-tight font-bold text-white drop-shadow-lg">
          Find Your New Best Friend Today!
        </h1>
        <p className="text-xl light-text text-white drop-shadow-lg font-semibold">
          Your new best friend is just a click away
          <br />
          Browse and adopt today!
        </p>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6">
          {/* Adopt Button */}
          <a
            href="#"
            className="flex items-center gap-x-3 bg-[#F7AFC3] hover:bg-[#F497B3] text-white font-semibold py-5 px-14 rounded-lg text-xl shadow-md transition-all"
          >
            <Image src={button1} alt="Rehome" className="w-12 h-12" />I want to
            adopt a pet
          </a>

          {/* Rehome Button */}
          <Link
            href="list-pet"
            className="flex items-center gap-x-3 bg-[#F7AFC3] hover:bg-[#F497B3] text-white font-semibold py-5 px-14 rounded-lg text-xl shadow-md transition-all"
          >
            <Image src={button2} alt="Rehome" className="w-12 h-12" />I need to
            list my pet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
