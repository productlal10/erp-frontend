

import React, { useState, useEffect } from "react";

const ItemForm = ({ item, onItemSaved}) => {
  const [formData, setFormData] = useState({
    is_composite: "",
    item_type: "",
    warehouse_name: "",
    created_by: "zohoadmin_lal10",
    bom_file: null,
    is_fob: "",
    category_name: "",
    subcategory_name: "",
    sub_sub_category: "",
    material: "",
    colour: "",
    craft: "",
    lal10_or_outside: "",
    size: "",
    item_name: "",
    item_sku: "",
    description: "",
    selling_price: "",
    cost_price: "",
    inventory_quantity: "",
    tax_preference: "",
    hsn_sac: "",
    style_number: "",
    buyer_style_ref: "",
    usage_units: "",
    component_type: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const valueFromItem = (obj, ...keys) => {
    if (!obj) return "";
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] !== undefined && obj[k] !== null) {
        return obj[k];
      }
    }
    return "";
  };

  useEffect(() => {
    if (item) {
      setFormData({
        is_composite: valueFromItem(item, "is_composite"),
        item_type: valueFromItem(item, "item_type"),
        warehouse_name: valueFromItem(item, "warehouse_name"),
        created_by: valueFromItem(item, "created_by") || "zohoadmin_lal10",
        bom_file: null,
        is_fob: valueFromItem(item, "is_fob"),
        category_name: valueFromItem(item, "category_name"),
        subcategory_name: valueFromItem(item, "subcategory_name"),
        sub_sub_category: valueFromItem(item, "sub_sub_category"),
        material: valueFromItem(item, "material"),
        colour: valueFromItem(item, "colour"),
        craft: valueFromItem(item, "craft"),
        lal10_or_outside: valueFromItem(item, "lal10_or_outside"),
        size: valueFromItem(item, "size"),
        item_name: valueFromItem(item, "item_name"),
        item_sku: valueFromItem(item, "item_sku"),
        description: valueFromItem(item, "description"),
        selling_price: valueFromItem(item, "selling_price"),
        cost_price: valueFromItem(item, "cost_price"),
        inventory_quantity: valueFromItem(item, "inventory_quantity"),
        tax_preference: valueFromItem(item, "tax_preference"),
        hsn_sac: valueFromItem(item, "hsn_sac"),
        style_number: valueFromItem(item, "style_number"),
        buyer_style_ref: valueFromItem(item, "buyer_style_ref"),
        usage_units: valueFromItem(item, "usage_units"),
        component_type: valueFromItem(item, "component_type")
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? (files && files[0] ? files[0] : null) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = item && item.item_id
        ? `http://localhost:4000/items/${item.item_id}` // using item_id for PUT
        : "http://localhost:4000/items";

      const method = item && item.item_id ? "PUT" : "POST";

      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
        }
      });

      const resp = await fetch(url, {
        method,
        body: formPayload,
        credentials: "include"
      });

      // Fix: Remove unused variable 'data' to clear ESLint warning
      await resp.json().catch(() => ({}));

      if (!resp.ok) throw new Error("Failed to save item");

      alert(item ? "Item updated successfully!" : "Item saved successfully!");

      // Reset form
      setFormData({
        is_composite: "",
        item_type: "",
        warehouse_name: "",
        created_by: "zohoadmin_lal10",
        bom_file: null,
        is_fob: "",
        category_name: "",
        subcategory_name: "",
        sub_sub_category: "",
        material: "",
        colour: "",
        craft: "",
        lal10_or_outside: "",
        size: "",
        item_name: "",
        item_sku: "",
        description: "",
        selling_price: "",
        cost_price: "",
        inventory_quantity: "",
        tax_preference: "",
        hsn_sac: "",
        style_number: "",
        buyer_style_ref: "",
        usage_units: "",
        component_type: ""
      });

      onItemSaved && onItemSaved();
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const snakeCaseLabel = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl">
      <h2 className="mb-6 text-2xl font-semibold">Item Master</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Composite, Item Type, Warehouse, Created By, Is FOB */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Composite Item</label>
          <select name="is_composite" value={formData.is_composite} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded">
            <option value="">-Select-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Item Type</label>
          <select name="item_type" value={formData.item_type} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded">
            <option value="">-Select-</option>
            <option value="Goods">Goods</option>
            <option value="Fabrics">Fabrics</option>
            <option value="Trims">Trims</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Warehouse Name</label>
          <input type="text" name="warehouse_name" value={formData.warehouse_name} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
        </div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Created By</label>
          <input type="text" name="created_by" value={formData.created_by} readOnly className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
        </div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Is FOB</label>
          <select name="is_fob" value={formData.is_fob} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded">
            <option value="">-Select-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold">Goods Item Info</h3>
      <div className="grid grid-cols-3 gap-6">
        {["category_name","subcategory_name","sub_sub_category","material","colour","craft","lal10_or_outside","size"].map(field => (
          <div className="flex items-center" key={field}>
            <label className="w-40 text-sm font-medium text-gray-700">{snakeCaseLabel(field)}</label>
            <input type="text" name={field} value={formData[field]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
          </div>
        ))}
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold">Item Details</h3>
      <div className="grid grid-cols-3 gap-6">
        {["item_name","item_sku","description","selling_price","cost_price","inventory_quantity","tax_preference","hsn_sac","style_number","buyer_style_ref","usage_units","component_type"].map(field => (
          <div className="flex items-center" key={field}>
            <label className="w-40 text-sm font-medium text-gray-700">{snakeCaseLabel(field)}</label>
            {field==="description" ? (
              <textarea name={field} value={formData[field]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" rows={3} />
            ) : (
              <input type="text" name={field} value={formData[field]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
            )}
          </div>
        ))}

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">BOM File</label>
          <input type="file" name="bom_file" onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
        </div>
      </div>

      <div className="flex justify-start mt-6 space-x-3 text-sm">
        <button type="submit" disabled={loading} className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
          {loading ? "Saving..." : item ? "Update" : "Submit"}
        </button>
        <button type="reset" onClick={() => setFormData({
          is_composite: "",
          item_type: "",
          warehouse_name: "",
          created_by: "zohoadmin_lal10",
          bom_file: null,
          is_fob: "",
          category_name: "",
          subcategory_name: "",
          sub_sub_category: "",
          material: "",
          colour: "",
          craft: "",
          lal10_or_outside: "",
          size: "",
          item_name: "",
          item_sku: "",
          description: "",
          selling_price: "",
          cost_price: "",
          inventory_quantity: "",
          tax_preference: "",
          hsn_sac: "",
          style_number: "",
          buyer_style_ref: "",
          usage_units: "",
          component_type: ""
        })} className="px-4 py-1 text-black bg-gray-300 rounded hover:bg-gray-400">
          Reset
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </form>
  );
};

export default ItemForm