function StatsCard({
  title,
  value,
  icon = "📊",
  color = "border-yellow-500",
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border ${color}
        bg-gradient-to-br
        from-[#1A1F2B]
        to-[#111827]
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-yellow-500/20
      `}
    >
      {/* Background Glow */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-yellow-500/10 blur-3xl"></div>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400 uppercase tracking-wider">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-white">
            {value}
          </h2>

          <p className="mt-3 text-sm text-green-400">
            ▲ Live Data
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/20 text-3xl">
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatsCard;