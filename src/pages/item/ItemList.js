
import React, { useState, useEffect } from "react";

const ItemList = ({ refreshList, onEdit, onDelete }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/items", {
        credentials: "include", // use session cookie
      });

      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();
      setItems(data || []);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err.message || "Error fetching items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshList]);

  const handleEdit = (item) => {
    if (onEdit) onEdit(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`http://localhost:4000/items/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      if (onDelete) onDelete();
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(err.message || "Error deleting item");
    }
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const snakeCaseLabel = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const fields = [
    "item_id","item_name", "item_sku", "description", "is_composite", "item_type", "warehouse_name",
    "created_by", "bom_file", "is_fob", "category_name", "subcategory_name", "sub_sub_category",
    "material", "colour", "craft", "lal10_or_outside", "size", "selling_price", "cost_price",
    "inventory_quantity", "tax_preference", "hsn_sac", "style_number", "buyer_style_ref",
    "usage_units", "component_type"
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          Item List
        </h3>

        {items.length === 0 ? (
          <p className="p-6 text-gray-500">No items found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {fields.map((field) => (
                  <th
                    key={field}
                    className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase"
                  >
                    {snakeCaseLabel(field)}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id || item.item_id}>
                  {fields.map((field) => (
                    <td key={field} className="px-4 py-2 text-sm text-gray-700">
                      {field === "bom_file" && item[field] ? (
                        <a
                          href={item[field]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View File
                        </a>
                      ) : (
                        item[field]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id || item.item_id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ItemList;