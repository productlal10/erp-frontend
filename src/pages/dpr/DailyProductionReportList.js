
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const DailyProductionReportList = ({ onEdit }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dpr`);
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching DPR records:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this DPR?")) return;
    try {
      await axios.delete(`${API_BASE}/dpr/${id}`);
      fetchReports();
    } catch (error) {
      console.error("Error deleting DPR:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Daily Production Reports
      </h2>

      <table className="w-full border border-gray-300 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">DPR ID</th>
            <th className="p-2 border">DPR Code</th>
            <th className="p-2 border">Vendor PO No</th>
            <th className="p-2 border">Buyer PO No</th>
            <th className="p-2 border">Vendor Name</th>
            <th className="p-2 border">Buyer Name</th>
            <th className="p-2 border">Item Name</th>
            <th className="p-2 border">Style No</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Remarks</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r) => (
            <tr key={r.dpr_id} className="text-center">
              <td className="p-2 border">{r.dpr_id ?? "-"}</td>
              <td className="p-2 border">{r.dpr_code ?? "-"}</td>
              <td className="p-2 border">{r.vendor_po_number ?? "-"}</td>
              <td className="p-2 border">{r.buyer_po_number ?? "-"}</td>
              <td className="p-2 border">{r.vendor_name ?? "-"}</td>
              <td className="p-2 border">{r.buyer_name ?? "-"}</td>
              <td className="p-2 border">{r.item_name ?? "-"}</td>
              <td className="p-2 border">{r.style_number ?? "-"}</td>
              <td className="p-2 border">{r.quantity ?? 0}</td>
              <td className="p-2 border">{r.remarks ?? "-"}</td>
              <td className="p-2 space-x-2 border">
                <button
                  onClick={() => onEdit(r)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.dpr_id)}
                  className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {reports.length === 0 && (
            <tr>
              <td colSpan="9" className="p-4 text-center text-gray-500 border">
                No DPR records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyProductionReportList;
