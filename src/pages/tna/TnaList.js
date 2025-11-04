import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const TnaList = ({ refreshList, onEdit, onDelete }) => {
  const [tnaList, setTnaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTnas = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_BASE}/tna`);
      setTnaList(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching TNA records:", err);
      setError(err?.response?.data?.error || "Failed to fetch TNA records");
      setTnaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTnas();
  }, [refreshList]);

  // const handleEdit = (tna) => {
  //   if (onEdit) onEdit({ ...tna });
  // };
  const handleEdit = (tna) => {
  if (onEdit) onEdit(tna); // ✅ Send exact original record
  };




  const handleDelete = async (tna_id) => {
    if (!window.confirm("Are you sure you want to delete this TNA record?")) return;

    try {
      await axios.delete(`${API_BASE}/tna/${tna_id}`);
      if (onDelete) onDelete();
      fetchTnas();
    } catch (err) {
      console.error("Error deleting TNA record:", err);
      setError(err?.response?.data?.error || "Failed to delete TNA record");
    }
  };

  if (loading) return <p className="p-6">Loading TNA records...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          TNA List
        </h3>

        {tnaList.length === 0 ? (
          <p className="p-6 text-gray-500">No TNA records found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">TNA Code</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">TNA ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer PO No</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Item Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Style Number</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tnaList.map((tna) => (
                <tr key={tna.tna_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.tna_code}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.tna_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.buyer_po_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.item_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.style_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{tna.tna_overall_status}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(tna)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tna.tna_id)}
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

export default TnaList;
