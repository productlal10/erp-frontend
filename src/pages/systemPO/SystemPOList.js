
// src/SystemPOList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const SystemPOList = ({ refreshList, onEdit, onDelete }) => {
  const [systemPOs, setSystemPOs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch System POs with line items
  const fetchSystemPOs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_BASE}/systempos`);
      const data = Array.isArray(response.data) ? response.data : [];

      const mappedPOs = data.map((po) => ({
        system_po_id: po.system_po_id,
        po_number: po.po_number,
        buyer_name: po.buyer_name,
        customer_id: po.customer_id,
        customer_code: po.customer_code,
        buyer_order_date: po.buyer_order_date?.split("T")[0],
        expected_delivery_date: po.expected_delivery_date?.split("T")[0],
        department: po.department,
        merchandiser: po.merchandiser,
        type_of_buyer_po: po.type_of_buyer_po,
        total_amount: po.total_amount,
        discount_amount: po.discount_amount,
        sub_total_amount: po.sub_total_amount,
        gst_amount: po.gst_amount,
        shipping_cost: po.shipping_cost,
        billing_address: po.billing_address,
        shipping_address: po.shipping_address,
        items: Array.isArray(po.items) && po.items.length > 0 ? po.items.map(item => ({
          ...item,
          cost_sheet_code: item.cost_sheet_code || "", // for dropdown display
        })) : [
          {
            item_id: "",
            item_name: "",
            item_description: "",
            style_number: "",
            cost_sheet_id: "",
            cost_sheet_code: "",
            sku_code: "",
            units_of_measure: "",
            rate: "",
            quantity: "",
            apply_taxes: "",
            gst_treatment: "",
            amount: "",
            remarks: "",
          }
        ],
      }));

      setSystemPOs(mappedPOs);
    } catch (err) {
      console.error("Error fetching System POs:", err);
      setError(err?.response?.data?.error || "Failed to fetch System POs");
      setSystemPOs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemPOs();
  }, [refreshList]);

  // Send the selected PO to the form for pre-fill
  const handleEdit = (po) => {
    if (onEdit) onEdit({ ...po, isUpdate: true });
  };

  const handleDelete = async (system_po_id) => {
    if (!window.confirm("Are you sure you want to delete this System PO?")) return;

    try {
      await axios.delete(`${API_BASE}/systempos/${system_po_id}`);
      if (onDelete) onDelete();
      fetchSystemPOs();
    } catch (err) {
      console.error("Error deleting System PO:", err);
      setError(err?.response?.data?.error || "Failed to delete System PO");
    }
  };

  // Handle Create TNA
  // const handleCreateTNA = async (system_po_id) => {
  //   try {
  //     const response = await axios.post(`${API_BASE}/systempos/${system_po_id}/generate-tna`);
  //     alert(response.data.message || "TNA records created successfully!");
  //   } catch (err) {
  //     console.error("Error creating TNA:", err);
  //     alert(err?.response?.data?.error || "Failed to create TNA");
  //   }
  // };

  const handleCreateTNA = async (system_po_id) => {
  try {
    const response = await axios.post(`${API_BASE}/tna/systempos/${system_po_id}/generate-tna`);
    alert(response.data.message || "TNA records created successfully!");
  } catch (err) {
    console.error("Error creating TNA:", err);
    alert(err?.response?.data?.error || "Failed to create TNA");
  }
};


  if (loading) return <p className="p-6">Loading System POs...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          System PO List
        </h3>

        {systemPOs.length === 0 ? (
          <p className="p-6 text-gray-500">No System POs found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">PO Number</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Merchandiser</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer Order Date</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Expected Delivery</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type of Buyer PO</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total Amount</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {systemPOs.map((po) => (
                <tr key={po.system_po_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.po_number}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.buyer_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.merchandiser}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.department}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.buyer_order_date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.expected_delivery_date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.type_of_buyer_po}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{po.total_amount}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(po)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(po.system_po_id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleCreateTNA(po.system_po_id)}
                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Create TNA
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

export default SystemPOList;
