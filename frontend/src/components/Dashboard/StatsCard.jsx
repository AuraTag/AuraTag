function StatsCard({ title, value }) {
  return (
    <div className="bg-[#1E2530] rounded-xl p-6">
      <h3 className="text-slate-400">{title}</h3>

      <p className="text-4xl font-bold mt-3 text-white">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;