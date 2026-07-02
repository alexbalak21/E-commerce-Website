import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-black text-white text-sm py-3 px-4 text-center relative">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="font-semibold underline underline-offset-2 hover:opacity-80">
          Sign Up Now
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
