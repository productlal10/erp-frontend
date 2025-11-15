

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
    tax_preference: "Taxable",
    hsn_sac: "",
    style_number: "",
    buyer_style_ref: "",
    usage_units: "",
    component_type: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ADDING NEW THINGS FOR DROPDOWNS --- IGNORE ---

  // HSN dynamic states
const [hsnList, setHsnList] = useState([]);
const [newHsnInput, setNewHsnInput] = useState("");
const [hsnModalOpen, setHsnModalOpen] = useState(false);
const [hsnLoading, setHsnLoading] = useState(false);


  const warehouseOptions = ["Job Worker Warehouse", "NOIDA Corporate Warehouse"];

  const categoryOptions = [
  "Apparel",
  "Hard Goods",
  "Home, Lifestyle & Pet",
  "Indian Fabrics",
  "Kitchen and Dining",
  "Lightings",
  "Miscellaneous",
  "Soft-Home Furnishing"
];

const subcategoryOptions = [
  "Bath & Wellness",
  "Bed Linen",
  "Cosmetics & Fragrances",
  "Crockery",
  "Cutlery",
  "Dyed"
];

const subSubCategoryOptions = [
  "2- Piece Set- Top & Bottom",
  "3 Piece Set-Kurta, Bottom Dupatta",
  "30s Rayon",
  "60s Cambric",
  "Ajrakh Print",
  "Applique Work"
];

const materialOptions = [
  "30s Cotton",
  "30s Cotton Slub",
  "40s Cotton Slub",
  "7030 CABANA STRIPE BEACH TOWEL",
  "Acrylic",
  "Acrylic Wool"
];

const colourOptions = [
  "Aqua",
  "Baby Blue",
  "Beige",
  "Black",
  "Bloom",
  "Blue"
];

const craftOptions = [
  "Aal Dyed",
  "Ajrakh",
  "Aluminium",
  "Anarkali",
  "Applique Work",
  "Bagh Printing"
];

const lal10OutsideOptions = [
  "Lal10-L",
  "Not Lal10-NL"
];

const sizeOptions = [
  "110 INCH",
  "12",
  "18 INCH X 18 INCH",
  "1X",
  "20 INCH X 20 INCH",
  "20MM X 30MM"
];


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
        tax_preference: valueFromItem(item, "tax_preference") || "Taxable",
        hsn_sac: valueFromItem(item, "hsn_sac"),
        style_number: valueFromItem(item, "style_number"),
        buyer_style_ref: valueFromItem(item, "buyer_style_ref"),
        usage_units: valueFromItem(item, "usage_units"),
        component_type: valueFromItem(item, "component_type")
      });
    }
  }, [item]);


  useEffect(() => {
  fetchHsnList();
}, []);

const fetchHsnList = async () => {
  try {
    const res = await fetch("http://localhost:4000/hsn", {
      credentials: "include",
    });
    const data = await res.json();
    setHsnList(data);
  } catch (err) {
    console.log("HSN fetch error: ", err);
  }
};



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
        tax_preference: "Taxable",
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
          <select name="warehouse_name" value={formData.warehouse_name} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded">
  <option value="">-Select-</option>
  {warehouseOptions.map((w) => (
    <option key={w} value={w}>{w}</option>
  ))}
</select>
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
        <div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Category Name</label>
  <select
    name="category_name"
    value={formData.category_name}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {categoryOptions.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
</div>

{/* Subcategory Name Dropdown */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">Subcategory Name</label>
    <select
      name="subcategory_name"
      value={formData.subcategory_name}
      onChange={handleChange}
      className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
    >
      <option value="">-Select-</option>
      {subcategoryOptions.map((sub) => (
        <option key={sub} value={sub}>{sub}</option>
      ))}
    </select>
  </div>

  {/* Sub Sub Category Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Sub Sub Category</label>
  <select
    name="sub_sub_category"
    value={formData.sub_sub_category}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {subSubCategoryOptions.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
</div>

{/* Material Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Material</label>
  <select
    name="material"
    value={formData.material}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {materialOptions.map((mat) => (
      <option key={mat} value={mat}>{mat}</option>
    ))}
  </select>
</div>

{/* Colour Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Colour</label>
  <select
    name="colour"
    value={formData.colour}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {colourOptions.map(c => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
</div>

{/* Craft Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Craft</label>
  <select
    name="craft"
    value={formData.craft}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {craftOptions.map(craft => (
      <option key={craft} value={craft}>{craft}</option>
    ))}
  </select>
</div>

{/* Lal10 or Outside Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Lal10 or Outside</label>
  <select
    name="lal10_or_outside"
    value={formData.lal10_or_outside}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {lal10OutsideOptions.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
</div>

{/* Size Dropdown */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Size</label>
  <select
    name="size"
    value={formData.size}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {sizeOptions.map(size => (
      <option key={size} value={size}>{size}</option>
    ))}
  </select>
</div>
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold">Item Details</h3>

      <div className="grid grid-cols-3 gap-6">
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">
      Tax Preference
    </label>

    <select
      name="tax_preference"
      value={formData.tax_preference}
      onChange={handleChange}
      className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
    >
      <option value="Taxable">Taxable</option>
      <option value="Non-Taxable">Non-Taxable</option>
    </select>
  </div>
</div>

      
      <div className="grid grid-cols-3 gap-6">
        {["item_name","item_sku","description","selling_price","cost_price","inventory_quantity","style_number","buyer_style_ref","usage_units","component_type"].map(field => (
          <div className="flex items-center" key={field}>
            <label className="w-40 text-sm font-medium text-gray-700">{snakeCaseLabel(field)}</label>
            
            {field === "description" ? (
              <textarea
              name={field}
              value={formData[field]}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            rows={3}
            />
          ) : (
        <input
        type={
        ["selling_price", "cost_price", "inventory_quantity"].includes(field)
        ? "number"
        : "text"
        }
    name={field}
    value={formData[field]}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
      />
    )}
          </div>
        ))}

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">BOM File</label>
          <input type="file" name="bom_file" onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
        </div>

        {/* HSN/SAC Dropdown with Add New option */}



  <div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">HSN/SAC</label>

  <select
    name="hsn_sac"
    value={formData.hsn_sac}
    onChange={(e) => {
      if (e.target.value === "ADD_NEW") {
        setHsnModalOpen(true);  // open modal
        setFormData(prev => ({ ...prev, hsn_sac: "" })); // don't select "ADD_NEW"
      } else {
        handleChange(e);
      }
    }}
    className="w-48 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select HSN-</option>
    {hsnList.map((h) => (
      <option key={h.hsn_id} value={h.hsn_code}>
        {h.hsn_code}
      </option>
    ))}
    {/* Add New option inside dropdown */}
    <option value="ADD_NEW">+ Add New</option>
  </select>
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
          tax_preference: "Taxable",
          hsn_sac: "",
          style_number: "",
          buyer_style_ref: "",
          usage_units: "",
          component_type: ""
        })} className="px-4 py-1 text-black bg-gray-300 rounded hover:bg-gray-400">
          Reset
        </button>
      </div>


      {hsnModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="p-4 bg-white rounded shadow w-80">
      <h2 className="mb-2 text-lg font-bold">Add New HSN</h2>

      <input
        type="text"
        className="w-full mb-3 form-input"
        placeholder="Enter HSN Code"
        value={newHsnInput}
        onChange={(e) => setNewHsnInput(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setHsnModalOpen(false)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!newHsnInput.trim()) return alert("Enter HSN Code");

            try {
              setHsnLoading(true);

              const res = await fetch("http://localhost:4000/hsn", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hsn_code: newHsnInput.trim() }),
              });

              if (!res.ok) {
                const err = await res.json();
                return alert(err.error || "Error saving HSN");
              }

              const newItem = await res.json();
              setHsnList((prev) => [...prev, newItem]);

              // <-- Add this line to auto-select the new HSN
              setFormData(prev => ({ ...prev, hsn_sac: newItem.hsn_code }));


              setNewHsnInput("");
              setHsnModalOpen(false);
            } catch (e) {
              alert("Error saving HSN");
            } finally {
              setHsnLoading(false);
            }
          }}
          className="px-3 py-1 text-white bg-green-600 rounded"
          disabled={hsnLoading}
        >
          {hsnLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
)}

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      
    </form>
  );
};

export default ItemForm