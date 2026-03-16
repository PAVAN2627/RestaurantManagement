import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Flame } from "lucide-react";
import { featuredMenuItems } from "@/data/menuData";

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on admin and user dashboard pages
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/profile")) {
    return null;
  }

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-1">
          <img src="/athenurawhitelogo.png" alt="Athenura" className="h-16 md:h-20 w-auto object-contain mb-4" />
          <p className="font-body text-sm text-secondary-foreground/70 leading-relaxed">
            A culinary experience that blends tradition with innovation. Every dish tells a story of passion and flavor.
          </p>
        </div>

        {/* Trending / Featured Menu */}
        <div className="lg:col-span-1">
          <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" /> Trending Dishes
          </h4>
          <div className="flex flex-col gap-3">
            {featuredMenuItems.map((item) => (
              <Link
                key={item.id}
                to={`/menu/${item.id}`}
                className="flex items-center gap-3 group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div>
                  <p className="font-body text-sm text-secondary-foreground/90 group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                  </p>
                  <p className="font-body text-xs text-secondary-foreground/50">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-secondary-foreground/70">
            <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
            <Link to="/reservation" className="hover:text-primary transition-colors">Reservations</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Legal</h4>
          <nav className="flex flex-col gap-2 font-body text-sm text-secondary-foreground/70">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 font-body text-sm text-secondary-foreground/70">
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Flavor Street, Mumbai</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@athenura.in</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 11 AM – 11 PM, Daily</div>
          </div>
        </div>
      </div>
      <div className="container border-t border-secondary-foreground/10 pt-6">
        <p className="text-center font-body text-xs text-secondary-foreground/50">
          © 2026 Athenura Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

