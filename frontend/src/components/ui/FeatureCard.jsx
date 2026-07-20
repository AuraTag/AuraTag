function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#1E2530] border border-white/5 rounded-2xl p-6 hover:scale-105 transition duration-300">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;