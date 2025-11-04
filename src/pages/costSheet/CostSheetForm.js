// src/CostSheetForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const emptyForm = {
  cost_sheet_id: "",
  cost_sheet_code: "",
  order_type: "",
  item_id: "",
  style_number: "",
  customer_id: "",
  buyer_name: "",
  category_name: "",
  currency_master: "",
  exchange_rate: "",
  cost_price: "",
  final_price: "",
  gp: "",
  total_gp: "",
};

const CostSheetForm = ({ editingCostSheet, onCostSheetSaved }) => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currencyOptions = ["INR", "USD", "EUR", "GBP", "JPY", "CNY"];

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE}/items`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // Fetch Customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/customers`);
        setCustomers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (editingCostSheet) {
      setFormData({
        cost_sheet_id: editingCostSheet.cost_sheet_id,
        cost_sheet_code: editingCostSheet.cost_sheet_code,
        order_type: editingCostSheet.order_type || "",
        item_id: editingCostSheet.item_id || "",
        style_number: editingCostSheet.style_number || "",
        customer_id: editingCostSheet.customer_id || "",
        buyer_name: editingCostSheet.buyer_name || "",
        category_name: editingCostSheet.category_name || "",
        currency_master: editingCostSheet.currency_master || "",
        exchange_rate: editingCostSheet.exchange_rate || "",
        cost_price: editingCostSheet.cost_price || "",
        final_price: editingCostSheet.final_price || "",
        gp: editingCostSheet.gp || "",
        total_gp: editingCostSheet.total_gp || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingCostSheet]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "style_number") {
      const selectedItem = items.find((i) => i.style_number === value);
      setFormData((prev) => ({
        ...prev,
        style_number: value,
        item_id: selectedItem?.item_id || "",
        category_name: selectedItem?.category_name || "",
      }));
    } else if (name === "buyer_name") {
      const selectedCustomer = customers.find((c) => c.display_name === value);
      setFormData((prev) => ({
        ...prev,
        buyer_name: value,
        customer_id: selectedCustomer?.customer_id || "",
      }));
    } else if (name === "currency_master") {
      setFormData((prev) => ({
        ...prev,
        currency_master: value,
        exchange_rate: value === "INR" ? "1" : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.item_id || !formData.customer_id) {
      return alert("Style Number and Buyer Name are required.");
    }

    try {
      setLoading(true);
      setError("");

      const submitData = { ...formData };
      if (formData.cost_sheet_id) {
        await axios.put(`${API_BASE}/costsheets/${formData.cost_sheet_id}`, submitData);
        alert("Cost Sheet updated successfully!");
      } else {
        delete submitData.cost_sheet_id;
        const res = await axios.post(`${API_BASE}/costsheets`, submitData);
        alert("Cost Sheet saved successfully!");
        setFormData({
          ...emptyForm,
          cost_sheet_id: res.data.cost_sheet_id,
          cost_sheet_code: res.data.cost_sheet_code || "",
        });
      }

      onCostSheetSaved();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to save cost sheet");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <h2 className="mb-8 text-2xl font-semibold">Cost Sheet</h2>

      {/* Cost Sheet ID */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet ID:</label>
        <input
          type="text"
          name="cost_sheet_id"
          value={formData.cost_sheet_id}
          readOnly
          className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
        />
      </div>

      {/* Cost Sheet Code */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet Code:</label>
        <input
          type="text"
          name="cost_sheet_code"
          value={formData.cost_sheet_code}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      {/* Order Type */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Order Type:</label>
        <select
          name="order_type"
          value={formData.order_type}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Order Type</option>
          <option value="FOB">FOB</option>
          <option value="NOT FOB">NOT FOB</option>
        </select>
      </div>

      {/* Style Number */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Style Number:</label>
        <select
          name="style_number"
          value={formData.style_number}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Style</option>
          {items.map((i) => (
            <option key={i.item_id} value={i.style_number}>
              {i.style_number}
            </option>
          ))}
        </select>
      </div>

      {/* Buyer Name */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Buyer Name:</label>
        <select
          name="buyer_name"
          value={formData.buyer_name}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Buyer</option>
          {customers.map((c) => (
            <option key={c.customer_id} value={c.display_name}>
              {c.display_name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Name */}
      <div className="flex items-center mb-8">
        <label className="w-40 text-sm font-medium text-gray-700">Category Name:</label>
        <input
          type="text"
          name="category_name"
          value={formData.category_name}
          readOnly
          className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
        />
      </div>

      {/* Cost Section */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Currency:</label>
        <select
          name="currency_master"
          value={formData.currency_master}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Currency</option>
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Exchange Rate:</label>
        <input
          type="number"
          step="0.01"
          name="exchange_rate"
          value={formData.exchange_rate}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Price:</label>
        <input
          type="number"
          step="0.01"
          name="cost_price"
          value={formData.cost_price}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Final Price:</label>
        <input
          type="number"
          step="0.01"
          name="final_price"
          value={formData.final_price}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">GP:</label>
        <input
          type="number"
          step="0.01"
          name="gp"
          value={formData.gp}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-8">
        <label className="w-40 text-sm font-medium text-gray-700">Total GP:</label>
        <input
          type="number"
          step="0.01"
          name="total_gp"
          value={formData.total_gp}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {editingCostSheet && editingCostSheet.cost_sheet_id ? "Update" : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default CostSheetForm;
