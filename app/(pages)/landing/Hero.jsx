import Image from "next/image";
import Navbar from "@/app/(pages)/_components/Navbar";
import placeholder from "@/public/pet.jpg";

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
            <img src="/Button1.jpeg" alt="Adopt" className="w-8 h-8" />
            I want to adopt a pet
          </a>

          {/* Rehome Button */}
          <a
            href="#"
            className="flex items-center gap-x-3 bg-[#F7AFC3] hover:bg-[#F497B3] text-white font-semibold py-5 px-14 rounded-lg text-xl shadow-md transition-all"
          >
            <img src="/Button2.jpeg" alt="Rehome" className="w-8 h-8" />
            I need to list my pet
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
