import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reservation", label: "Reserve" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide header on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">
          Saffron<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <Link to={user?.role === "admin" ? "/admin" : "/profile"} className="p-2 rounded-full hover:bg-muted transition-colors">
              <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full" />
            </Link>
          ) : (
            <Link to="/login" className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Login">
              <User className="w-5 h-5 text-foreground" />
            </Link>
          )}

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border pb-4">
          <nav className="container flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`font-body text-sm font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
