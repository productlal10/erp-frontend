
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

import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const emptyForm = {
  vendor_line_item_id: "",
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
  dpr_code: "",
  reported_on: "",
};

const DailyProductionReportForm = ({ report, onSaved, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (report) {
      setFormData({
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
        reported_on: report.reported_on
          ? new Date(report.reported_on).toISOString().substring(0, 10)
          : "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!report) return;

    try {
      setLoading(true);
      setError("");
      await axios.put(`${API_BASE}/dailyproductionreport/${report.dpr_id}`, formData);
      alert("DPR updated successfully!");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to update DPR");
    } finally {
      setLoading(false);
    }
  };

  // The handleReset function was here. It has been removed.

  const inputClass = "w-full px-2 py-2 border border-gray-400 rounded";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl p-4 mx-auto bg-white rounded shadow">
      <h2 className="mb-6 text-2xl font-semibold">Daily Production Report</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Vendor Line Item ID</label>
          <input
            type="text"
            name="vendor_line_item_id"
            value={formData.vendor_line_item_id}
            onChange={handleChange}
            className={`${inputClass} bg-gray-100`}
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Vendor PO Number</label>
          <input
            type="text"
            name="vendor_po_number"
            value={formData.vendor_po_number}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Colour</label>
          <input
            type="text"
            name="colour"
            value={formData.colour}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buyer PO Number</label>
          <input
            type="text"
            name="buyer_po_number"
            value={formData.buyer_po_number}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Style Number</label>
          <input
            type="text"
            name="style_number"
            value={formData.style_number}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">SKU Code</label>
          <input
            type="text"
            name="sku_code"
            value={formData.sku_code}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Vendor Name</label>
          <input
            type="text"
            name="vendor_name"
            value={formData.vendor_name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buyer Name</label>
          <input
            type="text"
            name="buyer_name"
            value={formData.buyer_name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Vendor Code</label>
          <input
            type="text"
            name="vendor_code"
            value={formData.vendor_code}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buyer Code</label>
          <input
            type="text"
            name="buyer_code"
            value={formData.buyer_code}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className={`${inputClass} h-20`}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">DPR Code</label>
          <input
            type="text"
            name="dpr_code"
            value={formData.dpr_code}
            onChange={handleChange}
            className={`${inputClass} bg-gray-100`}
            readOnly
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

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="flex mt-6 space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default DailyProductionReportForm;