import {
  ShieldCheck,
  Smartphone,
  Database,
  Clock,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure Authentication",
      description:
        "Every bottle is verified using cryptographically secure NFC technology.",
    },
    {
      icon: <Smartphone size={40} />,
      title: "Instant Verification",
      description:
        "Customers simply tap the bottle with their NFC-enabled phone.",
    },
    {
      icon: <Database size={40} />,
      title: "Cloud Dashboard",
      description:
        "Manufacturers can register and manage bottles from one dashboard.",
    },
    {
      icon: <Clock size={40} />,
      title: "Real-Time Validation",
      description:
        "Each verification request is checked instantly through the AuraTag server.",
    },
  ];

  return (
    <section className="bg-[#161B22] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white mb-4">
          Why Choose AuraTag?
        </h2>

        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
          Protect your premium alcohol brand with secure NFC authentication
          and real-time verification.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1E2530] rounded-2xl p-8 border border-white/5 hover:border-[#D6B25E] transition duration-300"
            >
              <div className="text-[#D6B25E] mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;