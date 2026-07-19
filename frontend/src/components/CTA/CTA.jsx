import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="bg-[#0F1117] py-28">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-[#1E2530] rounded-3xl p-12 text-center border border-[#D6B25E]/20">

          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Protect Your Brand?
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Join the future of premium alcohol authentication with AuraTag.
            Protect your customers, your reputation, and every bottle you produce.
          </p>

          <button className="bg-[#D6B25E] hover:bg-[#E5C97A] text-black font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition">
            Request a Demo
            <ArrowRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;