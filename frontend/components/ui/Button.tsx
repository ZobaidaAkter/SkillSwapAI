type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const base =
  "w-full rounded-xl py-3 font-semibold transition-all duration-300";

  const style =
  variant === "primary"
    ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-600/20"
    : "border border-slate-700 text-white hover:bg-slate-800";

  return (
    <button
      type={type}
      className={`${base} ${style}`}
    >
      {children}
    </button>
  );
}