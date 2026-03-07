import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, CalendarDays, Truck } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";
import { menuItems } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";

const features = [
  { icon: UtensilsCrossed, title: "Curated Menu", desc: "Fresh ingredients, chef-crafted dishes" },
  { icon: Truck, title: "Fast Delivery", desc: "Hot food at your doorstep in 30 min" },
  { icon: CalendarDays, title: "Easy Reservations", desc: "Book your table in seconds" },
];

const Index = () => {
  const featured = menuItems.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Signature dish" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-xl animate-fade-in">
            <p className="font-body text-primary font-semibold tracking-widest uppercase text-sm mb-3">Welcome to Saffron</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground leading-tight mb-6">
              Where Every Bite Tells a Story
            </h1>
            <p className="font-body text-secondary-foreground/70 text-lg mb-8 max-w-md">
              Experience the finest culinary artistry with locally sourced ingredients and timeless recipes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Explore Menu <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 border border-secondary-foreground/30 text-secondary-foreground font-body font-semibold px-6 py-3 rounded-lg hover:bg-secondary-foreground/10 transition-colors"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <div className="p-3 rounded-lg bg-primary/10">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Our Specials</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Dishes</h2>
            </div>
            <Link to="/menu" className="hidden md:inline-flex items-center gap-1 font-body text-sm font-semibold text-primary hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
