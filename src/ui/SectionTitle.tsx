interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignClass}`}>
      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="text-black/60 text-sm max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
}
