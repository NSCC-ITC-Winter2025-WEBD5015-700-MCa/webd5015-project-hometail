import HowItWorks from "@/app/(pages)/landing/HowItWorks";
import KeyFeatures from "@/app/(pages)/landing/KeyFeatures";
import Pricing from "@/app/(pages)/landing/Pricing";
import Hero from "@/app/(pages)/landing/Hero";
import FAQ from "@/app/(pages)/landing/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-[1300px] mx-auto px-6">
        <HowItWorks />
        <KeyFeatures />
        <FAQ />
        <Pricing title={"Subscription"} width={"w-[350px]"} />
      </div>
    </>
  );
}
