const AboutPage = () => (
  <main className="pt-24 pb-20 min-h-screen bg-background">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Our Story</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About Saffron</h1>
        <p className="font-body text-muted-foreground text-lg leading-relaxed">
          Founded in 2020, Saffron is a celebration of culinary art — blending time-honored traditions with modern innovation. Every dish is crafted from locally sourced, seasonal ingredients by our team of passionate chefs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { num: "5+", label: "Years of Excellence" },
          { num: "50K+", label: "Happy Customers" },
          { num: "120+", label: "Signature Dishes" },
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-2xl bg-card border border-border">
            <p className="font-display text-4xl font-bold text-primary mb-2">{stat.num}</p>
            <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default AboutPage;
