interface BadgeProps {
  label: string; // e.g. "-20%"
  variant?: "discount" | "new";
}

export default function Badge({ label, variant = "discount" }: BadgeProps) {
  const variants = {
    discount: "bg-[#FF3333]/10 text-[#FF3333]",
    new: "bg-black/5 text-black",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
