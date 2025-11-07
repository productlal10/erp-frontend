
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // axios.defaults.withCredentials = true;
// // const API_BASE = "http://localhost:4000";

// // const emptyForm = {
// //   vendor_line_item_id: "",
// //   quantity: 0,
// //   vendor_po_number: "",
// //   colour: "",
// //   buyer_po_number: "",
// //   style_number: "",
// //   item_name: "",
// //   sku_code: "",
// //   vendor_name: "",
// //   buyer_name: "",
// //   vendor_code: "",
// //   buyer_code: "",
// //   remarks: "",
// //   dpr_code: "",
// //   reported_on: "",
// // };

// // const DailyProductionReportForm = ({ report, onSaved, onCancel }) => {
// //   const [formData, setFormData] = useState(emptyForm);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (report) {
// //       setFormData({
// //         vendor_line_item_id: report.vendor_line_item_id ?? "",
// //         quantity: report.quantity ?? 0,
// //         vendor_po_number: report.vendor_po_number ?? "",
// //         colour: report.colour ?? "",
// //         buyer_po_number: report.buyer_po_number ?? "",
// //         style_number: report.style_number ?? "",
// //         item_name: report.item_name ?? "",
// //         sku_code: report.sku_code ?? "",
// //         vendor_name: report.vendor_name ?? "",
// //         buyer_name: report.buyer_name ?? "",
// //         vendor_code: report.vendor_code ?? "",
// //         buyer_code: report.buyer_code ?? "",
// //         remarks: report.remarks ?? "",
// //         dpr_code: report.dpr_code ?? "",
// //         reported_on: report.reported_on
// //           ? new Date(report.reported_on).toISOString().substring(0, 10)
// //           : "",
// //       });
// //     } else {
// //       setFormData(emptyForm);
// //     }
// //   }, [report]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!report) return;

// //     try {
// //       setLoading(true);
// //       setError("");
// //       await axios.put(`${API_BASE}/dailyproductionreport/${report.dpr_id}`, formData);
// //       alert("DPR updated successfully!");
// //       if (onSaved) onSaved();
// //     } catch (err) {
// //       console.error(err);
// //       setError(err?.response?.data?.error || "Failed to update DPR");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setFormData(emptyForm);
// //     setError("");
// //   };

// //   const inputClass = "w-full px-2 py-2 border border-gray-400 rounded";

// //   return (
// //     <form onSubmit={handleSubmit} className="w-full max-w-3xl p-4 mx-auto bg-white rounded shadow">
// //       <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <label className="block mb-1 font-medium">Vendor Line Item ID</label>
// //           <input
// //             type="text"
// //             name="vendor_line_item_id"
// //             value={formData.vendor_line_item_id}
// //             onChange={handleChange}
// //             className={`${inputClass} bg-gray-100`}
// //             readOnly
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Quantity</label>
// //           <input
// //             type="number"
// //             name="quantity"
// //             value={formData.quantity}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Vendor PO Number</label>
// //           <input
// //             type="text"
// //             name="vendor_po_number"
// //             value={formData.vendor_po_number}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Colour</label>
// //           <input
// //             type="text"
// //             name="colour"
// //             value={formData.colour}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Buyer PO Number</label>
// //           <input
// //             type="text"
// //             name="buyer_po_number"
// //             value={formData.buyer_po_number}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Style Number</label>
// //           <input
// //             type="text"
// //             name="style_number"
// //             value={formData.style_number}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Item Name</label>
// //           <input
// //             type="text"
// //             name="item_name"
// //             value={formData.item_name}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">SKU Code</label>
// //           <input
// //             type="text"
// //             name="sku_code"
// //             value={formData.sku_code}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Vendor Name</label>
// //           <input
// //             type="text"
// //             name="vendor_name"
// //             value={formData.vendor_name}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Buyer Name</label>
// //           <input
// //             type="text"
// //             name="buyer_name"
// //             value={formData.buyer_name}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Vendor Code</label>
// //           <input
// //             type="text"
// //             name="vendor_code"
// //             value={formData.vendor_code}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Buyer Code</label>
// //           <input
// //             type="text"
// //             name="buyer_code"
// //             value={formData.buyer_code}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>

// //         <div className="col-span-2">
// //           <label className="block mb-1 font-medium">Remarks</label>
// //           <textarea
// //             name="remarks"
// //             value={formData.remarks}
// //             onChange={handleChange}
// //             className={`${inputClass} h-20`}
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">DPR Code</label>
// //           <input
// //             type="text"
// //             name="dpr_code"
// //             value={formData.dpr_code}
// //             onChange={handleChange}
// //             className={`${inputClass} bg-gray-100`}
// //             readOnly
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Reported On</label>
// //           <input
// //             type="date"
// //             name="reported_on"
// //             value={formData.reported_on}
// //             onChange={handleChange}
// //             className={inputClass}
// //           />
// //         </div>
// //       </div>

// //       {error && <p className="mt-4 text-red-500">{error}</p>}

// //       <div className="flex mt-6 space-x-4">
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
// //         >
// //           Update
// //         </button>
// //         {onCancel && (
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
// //           >
// //             Cancel
// //           </button>
// //         )}
// //       </div>
// //     </form>
// //   );
// // };

// // export default DailyProductionReportForm;

// ////

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const emptyForm = {
//   vendor_line_item_id: "",
//   quantity: 0,
//   vendor_po_number: "",
//   colour: "",
//   buyer_po_number: "",
//   style_number: "",
//   item_name: "",
//   sku_code: "",
//   vendor_name: "",
//   buyer_name: "",
//   vendor_code: "",
//   buyer_code: "",
//   remarks: "",
//   dpr_code: "",
//   reported_on: "",
//   units_produced: 0,
//   cutting:0,
//   stitching:0,
//   finishing:0,
//   packaging:0,
// };

// const DailyProductionReportForm = ({ report, onSaved, onCancel }) => {
//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (report) {
//       setFormData({
//         vendor_line_item_id: report.vendor_line_item_id ?? "",
//         quantity: report.quantity ?? 0,
//         vendor_po_number: report.vendor_po_number ?? "",
//         colour: report.colour ?? "",
//         buyer_po_number: report.buyer_po_number ?? "",
//         style_number: report.style_number ?? "",
//         item_name: report.item_name ?? "",
//         sku_code: report.sku_code ?? "",
//         vendor_name: report.vendor_name ?? "",
//         buyer_name: report.buyer_name ?? "",
//         vendor_code: report.vendor_code ?? "",
//         buyer_code: report.buyer_code ?? "",
//         remarks: report.remarks ?? "",
//         dpr_code: report.dpr_code ?? "",
//         units_produced: report.units_produced ?? 0,
//         cutting: report.cutting ?? 0,
//         stitching: report.stitching ?? 0,
//         finishing: report.finishing ?? 0,
//         packaging: report.packaging ?? 0,
//         reported_on: report.reported_on
//           ? new Date(report.reported_on).toISOString().substring(0, 10)
//           : "",
//       });
//     } else {
//       setFormData(emptyForm);
//     }
//   }, [report]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!report) return;

//     try {
//       setLoading(true);
//       setError("");
//       await axios.put(`${API_BASE}/dpr/${report.dpr_id}`, formData);
//       alert("DPR updated successfully!");
//       if (onSaved) onSaved();
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.error || "Failed to update DPR");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // The handleReset function was here. It has been removed.

//   const inputClass = "w-full px-2 py-2 border border-gray-400 rounded";

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-3xl p-4 mx-auto bg-white rounded shadow">
//       <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-1 font-medium">Vendor Line Item ID</label>
//           <input
//             type="text"
//             name="vendor_line_item_id"
//             value={formData.vendor_line_item_id}
//             onChange={handleChange}
//             className={`${inputClass} bg-gray-100`}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor PO Number</label>
//           <input
//             type="text"
//             name="vendor_po_number"
//             value={formData.vendor_po_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Colour</label>
//           <input
//             type="text"
//             name="colour"
//             value={formData.colour}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer PO Number</label>
//           <input
//             type="text"
//             name="buyer_po_number"
//             value={formData.buyer_po_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Style Number</label>
//           <input
//             type="text"
//             name="style_number"
//             value={formData.style_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Item Name</label>
//           <input
//             type="text"
//             name="item_name"
//             value={formData.item_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">SKU Code</label>
//           <input
//             type="text"
//             name="sku_code"
//             value={formData.sku_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor Name</label>
//           <input
//             type="text"
//             name="vendor_name"
//             value={formData.vendor_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer Name</label>
//           <input
//             type="text"
//             name="buyer_name"
//             value={formData.buyer_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor Code</label>
//           <input
//             type="text"
//             name="vendor_code"
//             value={formData.vendor_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer Code</label>
//           <input
//             type="text"
//             name="buyer_code"
//             value={formData.buyer_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="block mb-1 font-medium">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//             className={`${inputClass} h-20`}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">DPR Code</label>
//           <input
//             type="text"
//             name="dpr_code"
//             value={formData.dpr_code}
//             onChange={handleChange}
//             className={`${inputClass} bg-gray-100`}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Reported On</label>
//           <input
//             type="date"
//             name="reported_on"
//             value={formData.reported_on}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Units Produced</label>
//           <input
//             type="number"
//             name="units_produced"
//             value={formData.units_produced}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Cutting</label>
//           <input
//             type="number"
//             name="cutting"
//             value={formData.cutting}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
        
        
//         <div>
//           <label className="block mb-1 font-medium">Stitching</label>
//           <input
//             type="number"
//             name="stitching"
//             value={formData.stitching}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
        
//         <div>
//           <label className="block mb-1 font-medium">Finishing</label>
//           <input
//             type="number"
//             name="finishing"
//             value={formData.finishing}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
        
//         <div>
//           <label className="block mb-1 font-medium">Packaging</label>
//           <input
//             type="number"
//             name="packaging"
//             value={formData.packaging}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//       </div>

//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       <div className="flex mt-6 space-x-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default DailyProductionReportForm;
/////////////


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const emptyForm = {
//   vendor_line_item_id: "",
//   quantity: 0,
//   vendor_po_number: "",
//   colour: "",
//   buyer_po_number: "",
//   style_number: "",
//   item_name: "",
//   sku_code: "",
//   vendor_name: "",
//   buyer_name: "",
//   vendor_code: "",
//   buyer_code: "",
//   remarks: "",
//   dpr_code: "",
//   reported_on: "",
// };

// const DailyProductionReportForm = ({ report, onSaved, onCancel }) => {
//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (report) {
//       setFormData({
//         vendor_line_item_id: report.vendor_line_item_id ?? "",
//         quantity: report.quantity ?? 0,
//         vendor_po_number: report.vendor_po_number ?? "",
//         colour: report.colour ?? "",
//         buyer_po_number: report.buyer_po_number ?? "",
//         style_number: report.style_number ?? "",
//         item_name: report.item_name ?? "",
//         sku_code: report.sku_code ?? "",
//         vendor_name: report.vendor_name ?? "",
//         buyer_name: report.buyer_name ?? "",
//         vendor_code: report.vendor_code ?? "",
//         buyer_code: report.buyer_code ?? "",
//         remarks: report.remarks ?? "",
//         dpr_code: report.dpr_code ?? "",
//         reported_on: report.reported_on
//           ? new Date(report.reported_on).toISOString().substring(0, 10)
//           : "",
//       });
//     } else {
//       setFormData(emptyForm);
//     }
//   }, [report]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!report) return;

//     try {
//       setLoading(true);
//       setError("");
//       await axios.put(`${API_BASE}/dailyproductionreport/${report.dpr_id}`, formData);
//       alert("DPR updated successfully!");
//       if (onSaved) onSaved();
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.error || "Failed to update DPR");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData(emptyForm);
//     setError("");
//   };

//   const inputClass = "w-full px-2 py-2 border border-gray-400 rounded";

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-3xl p-4 mx-auto bg-white rounded shadow">
//       <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-1 font-medium">Vendor Line Item ID</label>
//           <input
//             type="text"
//             name="vendor_line_item_id"
//             value={formData.vendor_line_item_id}
//             onChange={handleChange}
//             className={`${inputClass} bg-gray-100`}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor PO Number</label>
//           <input
//             type="text"
//             name="vendor_po_number"
//             value={formData.vendor_po_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Colour</label>
//           <input
//             type="text"
//             name="colour"
//             value={formData.colour}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer PO Number</label>
//           <input
//             type="text"
//             name="buyer_po_number"
//             value={formData.buyer_po_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Style Number</label>
//           <input
//             type="text"
//             name="style_number"
//             value={formData.style_number}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Item Name</label>
//           <input
//             type="text"
//             name="item_name"
//             value={formData.item_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">SKU Code</label>
//           <input
//             type="text"
//             name="sku_code"
//             value={formData.sku_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor Name</label>
//           <input
//             type="text"
//             name="vendor_name"
//             value={formData.vendor_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer Name</label>
//           <input
//             type="text"
//             name="buyer_name"
//             value={formData.buyer_name}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Vendor Code</label>
//           <input
//             type="text"
//             name="vendor_code"
//             value={formData.vendor_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Buyer Code</label>
//           <input
//             type="text"
//             name="buyer_code"
//             value={formData.buyer_code}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>

//         <div className="col-span-2">
//           <label className="block mb-1 font-medium">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//             className={`${inputClass} h-20`}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">DPR Code</label>
//           <input
//             type="text"
//             name="dpr_code"
//             value={formData.dpr_code}
//             onChange={handleChange}
//             className={`${inputClass} bg-gray-100`}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Reported On</label>
//           <input
//             type="date"
//             name="reported_on"
//             value={formData.reported_on}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
//       </div>

//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       <div className="flex mt-6 space-x-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default DailyProductionReportForm;

////

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const emptyForm = {
//   vendor_line_item_id: "",
//   dpr_code: "",
//   quantity: 0,
//   vendor_po_number: "",
//   colour: "",
//   buyer_po_number: "",
//   style_number: "",
//   item_name: "",
//   sku_code: "",
//   vendor_name: "",
//   buyer_name: "",
//   vendor_code: "",
//   buyer_code: "",
//   remarks: "",
//   dpr_code: "",
//   reported_on: "",
//   items: [
//     {
//       dpr_code: "",
//       dpr_date: "",
//       style_number: "",
//       vendor_po_number: "",
//       units_produced: "",
//       cutting: "",
//       stitching: "",
//       finishing: "",
//       packaging: "",
//       defects: "",
//     },
//   ],
//   units_produced: 0,
//   cutting: 0,
//   stitching: 0,
//   finishing: 0,
//   packaging: 0,
// };

// const DailyProductionReportForm = ({ report, onSaved }) => {
//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (report) {
//       setFormData((prev) => ({
//         ...prev,
//         vendor_line_item_id: report.vendor_line_item_id ?? "",
//         quantity: report.quantity ?? 0,
//         vendor_po_number: report.vendor_po_number ?? "",
//         colour: report.colour ?? "",
//         buyer_po_number: report.buyer_po_number ?? "",
//         style_number: report.style_number ?? "",
//         item_name: report.item_name ?? "",
//         sku_code: report.sku_code ?? "",
//         vendor_name: report.vendor_name ?? "",
//         buyer_name: report.buyer_name ?? "",
//         vendor_code: report.vendor_code ?? "",
//         buyer_code: report.buyer_code ?? "",
//         remarks: report.remarks ?? "",
//         dpr_code: report.dpr_code ?? "",
//         units_produced: report.units_produced ?? 0,
//         cutting: report.cutting ?? 0,
//         stitching: report.stitching ?? 0,
//         finishing: report.finishing ?? 0,
//         packaging: report.packaging ?? 0,
//         reported_on: report.reported_on
//           ? new Date(report.reported_on).toISOString().substring(0, 10)
//           : "",
//       }));
//     } else {
//       setFormData(emptyForm);
//     }
//   }, [report]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const updated = [...formData.items];
//     updated[index][name] = value;
//     setFormData((prev) => ({ ...prev, items: updated }));
//   };

//   // ✅ Add new row with auto-filled values
//   const addRow = () => {
//     const newRow = {
//       dpr_code: report?.dpr_code || "",
//       dpr_date: "",
//       style_number: formData.style_number || "",
//       vendor_po_number: formData.vendor_po_number || "",
//       units_produced: "",
//       cutting: "",
//       stitching: "",
//       finishing: "",
//       packaging: "",
//       defects: "",
//     };

//     setFormData((prev) => ({ ...prev, items: [...prev.items, newRow] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!report) return;

//     try {
//       setLoading(true);
//       setError("");
//       await axios.put(`${API_BASE}/dpr/${report.dpr_id}`, formData);
//       alert("✅ DPR updated successfully!");
//       if (onSaved) onSaved();
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to update DPR");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = "w-full px-2 py-2 border border-gray-400 rounded";

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-4xl p-5 mx-auto bg-white rounded shadow">
//       <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

//       {/* FORM FIELDS */}
//       <div className="grid grid-cols-2 gap-4">

//         {[
//           ["Vendor Line Item ID", "vendor_line_item_id", true],
//           ["Quantity", "quantity"],
//           ["Vendor PO Number", "vendor_po_number"],
//           ["Colour", "colour"],
//           ["Buyer PO Number", "buyer_po_number"],
//           ["Style Number", "style_number"],
//           ["Item Name", "item_name"],
//           ["SKU Code", "sku_code"],
//           ["Vendor Name", "vendor_name"],
//           ["Buyer Name", "buyer_name"],
//           ["Vendor Code", "vendor_code"],
//           ["Buyer Code", "buyer_code"],
//         ].map(([label, field, readonly]) => (
//           <div key={field}>
//             <label className="block mb-1 font-medium">{label}</label>
//             <input
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               className={`${inputClass} ${readonly ? "bg-gray-100" : ""}`}
//               readOnly={readonly}
//             />
//           </div>
//         ))}

//         <div className="col-span-2">
//           <label className="block mb-1 font-medium">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//             className={`${inputClass} h-20`}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">DPR Code</label>
//           <input
//             type="text"
//             name="dpr_code"
//             value={formData.dpr_code}
//             readOnly
//             className={`${inputClass} bg-gray-100`}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Reported On</label>
//           <input
//             type="date"
//             name="reported_on"
//             value={formData.reported_on}
//             onChange={handleChange}
//             className={inputClass}
//           />
//         </div>
//       </div>

//       {/* ================= ITEM DETAILS TABLE ================= */}
//       <h3 className="mt-8 mb-3 text-lg font-semibold">Item Details</h3>

//       <button
//         type="button"
//         onClick={addRow}
//         className="px-3 py-1 mb-2 text-white bg-blue-600 rounded"
//       >
//         + Add Row
//       </button>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               {["DPR Code", "DPR Date", "Style Number", "Vendor PO No.", "Units Produced", "Cutting", "Stitching", "Finishing", "Packaging", "Defects"].map((h) => (
//                 <th key={h} className="px-2 py-2 border">{h}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {formData.items.map((item, index) => (
//               <tr key={index}>
//                 {["dpr_code", "dpr_date", "style_number", "vendor_po_number", "units_produced", "cutting", "stitching", "finishing", "packaging", "defects"].map((field, i) => (
//                   <td key={i} className="px-2 py-1 border">
//                     <input
//                       type={field === "dpr_date" ? "date" : "text"}
//                       name={field}
//                       value={item[field]}
//                       onChange={(e) => handleItemChange(index, e)}
//                       className={`${inputClass} ${["dpr_id","style_number","vendor_po_number"].includes(field) ? "bg-gray-100" : ""}`}
//                       readOnly={["dpr_id","style_number","vendor_po_number"].includes(field)}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* SUBMIT BUTTON */}
//       <button type="submit" className="px-5 py-2 mt-6 text-white bg-green-600 rounded">
//         {loading ? "Saving..." : "Save Changes"}
//       </button>

//       {error && <p className="mt-3 text-red-600">{error}</p>}
//     </form>
//   );
// };

// export default DailyProductionReportForm;

/////
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const emptyForm = {
  vendor_line_item_id: "",
  dpr_code: "",
  quantity: 0,
  vendor_po_number: "",
  colour: "",
  buyer_po_number: "",
  style_number: "",
  item_name: "",
  sku_code: "",
  vendor_name: "",
  buyer_name: "",
  vendor_code: "",
  buyer_code: "",
  remarks: "",
  reported_on: "",
  items: [],
  units_produced: 0,
  cutting: 0,
  stitching: 0,
  finishing: 0,
  packaging: 0,
};

const DailyProductionReportForm = ({ report, onSaved }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (report) {
      setFormData((prev) => ({
        ...prev,
        vendor_line_item_id: report.vendor_line_item_id ?? "",
        quantity: report.quantity ?? 0,
        vendor_po_number: report.vendor_po_number ?? "",
        colour: report.colour ?? "",
        buyer_po_number: report.buyer_po_number ?? "",
        style_number: report.style_number ?? "",
        item_name: report.item_name ?? "",
        sku_code: report.sku_code ?? "",
        vendor_name: report.vendor_name ?? "",
        buyer_name: report.buyer_name ?? "",
        vendor_code: report.vendor_code ?? "",
        buyer_code: report.buyer_code ?? "",
        remarks: report.remarks ?? "",
        dpr_code: report.dpr_code ?? "",
        units_produced: report.units_produced ?? 0,
        cutting: report.cutting ?? 0,
        stitching: report.stitching ?? 0,
        finishing: report.finishing ?? 0,
        packaging: report.packaging ?? 0,
        reported_on: report.reported_on
          ? new Date(report.reported_on).toISOString().substring(0, 10)
          : "",
        items: report.items?.length ? report.items : [],
      }));
    } else {
      setFormData(emptyForm);
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.items];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const addRow = () => {
    const newRow = {
      dpr_code: formData.dpr_code,
      dpr_date: "",
      style_number: formData.style_number,
      vendor_po_number: formData.vendor_po_number,
      units_produced: "",
      cutting: "",
      stitching: "",
      finishing: "",
      packaging: "",
      defects: "",
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newRow] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await axios.put(`${API_BASE}/dpr/${report.dpr_id}`, formData);
      alert("✅ DPR updated successfully!");
      if (onSaved) onSaved();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to update DPR");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-400 rounded text-base";

  return (
    <form onSubmit={handleSubmit} className="w-full p-8 mx-auto bg-white rounded shadow max-w-7xl">
      <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

      <div className="grid grid-cols-2 gap-5">
        {[
          ["Vendor Line Item ID", "vendor_line_item_id", true],
          ["Quantity", "quantity"],
          ["Vendor PO Number", "vendor_po_number"],
          ["Colour", "colour"],
          ["Buyer PO Number", "buyer_po_number"],
          ["Style Number", "style_number"],
          ["Item Name", "item_name"],
          ["SKU Code", "sku_code"],
          ["Vendor Name", "vendor_name"],
          ["Buyer Name", "buyer_name"],
          ["Vendor Code", "vendor_code"],
          ["Buyer Code", "buyer_code"],
        ].map(([label, field, readonly]) => (
          <div key={field}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`${inputClass} ${readonly ? "bg-gray-100" : ""}`}
              readOnly={readonly}
            />
          </div>
        ))}
                {[
          ["Units Produced", "units_produced"],
          ["Cutting", "cutting"],
          ["Stitching", "stitching"],
          ["Finishing", "finishing"],
          ["Packaging", "packaging"],
        ].map(([label, field]) => (
          <div key={field}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}


        <div>
          <label className="block mb-1 font-medium">DPR Code</label>
          <input
            type="text"
            value={formData.dpr_code}
            readOnly
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reported On</label>
          <input
            type="date"
            name="reported_on"
            value={formData.reported_on}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <h3 className="mt-10 mb-3 text-lg font-semibold">DPR</h3>

      <button
        type="button"
        onClick={addRow}
        className="px-4 py-2 mb-3 text-white bg-blue-600 rounded"
      >
        + Add Row
      </button>

      <div className="w-full overflow-x-auto">
        {/* <table className="w-full text-base border border-gray-300 table-fixed"> */}
          <table className="w-full text-base border border-gray-300">

          <thead className="bg-gray-100">
            <tr>
              {[
                "DPR Code",
                "DPR Date",
                "Style Number",
                "Vendor PO No.",
                "Units Produced",
                "Cutting",
                "Stitching",
                "Finishing",
                "Packaging",
                "Defects",
              ].map((h) => (
                <th key={h} className="px-3 py-2 border min-w-[280px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                {[
                  ["dpr_code", "text"],
                  ["dpr_date", "date"],
                  ["style_number", "text"],
                  ["vendor_po_number", "text"],
                  ["units_produced", "number"],
                  ["cutting", "number"],
                  ["stitching", "number"],
                  ["finishing", "number"],
                  ["packaging", "number"],
                  ["defects", "number"],
                ].map(([field, type], i) => (
                  <td key={i} className="px-3 py-2 border min-w-[280px]">
                    <input
                      type={type}
                      name={field}
                      value={item[field]}
                      onChange={(e) => handleItemChange(index, e)}
                      className={inputClass}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <label className="block mb-1 font-medium">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className={`${inputClass} h-28`}
        />
      </div>

      <button type="submit" className="px-6 py-2 mt-6 text-white bg-green-600 rounded">
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
};

export default DailyProductionReportForm;
