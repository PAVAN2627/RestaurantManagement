import { useState } from "react";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReservationPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Reservation confirmed! We'll see you soon.");
    setForm({ name: "", phone: "", guests: "2", date: "", time: "", notes: "" });
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container max-w-2xl">
        <div className="mb-10 text-center">
          <p className="font-body text-primary font-semibold text-sm tracking-widest uppercase mb-2">Reserve</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Book a Table</h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Secure your spot for a memorable dining experience. We look forward to hosting you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Name *</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 block">Phone *</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> Guests</label>
              <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> Date *</label>
              <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="font-body text-sm font-medium mb-1.5 flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Time *</label>
              <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-medium mb-1.5 block">Special Requests</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Any dietary needs or special requests?" />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold py-3 text-base">
            Confirm Reservation
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ReservationPage;
