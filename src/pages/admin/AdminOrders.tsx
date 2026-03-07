import { useState } from "react";
import { mockOrders, type Order } from "@/data/menuData";

const statusOptions = ["pending", "preparing", "ready", "delivered", "cancelled"] as const;

const statusColor: Record<string, string> = {
  pending: "bg-primary/20 text-primary",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-green-100 text-green-700",
  delivered: "bg-green-200 text-green-800",
  cancelled: "bg-destructive/20 text-destructive",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Orders Management</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...statusOptions].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-body text-xs font-medium px-3 py-1.5 rounded-full border transition-colors capitalize ${
              filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary"
            }`}
          >
            {s} {s !== "all" && `(${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-xl p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-body text-sm font-bold">{order.id}</h3>
                  <span className={`font-body text-xs px-2.5 py-1 rounded-full capitalize ${statusColor[order.status]}`}>{order.status}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">{order.customerName} · {order.phone}</p>
                <p className="font-body text-xs text-muted-foreground">{order.address}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleString()} · {order.payment}</p>
              </div>
              <div className="text-right">
                <p className="font-body text-lg font-bold text-primary">₹{order.totalPrice}</p>
              </div>
            </div>

            <div className="border-t border-border pt-3 mb-3">
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <span key={i} className="font-body text-xs bg-muted px-2.5 py-1 rounded-full">{item.name} ×{item.qty} (₹{item.price * item.qty})</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(order.id, s)}
                  disabled={order.status === s}
                  className={`font-body text-xs px-3 py-1.5 rounded-lg border transition-colors capitalize ${
                    order.status === s
                      ? "bg-primary/10 text-primary border-primary cursor-default"
                      : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
