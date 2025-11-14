

// ////


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const DailyProductionReportList = ({ onEdit }) => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/dpr`);
//       setReports(res.data);
//     } catch (error) {
//       console.error("Error fetching DPR records:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this DPR?")) return;
//     try {
//       await axios.delete(`${API_BASE}/dpr/${id}`);
//       fetchReports();
//     } catch (error) {
//       console.error("Error deleting DPR:", error);
//     }
//   };

//   // ✅ Updated: fetch full DPR by ID when clicking Edit
//   const handleEditClick = async (dpr) => {
//     try {
//       const res = await axios.get(`${API_BASE}/dpr/${dpr.dpr_id}`);
//       onEdit(res.data); // pass full DPR with items to the form
//     } catch (err) {
//       console.error("Error fetching DPR details:", err);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow-md">
//       <h2 className="mb-4 text-lg font-semibold text-gray-700">
//         Daily Production Reports
//       </h2>

//       <table className="w-full border border-gray-300 table-auto">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">DPR ID</th>
//             <th className="p-2 border">DPR Code</th>
//             <th className="p-2 border">Vendor PO No</th>
//             <th className="p-2 border">Buyer PO No</th>
//             <th className="p-2 border">Vendor Name</th>
//             <th className="p-2 border">Buyer Name</th>
//             <th className="p-2 border">Item Name</th>
//             <th className="p-2 border">Style No</th>
//             <th className="p-2 border">Qty</th>
//             <th className="p-2 border">Remarks</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {reports.map((r) => (
//             <tr key={r.dpr_id} className="text-center">
//               <td className="p-2 border">{r.dpr_id ?? "-"}</td>
//               <td className="p-2 border">{r.dpr_code ?? "-"}</td>
//               <td className="p-2 border">{r.vendor_po_number ?? "-"}</td>
//               <td className="p-2 border">{r.buyer_po_number ?? "-"}</td>
//               <td className="p-2 border">{r.vendor_name ?? "-"}</td>
//               <td className="p-2 border">{r.buyer_name ?? "-"}</td>
//               <td className="p-2 border">{r.item_name ?? "-"}</td>
//               <td className="p-2 border">{r.style_number ?? "-"}</td>
//               <td className="p-2 border">{r.quantity ?? 0}</td>
//               <td className="p-2 border">{r.remarks ?? "-"}</td>
//               <td className="p-2 space-x-2 border">
//                 <button
//                   onClick={() => handleEditClick(r)} // ✅ updated
//                   className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(r.dpr_id)}
//                   className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {reports.length === 0 && (
//             <tr>
//               <td colSpan="11" className="p-4 text-center text-gray-500 border">
//                 No DPR records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DailyProductionReportList;

/////


import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const DailyProductionReportList = ({ onEdit, onDelete }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE}/dpr`);
      setReports(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching DPR records:", err);
      setError(err?.response?.data?.error || "Failed to fetch DPR records");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleEditClick = async (dpr) => {
    try {
      const res = await axios.get(`${API_BASE}/dpr/${dpr.dpr_id}`);
      if (onEdit) onEdit(res.data);
    } catch (err) {
      console.error("Error fetching DPR details:", err);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this DPR?")) return;
    try {
      await axios.delete(`${API_BASE}/dpr/${id}`);
      if (onDelete) onDelete();
      fetchReports();
    } catch (err) {
      console.error("Error deleting DPR record:", err);
      setError(err?.response?.data?.error || "Failed to delete DPR record");
    }
  };

  if (loading) return <p className="p-6">Loading DPR records...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          Daily Production Reports
        </h3>

        {reports.length === 0 ? (
          <p className="p-6 text-gray-500">No DPR records found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">DPR Code</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">DPR ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Vendor PO No</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer PO No</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Vendor Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Buyer Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Item Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Style Number</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Remarks</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((r) => (
                <tr key={r.dpr_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.dpr_code ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.dpr_id ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.vendor_po_number ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.buyer_po_number ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.vendor_name ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.buyer_name ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.item_name ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.style_number ?? "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.quantity ?? 0}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.remarks ?? "-"}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(r)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(r.dpr_id)}
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

export default DailyProductionReportList;