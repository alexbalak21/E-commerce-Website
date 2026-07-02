import { useState } from "react";
import { ShoppingCart, CircleUserRound, Search, Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  onLogoClick?: () => void;
}

export default function Navbar({ onLogoClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Shop", hasDropdown: true },
    { label: "On Sale" },
    { label: "New Arrivals" },
    { label: "Brands" },
  ];

  return (
    <header className="bg-white border-b border-black/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        <button onClick={onLogoClick} className="text-xl font-black tracking-tight shrink-0">
          SHOP.CO
        </button>

        <nav className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((link) => (
            <a key={link.label} href="#" className="text-sm font-medium text-black/80 hover:text-black transition-colors inline-flex items-center gap-0.5">
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <input type="text" placeholder="Search for products..." className="w-full bg-[#F0F0F0] rounded-full pl-10 pr-4 py-2.5 text-sm text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-black/10" />
        </div>

        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors" aria-label="Account">
            <CircleUserRound className="w-5 h-5" />
          </button>
          <button className="md:hidden p-1.5 hover:bg-black/5 rounded-full transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/10 px-4 py-4 flex flex-col gap-4 bg-white">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input type="text" placeholder="Search for products..." className="w-full bg-[#F0F0F0] rounded-full pl-10 pr-4 py-2.5 text-sm outline-none" />
          </div>
          {navLinks.map((link) => (
            <a key={link.label} href="#" className="text-sm font-medium text-black/80 hover:text-black py-1">{link.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
