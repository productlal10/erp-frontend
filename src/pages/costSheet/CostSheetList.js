
// src/CostSheetList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const CostSheetList = ({ refreshList, onEdit, onDelete }) => {
  const [costsheets, setCostsheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCostSheets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_BASE}/costsheets`);
      const data = Array.isArray(response.data) ? response.data : [];
      setCostsheets(data);
    } catch (err) {
      console.error("Error fetching cost sheets:", err);
      setError(err?.response?.data?.error || "Failed to fetch cost sheets");
      setCostsheets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostSheets();
  }, [refreshList]);

  const handleEdit = (sheet) => {
    if (onEdit) onEdit({ ...sheet });
  };

  const handleDelete = async (cost_sheet_id) => {
    if (!window.confirm("Are you sure you want to delete this cost sheet?")) return;

    try {
      await axios.delete(`${API_BASE}/costsheets/${cost_sheet_id}`);
      if (onDelete) onDelete();
      fetchCostSheets();
    } catch (err) {
      console.error("Error deleting cost sheet:", err);
      setError(err?.response?.data?.error || "Failed to delete cost sheet");
    }
  };

  if (loading) return <p className="p-6">Loading cost sheets...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          Cost Sheet List
        </h3>

        {costsheets.length === 0 ? (
          <p className="p-6 text-gray-500">No cost sheets found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Cost Sheet Code</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Cost Sheet ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Item ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Style Number</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Order Type</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Currency</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Exchange Rate</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Cost Price</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Final Price</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">GP</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total GP</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {costsheets.map((sheet) => (
                <tr key={sheet.cost_sheet_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.cost_sheet_code}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.cost_sheet_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.item_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.customer_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.style_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.order_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.buyer_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.category_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.currency_master}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.exchange_rate}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.cost_price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.final_price}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.gp}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sheet.total_gp}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(sheet)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sheet.cost_sheet_id)}
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

export default CostSheetList;
