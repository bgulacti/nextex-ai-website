import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Problem from "@/sections/Problem";
import Partners from "@/sections/Partners";
import Flow from "@/sections/Flow";
import HowItWorks from "@/sections/HowItWorks";
import DefectIntelligence from "@/sections/DefectIntelligence";
import ProcessIntelligence from "@/sections/ProcessIntelligence";
import DataIntelligence from "@/sections/DataIntelligence";
import Sustainability from "@/sections/Sustainability";
import Products from "@/sections/Products";
import Architecture from "@/sections/Architecture";
import Operations from "@/sections/Operations";
import TeamContact from "@/sections/TeamContact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Partners />
      <Flow />
      <HowItWorks />
      <DefectIntelligence />
      <ProcessIntelligence />
      <div id="data">
        <DataIntelligence />
      </div>
      <Sustainability />
      <Products />
      <Architecture />
      <Operations />
      <TeamContact />
      <Footer />
    </main>
  );
}
