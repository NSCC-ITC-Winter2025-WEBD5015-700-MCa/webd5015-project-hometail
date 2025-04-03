import HowItWorks from "@/app/(pages)/landing/HowItWorks";
import KeyFeatures from "@/app/(pages)/landing/KeyFeatures";
import Pricing from "@/app/(pages)/landing/Pricing";
import Hero from "@/app/(pages)/landing/Hero";
import FAQ from "@/app/(pages)/landing/FAQ";
import Navbar from "./(pages)/_components/Navbar";
import Footer from "./(pages)/_components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-[1300px] mx-auto px-6">
        <HowItWorks />
        <KeyFeatures />
        <FAQ />
        <Pricing title={"Pricing"} width={"w-[350px]"} />
        <Footer />
      </div>
    </>
  );
}
