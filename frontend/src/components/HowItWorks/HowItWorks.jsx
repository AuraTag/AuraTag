import {
  Factory,
  Smartphone,
  ShieldCheck,
  ScanQrCode,
  CheckCircle2
} from "lucide-react";

function HowItWorks() {

  const steps = [
    {
      icon: <Factory size={42} />,
      title: "Register Bottle",
      description: "Manufacturer registers every bottle."
    },
    {
      icon: <ScanQrCode size={42} />,
      title: "Program NFC Tag",
      description: "Secure NFC tag is linked to the bottle."
    },
    {
      icon: <Smartphone size={42} />,
      title: "Tap Bottle",
      description: "Customer taps the NFC-enabled bottle."
    },
    {
      icon: <ShieldCheck size={42} />,
      title: "Verify",
      description: "AuraTag validates the authentication."
    },
    {
      icon: <CheckCircle2 size={42} />,
      title: "Result",
      description: "Customer sees Genuine or Counterfeit."
    }
  ];

  return (
    <section className="bg-[#0F1117] py-28">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          How AuraTag Works
        </h2>

        <div className="grid md:grid-cols-5 gap-6">

          {steps.map((step) => (

            <div
              key={step.title}
              className="text-center bg-[#1E2530] rounded-2xl p-8 border border-white/5 hover:border-[#D6B25E] transition"
            >

              <div className="flex justify-center text-[#D6B25E] mb-5">
                {step.icon}
              </div>

              <h3 className="font-semibold text-lg mb-3">
                {step.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;