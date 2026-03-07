import { Package, CalendarDays, Users, TrendingUp, DollarSign, UtensilsCrossed } from "lucide-react";
import { mockOrders, mockReservations, mockUsers, menuItems } from "@/data/menuData";

const stats = [
  { label: "Total Orders", value: mockOrders.length, icon: Package, color: "text-primary" },
  { label: "Revenue", value: `₹${mockOrders.reduce((s, o) => s + o.totalPrice, 0).toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
  { label: "Reservations", value: mockReservations.filter((r) => r.status === "confirmed").length, icon: CalendarDays, color: "text-blue-600" },
  { label: "Active Users", value: mockUsers.filter((u) => u.role === "user").length, icon: Users, color: "text-orange-600" },
  { label: "Menu Items", value: menuItems.length, icon: UtensilsCrossed, color: "text-purple-600" },
  { label: "Avg Order", value: `₹${Math.round(mockOrders.reduce((s, o) => s + o.totalPrice, 0) / mockOrders.length)}`, icon: TrendingUp, color: "text-primary" },
];

const AdminOverview = () => {
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <p className="font-body text-2xl font-bold">{s.value}</p>
            <p className="font-body text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold mb-4">Recent Orders</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-body text-xs font-semibold text-muted-foreground p-3">Order ID</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground p-3 hidden md:table-cell">Customer</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground p-3">Total</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="font-body text-sm p-3 font-medium">{o.id}</td>
                <td className="font-body text-sm p-3 text-muted-foreground hidden md:table-cell">{o.customerName}</td>
                <td className="font-body text-sm p-3 font-semibold text-primary">₹{o.totalPrice}</td>
                <td className="p-3"><span className="font-body text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
