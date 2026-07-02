import { SectionTitle } from "../../ui";

const styles = [
  { label: "Casual", image: "/assets/styles/casual.png", span: "md:col-span-1" },
  { label: "Formal", image: "/assets/styles/formal.png", span: "md:col-span-2" },
  { label: "Party",  image: "/assets/styles/party.png",  span: "md:col-span-2" },
  { label: "Gym",    image: "/assets/styles/gym.png",    span: "md:col-span-1" },
];

interface StyleBrowserProps {
  onStyleClick?: (style: string) => void;
}

export default function StyleBrowser({ onStyleClick }: StyleBrowserProps) {
  return (
    <section className="bg-[#F0F0F0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-10">
        <SectionTitle title="Browse By Dress Style" />
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
          {styles.map(({ label, image, span }) => (
            <div
              key={label}
              onClick={() => onStyleClick?.(label)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] ${span}`}
            >
              <img
                src={image}
                alt={label}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10" />
              <span className="absolute top-5 left-5 font-black text-xl md:text-2xl text-black">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
