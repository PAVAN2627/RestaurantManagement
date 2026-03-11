import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse-soft pointer-events-none" />
        <div className="absolute top-24 right-[15%] w-14 h-14 border-2 border-primary/20 rounded-full animate-float-slow pointer-events-none" />
        <div className="absolute bottom-28 left-[18%] w-8 h-8 border border-primary/15 rounded-full animate-pulse-soft pointer-events-none" />
        <div className="absolute inset-0 hero-pattern pointer-events-none" />

        <div className="container relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-body text-primary font-semibold text-xs tracking-widest uppercase">Get in Touch</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 animate-fade-in-up">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="font-body text-secondary-foreground/70 text-lg md:text-xl max-w-xl mx-auto animate-fade-in-up stagger-1">
            We'd love to hear from you. Drop us a message or visit us — we're always here to help.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      <div className="container max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email Address" type="email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Your Message" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </form>

          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Visit Us", value: "123 Flavor Street, Bandra West, Mumbai 400050" },
              { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@spicegarden.in" },
              { icon: Clock, label: "Hours", value: "Mon–Sun: 11:00 AM – 11:00 PM" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10"><info.icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="font-body text-sm font-semibold mb-1">{info.label}</h3>
                  <p className="font-body text-sm text-muted-foreground">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
