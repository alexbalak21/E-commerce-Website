interface StarRatingProps {
  rating: number; // e.g. 4.5
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function StarRating({
  rating,
  max = 5,
  showLabel = true,
  size = "md",
}: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = rating >= i + 1;
          const half = !filled && rating >= i + 0.5;

          return (
            <svg
              key={i}
              className={starSize}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor="#FFC633" />
                  <stop offset="50%" stopColor="#E5E5E5" />
                </linearGradient>
              </defs>
              <polygon
                points="10,1 12.9,7 19.5,7.6 14.7,12 16.2,18.5 10,15 3.8,18.5 5.3,12 0.5,7.6 7.1,7"
                fill={
                  filled
                    ? "#FFC633"
                    : half
                    ? `url(#half-${i})`
                    : "#E5E5E5"
                }
              />
            </svg>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm text-black/60 font-medium">
          {rating}/{max}
        </span>
      )}
    </div>
  );
}
