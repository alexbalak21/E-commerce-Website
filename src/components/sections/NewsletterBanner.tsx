import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "../../ui";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-black rounded-3xl px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Headline */}
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight max-w-sm">
          Stay Upto Date About Our Latest Offers
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full md:w-auto md:min-w-[340px]"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-white rounded-full pl-11 pr-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full !bg-white !text-black hover:!bg-white/90"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  );
}
