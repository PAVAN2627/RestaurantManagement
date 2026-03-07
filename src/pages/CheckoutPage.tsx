import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet } from "lucide-react";

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cod" });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleRazorpayPayment = async () => {
    setLoading(true);
    
    // Load Razorpay script
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay. Please check your internet connection.");
      setLoading(false);
      return;
    }

    // TODO: Create order on backend
    // const orderResponse = await fetch('/api/orders/create-razorpay', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount: totalPrice, currency: 'INR' })
    // });
    // const orderData = await orderResponse.json();

    // Mock order data for demo
    const orderData = {
      id: `order_${Date.now()}`,
      amount: totalPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
    };

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Restaurant Name",
      description: "Order Payment",
      order_id: orderData.id,
      handler: function (response: any) {
        // TODO: Verify payment on backend
        // fetch('/api/orders/verify-payment', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     razorpay_order_id: response.razorpay_order_id,
        //     razorpay_payment_id: response.razorpay_payment_id,
        //     razorpay_signature: response.razorpay_signature
        //   })
        // });

        console.log("Payment successful:", response);
        toast.success("Payment successful! 🎉");
        clearCart();
        navigate("/profile");
      },
      prefill: {
        name: form.name || user?.name || "",
        email: user?.email || "",
        contact: form.phone || "",
      },
      theme: {
        color: "#D97706", // Your primary color
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
          toast.info("Payment cancelled");
        }
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.payment === "razorpay") {
      await handleRazorpayPayment();
    } else {
      // COD order
      setLoading(true);
      
      // TODO: Send order to backend
      // await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items, totalPrice, contact: form, payment: 'COD' })
      // });

      setTimeout(() => {
        toast.success("Order placed successfully! 🎉");
        clearCart();
        navigate("/profile");
        setLoading(false);
      }, 1000);
    }
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
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name *" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number *" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              <textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Delivery Address *" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <h2 className="font-display text-lg font-semibold">Payment Method</h2>
              
              <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={(e) => update("payment", e.target.value)} className="w-4 h-4 text-primary" />
                <Wallet className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-body font-semibold">Cash on Delivery</p>
                  <p className="font-body text-xs text-muted-foreground">Pay when you receive</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="payment" value="razorpay" checked={form.payment === "razorpay"} onChange={(e) => update("payment", e.target.value)} className="w-4 h-4 text-primary" />
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-body font-semibold">Pay Online (Razorpay)</p>
                  <p className="font-body text-xs text-muted-foreground">UPI, Cards, Wallets, Net Banking</p>
                </div>
              </label>

              {form.payment === "razorpay" && (
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <p className="font-body text-xs text-muted-foreground">
                    <strong>Note:</strong> Razorpay integration requires backend setup. Currently in demo mode.
                    Add your Razorpay key in .env: VITE_RAZORPAY_KEY_ID
                  </p>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold py-3 text-base"
            >
              {loading ? "Processing..." : `Place Order — ₹${totalPrice.toFixed(0)}`}
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
