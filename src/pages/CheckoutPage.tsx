import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cod" });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate("/menu")} className="bg-primary text-primary-foreground font-body">Browse Menu</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <form onSubmit={handleOrder} className="md:col-span-3 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold">Delivery Details</h2>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name *" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number *" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Delivery Address *" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <h2 className="font-display text-lg font-semibold">Payment</h2>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={(e) => update("payment", e.target.value)} className="accent-primary" />
                <span className="font-body text-sm">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="payment" value="razorpay" checked={form.payment === "razorpay"} onChange={(e) => update("payment", e.target.value)} className="accent-primary" />
                <span className="font-body text-sm">Razorpay (Coming Soon)</span>
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold py-3 text-base">
              Place Order — ₹{totalPrice.toFixed(0)}
            </Button>
          </form>

          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between font-body text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-semibold">₹{(item.price * item.qty).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-body font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
