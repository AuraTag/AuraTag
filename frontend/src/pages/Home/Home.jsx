import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Problem from "../../components/Problem/Problem";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Features from "../../components/Features/Features";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;