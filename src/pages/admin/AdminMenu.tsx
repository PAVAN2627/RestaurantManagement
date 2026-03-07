import { useState } from "react";
import { menuItems as initialItems, categories, type MenuItem } from "@/data/menuData";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminMenu = () => {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "Starters", price: "", image: "" });

  const openNew = () => {
    setForm({ name: "", description: "", category: "Starters", price: "", image: "" });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item: MenuItem) => {
    setForm({ name: item.name, description: item.description, category: item.category, price: String(item.price), image: item.image });
    setEditing(item);
    setShowForm(true);
  };

  const save = () => {
    if (!form.name || !form.price) { toast.error("Name and price required"); return; }
    if (editing) {
      setItems((prev) => prev.map((i) => i.id === editing.id ? { ...i, name: form.name, description: form.description, category: form.category, price: Number(form.price) } : i));
      toast.success("Item updated");
    } else {
      const newItem: MenuItem = {
        id: `new-${Date.now()}`,
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        image: items[0]?.image || "",
        isAvailable: true,
      };
      setItems((prev) => [...prev, newItem]);
      toast.success("Item added");
    }
    setShowForm(false);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item deleted");
  };

  const toggleAvailability = (id: string) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Menu Management</h1>
        <Button onClick={openNew} className="bg-primary text-primary-foreground font-body font-semibold gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">{editing ? "Edit Item" : "New Item"}</h2>
            <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Item Name *" className="px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="Price (₹) *" type="number" className="px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Description" rows={2} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          <Button onClick={save} className="bg-primary text-primary-foreground font-body font-semibold">{editing ? "Save Changes" : "Add Item"}</Button>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["Image", "Name", "Category", "Price", "Available", "Actions"].map((h) => (
                  <th key={h} className="text-left font-body text-xs font-semibold text-muted-foreground p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="p-3"><img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" /></td>
                  <td className="font-body text-sm p-3 font-medium">{item.name}</td>
                  <td className="font-body text-xs p-3 text-muted-foreground">{item.category}</td>
                  <td className="font-body text-sm p-3 font-semibold text-primary">₹{item.price}</td>
                  <td className="p-3">
                    <button onClick={() => toggleAvailability(item.id)} className={`font-body text-xs px-2.5 py-1 rounded-full ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-destructive/20 text-destructive"}`}>
                      {item.isAvailable ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
