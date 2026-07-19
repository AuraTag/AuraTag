import CTA from "../../components/CTA/CTA";
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold">Home Page</h1>
    </div>
    
  );
}
<>
  <Navbar />
  <Hero />
  <Problem />
  <HowItWorks />
  <Features />
  <CTA />
</>
export default Home;