import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "solid",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none";

  const variants = {
    solid:
      "bg-black text-white hover:bg-neutral-800 active:scale-95",
    outline:
      "bg-white text-black border border-black/20 hover:border-black/40 active:scale-95",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
