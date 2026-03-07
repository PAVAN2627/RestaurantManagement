import { useAuth } from "@/context/AuthContext";
import { Package, CalendarDays, User as UserIcon } from "lucide-react";
import { mockOrders, mockReservations } from "@/data/menuData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userOrders = mockOrders.filter((o) => o.userId === user.id);
  const userReservations = mockReservations.filter((r) => r.userId === user.id);

  const stats = [
    { label: "Total Orders", value: userOrders.length, icon: Package, color: "text-primary" },
    { label: "Active Reservations", value: userReservations.filter(r => r.status === "confirmed").length, icon: CalendarDays, color: "text-green-600" },
    { label: "Total Spent", value: `₹${userOrders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}`, icon: UserIcon, color: "text-blue-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold">{user.name}</h2>
            <p className="font-body text-sm text-muted-foreground">{user.email}</p>
            <span className="inline-block mt-2 font-body text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-5">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="font-body text-2xl font-bold">{stat.value}</p>
            <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/menu">
            <Button variant="outline" className="w-full font-body">
              Browse Menu
            </Button>
          </Link>
          <Link to="/reservation">
            <Button variant="outline" className="w-full font-body">
              Make Reservation
            </Button>
          </Link>
          <Link to="/profile/orders">
            <Button variant="outline" className="w-full font-body">
              View Orders
            </Button>
          </Link>
          <Link to="/profile/reservations">
            <Button variant="outline" className="w-full font-body">
              View Reservations
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Recent Orders</h3>
        {userOrders.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">No orders yet. Start ordering from our menu!</p>
        ) : (
          <div className="space-y-3">
            {userOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-body text-sm font-semibold">{order.id}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm font-bold text-primary">₹{order.totalPrice}</p>
                  <p className="font-body text-xs text-muted-foreground capitalize">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
