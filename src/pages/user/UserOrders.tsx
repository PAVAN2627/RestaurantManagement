import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Order } from "@/context/OrderContext";

const statusColor: Record<string, string> = {
  pending: "bg-primary/20 text-primary",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-green-100 text-green-700",
  delivered: "bg-green-200 text-green-800",
  cancelled: "bg-destructive/20 text-destructive",
};

const UserOrders = () => {
  const { user } = useAuth();
  const { getUserOrders, updateOrderStatus } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setOrders(getUserOrders(user.id));
    }

    // Listen for storage changes (when admin updates status)
    const handleStorageChange = () => {
      if (user) {
        setOrders(getUserOrders(user.id));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    window.addEventListener('ordersUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ordersUpdated', handleStorageChange);
    };
  }, [user, getUserOrders]);

  const canCancelOrder = (order: Order) => {
    return order.status === "pending" || order.status === "preparing";
  };

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, "cancelled");
    setOrders(getUserOrders(user!.id));
    toast.success("Order cancelled successfully");
    setCancelOrderId(null);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">No Orders Yet</h2>
        <p className="font-body text-muted-foreground mb-6">Start ordering delicious food from our menu!</p>
        <Button onClick={() => window.location.href = "/menu"} className="bg-primary text-primary-foreground font-body">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">My Orders</h1>
        <p className="font-body text-sm text-muted-foreground">{orders.length} total orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-body text-lg font-bold">{order.id}</h3>
                  <span className={`font-body text-xs px-2.5 py-1 rounded-full capitalize ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Payment: {order.payment}
                </p>
              </div>
              <div className="text-right">
                <p className="font-body text-2xl font-bold text-primary">₹{order.totalPrice}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-body text-sm font-semibold mb-2">Items:</h4>
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <span key={i} className="font-body text-xs bg-muted px-3 py-1.5 rounded-full">
                    {item.name} ×{item.qty} (₹{item.price * item.qty})
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-body text-sm font-semibold mb-2">Delivery Details:</h4>
              <p className="font-body text-sm text-muted-foreground">{order.contact.name}</p>
              <p className="font-body text-sm text-muted-foreground">{order.contact.phone}</p>
              <p className="font-body text-sm text-muted-foreground">{order.contact.address}</p>
            </div>

            {/* Cancellation Reason */}
            {order.cancellationReason && (
              <div className="border-t border-border pt-4 mb-4">
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="font-body text-sm text-destructive">
                    <strong>Cancellation Reason:</strong> {order.cancellationReason}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            {canCancelOrder(order) && (
              <div className="border-t border-border pt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setCancelOrderId(order.id)}
                  className="font-body gap-2"
                >
                  <X className="w-4 h-4" /> Cancel Order
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelOrderId} onOpenChange={() => setCancelOrderId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelOrderId && handleCancelOrder(cancelOrderId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserOrders;
