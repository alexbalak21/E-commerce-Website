import { useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { StarRating, SectionTitle } from "../../ui";

const reviews = [
  {
    id: "r1",
    user: "Sarah M.",
    rating: 5,
    comment:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: "r2",
    user: "Alex K.",
    rating: 5,
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: "r3",
    user: "James L.",
    rating: 5,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: "r4",
    user: "Moose K.",
    rating: 4,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header row */}
      <div className="flex items-center justify-between mb-10">
        <SectionTitle title="Our Happy Customers" align="left" />
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:border-black transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center hover:border-black transition-colors"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            className="snap-start shrink-0 w-[300px] md:w-[380px] bg-white border border-black/10 rounded-2xl p-7 flex flex-col gap-4"
          >
            <StarRating rating={review.rating} showLabel={false} />
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{review.user}</span>
              <CheckCircle className="w-4 h-4 text-[#01AB31] fill-[#01AB31] text-white" />
            </div>
            <p className="text-sm text-black/60 leading-relaxed">"{review.comment}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}
