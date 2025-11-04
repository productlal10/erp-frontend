// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const emptyForm = {
//   tna_id: "",
//   tna_code: "",
//   buyer_po_number: "",
//   item_name: "",
//   style_number: "",
//   sku_code: "",
//   buyer_order_date: "",
//   tna_overall_status: "",
//   remarks: "",
// };

// const TnaForm = ({ editingTna, onTnaSaved }) => {
//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Populate form if editing
//   useEffect(() => {
//     if (editingTna) {
//       setFormData({
//         tna_id: editingTna.tna_id || "",
//         tna_code: editingTna.tna_code || "",
//         buyer_po_number: editingTna.buyer_po_number || "",
//         item_name: editingTna.item_name || "",
//         style_number: editingTna.style_number || "",
//         sku_code: editingTna.sku_code || "",
//         buyer_order_date: editingTna.buyer_order_date || "",
//         tna_overall_status: editingTna.tna_overall_status || "",
//         remarks: editingTna.remarks || "",
//       });
//     } else {
//       setFormData(emptyForm);
//     }
//   }, [editingTna]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError("");

//       const submitData = { ...formData };
//       if (formData.tna_id) {
//         await axios.put(`${API_BASE}/tna/${formData.tna_id}`, submitData);
//         alert("TNA updated successfully!");
//       } else {
//         const res = await axios.post(`${API_BASE}/tna`, submitData);
//         alert("TNA saved successfully!");
//         setFormData({ ...emptyForm, tna_id: res.data.tna_id, tna_code: res.data.tna_code });
//       }

//       onTnaSaved();
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.error || "Failed to save TNA");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData(emptyForm);
//     setError("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-lg">
//       <h2 className="mb-8 text-2xl font-semibold">TNA Form</h2>

//       {/* TNA ID */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">TNA ID:</label>
//         <input
//           type="text"
//           name="tna_id"
//           value={formData.tna_id}
//           readOnly
//           className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
//         />
//       </div>

//       {/* TNA Code */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">TNA Code:</label>
//         <input
//           type="text"
//           name="tna_code"
//           value={formData.tna_code}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Buyer PO Number */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Buyer PO No:</label>
//         <input
//           type="text"
//           name="buyer_po_number"
//           value={formData.buyer_po_number}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Item Name */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Item Name:</label>
//         <input
//           type="text"
//           name="item_name"
//           value={formData.item_name}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Style Number */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Style Number:</label>
//         <input
//           type="text"
//           name="style_number"
//           value={formData.style_number}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* SKU Code */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">SKU Code:</label>
//         <input
//           type="text"
//           name="sku_code"
//           value={formData.sku_code}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Buyer Order Date */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Buyer Order Date:</label>
//         <input
//           type="date"
//           name="buyer_order_date"
//           value={formData.buyer_order_date.split("T")[0] || ""}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Status */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Status:</label>
//         <select
//           name="tna_overall_status"
//           value={formData.tna_overall_status}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         >
//           <option value="">Select Status</option>
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       {/* Remarks */}
//       <div className="flex items-center mb-8">
//         <label className="w-40 text-sm font-medium text-gray-700">Remarks:</label>
//         <textarea
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

//       <div className="flex space-x-4">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           {editingTna && editingTna.tna_id ? "Update" : "Submit"}
//         </button>
//         <button
//           type="button"
//           onClick={handleReset}
//           className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Reset
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TnaForm;

/////////////


import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const emptyForm = {
  tna_id: "",
  tna_code: "",
  buyer_po_number: "",
  item_name: "",
  style_number: "",
  sku_code: "",
  buyer_order_date: "",
  tna_overall_status: "",
  remarks: "",
};

const TnaForm = ({ tnaToEdit, onTnaSaved }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (tnaToEdit) {
      setFormData({
        tna_id: tnaToEdit.tna_id || "",
        tna_code: tnaToEdit.tna_code || "",
        buyer_po_number: tnaToEdit.buyer_po_number || "",
        item_name: tnaToEdit.item_name || "",
        style_number: tnaToEdit.style_number || "",
        sku_code: tnaToEdit.sku_code || "",
        buyer_order_date: tnaToEdit.buyer_order_date || "",
        tna_overall_status: tnaToEdit.tna_overall_status || "",
        remarks: tnaToEdit.remarks || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [tnaToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const submitData = { ...formData };

      if (formData.tna_id) {
        await axios.put(`${API_BASE}/tna/${formData.tna_id}`, submitData);
        alert("TNA updated successfully!");
      } else {
        const res = await axios.post(`${API_BASE}/tna`, submitData);
        alert("TNA saved successfully!");
        setFormData({ ...emptyForm, tna_id: res.data.tna_id, tna_code: res.data.tna_code });
      }

      onTnaSaved();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to save TNA");
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
      <h2 className="mb-8 text-2xl font-semibold">TNA Form</h2>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">TNA ID:</label>
        <input
          type="text"
          name="tna_id"
          value={formData.tna_id}
          readOnly
          className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">TNA Code:</label>
        <input
          type="text"
          name="tna_code"
          value={formData.tna_code}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Buyer PO No:</label>
        <input
          type="text"
          name="buyer_po_number"
          value={formData.buyer_po_number}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Item Name:</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Style Number:</label>
        <input
          type="text"
          name="style_number"
          value={formData.style_number}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">SKU Code:</label>
        <input
          type="text"
          name="sku_code"
          value={formData.sku_code}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Buyer Order Date:</label>
        <input
          type="date"
          name="buyer_order_date"
          value={formData.buyer_order_date?.split("T")[0] || ""}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Status:</label>
        <select
          name="tna_overall_status"
          value={formData.tna_overall_status}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex items-center mb-8">
        <label className="w-40 text-sm font-medium text-gray-700">Remarks:</label>
        <textarea
          name="remarks"
          value={formData.remarks}
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
          {tnaToEdit && tnaToEdit.tna_id ? "Update" : "Submit"}
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

export default TnaForm;
