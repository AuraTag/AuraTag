import Button from "../ui/Button";

function Hero() {
  return (
    <section className="min-h-[85vh] bg-[#0F1117] text-white flex items-center">

      <div className="max-w-7xl mx-auto px-6 w-full">

        <div className="max-w-3xl">

          <span className="text-[#D6B25E] font-medium">
            Secure Product Identity Platform
          </span>

          <h1 className="text-7xl font-bold leading-tight mt-4">
            Secure Every Product.
            <br />
            Protect Every Brand.
          </h1>

          <p className="text-slate-400 text-xl leading-9 mt-8">
            Authenticate genuine products using secure NFC
            technology and cryptographic verification.
          </p>

          <div className="flex gap-4 mt-10">

            <Button>
              Verify Now
            </Button>

            <Button variant="secondary">
              Learn More
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;