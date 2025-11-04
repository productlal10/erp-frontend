import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorPOList = ({ onEdit }) => {
  const [vendorPOList, setVendorPOList] = useState([]);
  const API_BASE = "http://localhost:4000";

  useEffect(() => {
    fetchVendorPOs();
  }, []);

  const fetchVendorPOs = async () => {
    try {
      const response = await axios.get(`${API_BASE}/vendorpos`);
      setVendorPOList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch Vendor POs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Vendor PO?")) return;
    try {
      await axios.delete(`${API_BASE}/vendorpos/${id}`);
      fetchVendorPOs();
    } catch (error) {
      console.error("Failed to delete Vendor PO:", error);
      alert("Failed to delete Vendor PO.");
    }
  };

  return (
    <div className="p-4 overflow-auto bg-white rounded shadow">
      <h2 className="mb-4 text-xl font-bold">Vendor PO List</h2>
      <table className="min-w-full border border-collapse border-gray-200 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">PO No</th>
            <th className="px-4 py-2 border">Vendor Name</th>
            <th className="px-4 py-2 border">Vendor Company</th>
            <th className="px-4 py-2 border">Buyer PO No</th>
            <th className="px-4 py-2 border">Buyer Company</th>
            <th className="px-4 py-2 border">PO Date</th>
            <th className="px-4 py-2 border">Expected Delivery</th>
            <th className="px-4 py-2 border">Total Amount</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendorPOList.length > 0 ? (
            vendorPOList.map((po) => (
              <tr key={po.vendor_po_id}>
                <td className="px-4 py-2 border">{po.vendor_po_no}</td>
                <td className="px-4 py-2 border">{po.vendor_name}</td>
                <td className="px-4 py-2 border">{po.vendor_company_name}</td>
                <td className="px-4 py-2 border">{po.buyer_po_number}</td>
                <td className="px-4 py-2 border">{po.buyer_company_name}</td>
                <td className="px-4 py-2 border">{po.purchase_order_date}</td>
                <td className="px-4 py-2 border">{po.expected_delivery_date}</td>
                <td className="px-4 py-2 border">{po.total_amount}</td>
                <td className="px-4 py-2 border">{po.status || "-"}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                    onClick={() => onEdit(po)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded"
                    onClick={() => handleDelete(po.vendor_po_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="px-4 py-2 text-center">
                No Vendor PO records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorPOList;
