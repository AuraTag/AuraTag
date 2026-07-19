function Button({
  children,
  variant = "primary",
  onClick,
}) {

  const styles = {
    primary:
      "bg-[#D6B25E] text-black hover:bg-[#E5C97A]",

    secondary:
      "border border-gray-600 text-white hover:bg-gray-800",
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;