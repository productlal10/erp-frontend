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

  status_greige_fabric_order: "",
  expected_date_greige_fabric_order: "",
  actual_date_greige_fabric_order: "",
  last_modified_date_time_greige_fabric_order: "",
  greige_fabric_quantity_ordered: "",
  running_status_greige_fabric_order: "",

  // ✅ Greige Fabric In-house Section
  overall_status_greige_fabric_inhouse: "",
  overall_expected_date_greige_fabric_inhouse: "",
  overall_actual_date_greige_fabric_inhouse: "",
  last_modified_date_time_greige_fabric_inhouse: "",
  cumulative_quantity_greige_fabric_inhouse: "",
  running_status_greige_fabric_inhouse: "",

  // ✅ Fabric Processing Start Section
  status_fabric_processing_start: "",
  expected_date_fabric_processing_start: "",
  actual_date_fabric_processing_start: "",
  last_modified_date_time_fabric_processing_start: "",
  vendor_po_no_fabric_processing_start: "",
  fabric_name_fabric_processing_start: "",
  processed_fabric_quantity: "",
  running_status_fabric_processing_start: "",

  // ✅ Strike-off / Lab-dip / Desk-loom Section
  status_strikeoff_labdip_deskloom: "",
  expected_date_strikeoff_labdip_deskloom: "",
  actual_date_strikeoff_labdip_deskloom: "",
  last_modified_date_time_strikeoff_labdip_deskloom: "",
  running_status_strikeoff_labdip_deskloom: "",
  
  // ✅ Yardages In-house Section
  status_yardages_inhouse: "",
  expected_date_yardages_inhouse: "",
  actual_date_yardages_inhouse: "",
  last_modified_date_time_yardages_inhouse: "",
  running_status_yardages_inhouse: "",

  // ✅ Processed Fabric In-house Section
  overall_status_processed_fabric_inhouse: "",
  overall_expected_date_processed_fabric_inhouse: "",
  overall_actual_date_processed_fabric_inhouse: "",
  last_modified_date_time_processed_fabric_inhouse: "",
  cumulative_quantity_processed_fabric_inhouse: "",
  running_status_processed_fabric_inhouse: "",

  // ✅ Processed Fabric QC Section
  overall_status_processed_fabric_qc: "",
  overall_expected_date_processed_fabric_qc: "",
  overall_actual_date_processed_fabric_qc: "",
  last_modified_date_time_processed_fabric_qc: "",
  cumulative_quantity_processed_fabric_qc: "",
  running_status_processed_fabric_qc: "",

  // ✅ Trims Order Section
  overall_status_trims_order: "",
  overall_expected_date_trims_order: "",
  overall_actual_date_trims_order: "",
  last_modified_date_time_trims_order: "",
  running_status_trims_order: "",





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
        // ✅ Greige Fabric Order
  status_greige_fabric_order: tnaToEdit.status_greige_fabric_order || "",
  expected_date_greige_fabric_order: tnaToEdit.expected_date_greige_fabric_order || "",
  actual_date_greige_fabric_order: tnaToEdit.actual_date_greige_fabric_order || "",
  //last_modified_date_time_greige_fabric_order: tnaToEdit.last_modified_date_time_greige_fabric_order || "",
  last_modified_date_time_greige_fabric_order: tnaToEdit.last_modified_date_time_greige_fabric_order 
  ? tnaToEdit.last_modified_date_time_greige_fabric_order.replace(" ", "T").slice(0, 16)
  : "",
  greige_fabric_quantity_ordered: tnaToEdit.greige_fabric_quantity_ordered || "",
  running_status_greige_fabric_order: tnaToEdit.running_status_greige_fabric_order || "",

  // ✅ Greige Fabric In-house
  overall_status_greige_fabric_inhouse: tnaToEdit.overall_status_greige_fabric_inhouse || "",
  overall_expected_date_greige_fabric_inhouse: tnaToEdit.overall_expected_date_greige_fabric_inhouse || "",
  overall_actual_date_greige_fabric_inhouse: tnaToEdit.overall_actual_date_greige_fabric_inhouse || "",
  //last_modified_date_time_greige_fabric_inhouse: tnaToEdit.last_modified_date_time_greige_fabric_inhouse || "",
  last_modified_date_time_greige_fabric_inhouse: tnaToEdit.last_modified_date_time_greige_fabric_inhouse 
  ? tnaToEdit.last_modified_date_time_greige_fabric_inhouse.replace(" ", "T").slice(0, 16)
  : "",
  cumulative_quantity_greige_fabric_inhouse: tnaToEdit.cumulative_quantity_greige_fabric_inhouse || "",
  running_status_greige_fabric_inhouse: tnaToEdit.running_status_greige_fabric_inhouse || "",

  // ✅ Fabric Processing Start
  status_fabric_processing_start: tnaToEdit.status_fabric_processing_start || "",
  expected_date_fabric_processing_start: tnaToEdit.expected_date_fabric_processing_start || "",
  actual_date_fabric_processing_start: tnaToEdit.actual_date_fabric_processing_start || "",
  //last_modified_date_time_fabric_processing_start: tnaToEdit.last_modified_date_time_fabric_processing_start || "",
  last_modified_date_time_fabric_processing_start: tnaToEdit.last_modified_date_time_fabric_processing_start 
  ? tnaToEdit.last_modified_date_time_fabric_processing_start.replace(" ", "T").slice(0, 16)
  : "",
  vendor_po_no_fabric_processing_start: tnaToEdit.vendor_po_no_fabric_processing_start || "",
  fabric_name_fabric_processing_start: tnaToEdit.fabric_name_fabric_processing_start || "",
  processed_fabric_quantity: tnaToEdit.processed_fabric_quantity || "",
  running_status_fabric_processing_start: tnaToEdit.running_status_fabric_processing_start || "",

  // ✅ Strike-off / Lab-dip / Desk-loom
  status_strikeoff_labdip_deskloom: tnaToEdit.status_strikeoff_labdip_deskloom || "",
  expected_date_strikeoff_labdip_deskloom: tnaToEdit.expected_date_strikeoff_labdip_deskloom || "",
  actual_date_strikeoff_labdip_deskloom: tnaToEdit.actual_date_strikeoff_labdip_deskloom || "",
  //last_modified_date_time_strikeoff_labdip_deskloom: tnaToEdit.last_modified_date_time_strikeoff_labdip_deskloom || "",
  
  last_modified_date_time_strikeoff_labdip_deskloom: tnaToEdit.last_modified_date_time_strikeoff_labdip_deskloom
  ? tnaToEdit.last_modified_date_time_strikeoff_labdip_deskloom.replace(" ", "T").slice(0, 16)
  : "",

  running_status_strikeoff_labdip_deskloom: tnaToEdit.running_status_strikeoff_labdip_deskloom || "",
        
  // ✅ Yardages In-house Section
  status_yardages_inhouse: tnaToEdit.status_yardages_inhouse || "",
  expected_date_yardages_inhouse: tnaToEdit.expected_date_yardages_inhouse || "",
  actual_date_yardages_inhouse: tnaToEdit.actual_date_yardages_inhouse || "",
  //last_modified_date_time_yardages_inhouse: tnaToEdit.last_modified_date_time_yardages_inhouse || "",
  last_modified_date_time_yardages_inhouse: tnaToEdit.last_modified_date_time_yardages_inhouse
  ? tnaToEdit.last_modified_date_time_yardages_inhouse.replace(" ", "T").slice(0, 16)
  : "",



  running_status_yardages_inhouse: tnaToEdit.running_status_yardages_inhouse || "",

  // ✅ Processed Fabric In-house Section
  overall_status_processed_fabric_inhouse: tnaToEdit.overall_status_processed_fabric_inhouse || "",
  overall_expected_date_processed_fabric_inhouse: tnaToEdit.overall_expected_date_processed_fabric_inhouse || "",
  overall_actual_date_processed_fabric_inhouse: tnaToEdit.overall_actual_date_processed_fabric_inhouse || "",
  //last_modified_date_time_processed_fabric_inhouse: tnaToEdit.last_modified_date_time_processed_fabric_inhouse || "",
  last_modified_date_time_processed_fabric_inhouse: tnaToEdit.last_modified_date_time_processed_fabric_inhouse
  ? tnaToEdit.last_modified_date_time_processed_fabric_inhouse.replace(" ", "T").slice(0, 16)
  : "",
  cumulative_quantity_processed_fabric_inhouse: tnaToEdit.cumulative_quantity_processed_fabric_inhouse || "",
  running_status_processed_fabric_inhouse: tnaToEdit.running_status_processed_fabric_inhouse || "",

  // ✅ Processed Fabric QC Section
  overall_status_processed_fabric_qc: tnaToEdit.overall_status_processed_fabric_qc || "",
  overall_expected_date_processed_fabric_qc: tnaToEdit.overall_expected_date_processed_fabric_qc || "",
  overall_actual_date_processed_fabric_qc: tnaToEdit.overall_actual_date_processed_fabric_qc || "",
  //last_modified_date_time_processed_fabric_qc: tnaToEdit.last_modified_date_time_processed_fabric_qc || "",

  last_modified_date_time_processed_fabric_qc: tnaToEdit.last_modified_date_time_processed_fabric_qc
  ? tnaToEdit.last_modified_date_time_processed_fabric_qc.replace(" ", "T").slice(0, 16)
  : "",

  cumulative_quantity_processed_fabric_qc: tnaToEdit.cumulative_quantity_processed_fabric_qc || "",
  running_status_processed_fabric_qc: tnaToEdit.running_status_processed_fabric_qc || "",

  // ✅ Trims Order Section
  overall_status_trims_order: tnaToEdit.overall_status_trims_order || "",
  overall_expected_date_trims_order: tnaToEdit.overall_expected_date_trims_order || "",
  overall_actual_date_trims_order: tnaToEdit.overall_actual_date_trims_order || "",
  //last_modified_date_time_trims_order: tnaToEdit.last_modified_date_time_trims_order || "",
  last_modified_date_time_trims_order: tnaToEdit.last_modified_date_time_trims_order
  ? tnaToEdit.last_modified_date_time_trims_order.replace(" ", "T").slice(0, 16)
  : "",
  running_status_trims_order: tnaToEdit.running_status_trims_order || "",

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
      {/* ---------------------------------------------- */}
{/* 1. Greige Fabric Order */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Greige Fabric Order Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Status (Greige Fabric Order):</label>
  <input type="text" name="status_greige_fabric_order" value={formData.status_greige_fabric_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Greige Fabric Order):</label>
  <input type="date" name="expected_date_greige_fabric_order" value={formData.expected_date_greige_fabric_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Greige Fabric Order):</label>
  <input type="date" name="actual_date_greige_fabric_order" value={formData.actual_date_greige_fabric_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Greige Fabric Order):</label>
  <input type="datetime-local" name="last_modified_date_time_greige_fabric_order" value={formData.last_modified_date_time_greige_fabric_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Greige Fabric Quantity Ordered:</label>
  <input type="number" name="greige_fabric_quantity_ordered" value={formData.greige_fabric_quantity_ordered} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Greige Fabric Order):</label>
  <input type="text" name="running_status_greige_fabric_order" value={formData.running_status_greige_fabric_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>


{/* ---------------------------------------------- */}
{/* 2. Greige Fabric In-House */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Greige Fabric In-house Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Overall Status(Greige Fabric In-house):</label>
  <input type="text" name="overall_status_greige_fabric_inhouse" value={formData.overall_status_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Overall Expected Date(Greige Fabric In-house):</label>
  <input type="date" name="overall_expected_date_greige_fabric_inhouse" value={formData.overall_expected_date_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72"> Overall Actual Date(Greige Fabric In-house):</label>
  <input type="date" name="overall_actual_date_greige_fabric_inhouse" value={formData.overall_actual_date_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Greige Fabric In-house):</label>
  <input type="datetime-local" name="last_modified_date_time_greige_fabric_inhouse" value={formData.last_modified_date_time_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Cumulative Quantity(Greige Fabric In-house):</label>
  <input type="number" name="cumulative_quantity_greige_fabric_inhouse" value={formData.cumulative_quantity_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Greige Fabric In-house):</label>
  <input type="text" name="running_status_greige_fabric_inhouse" value={formData.running_status_greige_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>



{/* ---------------------------------------------- */}
{/* 3. Fabric Processing Start */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Fabric Processing Start Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Status(Fabric Processing Start):</label>
  <input type="text" name="status_fabric_processing_start" value={formData.status_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Fabric Processing Start):</label>
  <input type="date" name="expected_date_fabric_processing_start" value={formData.expected_date_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Fabric Processing Start):</label>
  <input type="date" name="actual_date_fabric_processing_start" value={formData.actual_date_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Fabric Processing Start):</label>
  <input type="datetime-local" name="last_modified_date_time_fabric_processing_start" value={formData.last_modified_date_time_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Vendor PO No(Fabric Processing Start):</label>
  <input type="text" name="vendor_po_no_fabric_processing_start" value={formData.vendor_po_no_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Fabric Name(Fabric Processing Start):</label>
  <input type="text" name="fabric_name_fabric_processing_start" value={formData.fabric_name_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Processed Fabric Quantity:</label>
  <input type="number" name="processed_fabric_quantity" value={formData.processed_fabric_quantity} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Fabric Processing Start):</label>
  <input type="text" name="running_status_fabric_processing_start" value={formData.running_status_fabric_processing_start} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>



{/* ---------------------------------------------- */}
{/* 4. Strike-off / Lab-dip / Desk-loom */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Strike-off / Lab-dip / Desk-loom Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Status(Strike-off/Lab-dip/Desk-loom):</label>
  <input type="text" name="status_strikeoff_labdip_deskloom" value={formData.status_strikeoff_labdip_deskloom} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Strike-off/Lab-dip/Desk-loom):</label>
  <input type="date" name="expected_date_strikeoff_labdip_deskloom" value={formData.expected_date_strikeoff_labdip_deskloom} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Strike-off/Lab-dip/Desk-loom):</label>
  <input type="date" name="actual_date_strikeoff_labdip_deskloom" value={formData.actual_date_strikeoff_labdip_deskloom} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Strike-off/Lab-dip/Desk-loom):</label>
  <input type="datetime-local" name="last_modified_date_time_strikeoff_labdip_deskloom" value={formData.last_modified_date_time_strikeoff_labdip_deskloom} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Strike-off/Lab-dip/Desk-loom):</label>
  <input type="text" name="running_status_strikeoff_labdip_deskloom" value={formData.running_status_strikeoff_labdip_deskloom} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

{/* ---------------------------------------------- */}
{/* 5. Yardages In-house */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Yardages In-house Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Status(Yardages In-house):</label>
  <input type="text" name="status_yardages_inhouse" value={formData.status_yardages_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Yardages In-house):</label>
  <input type="date" name="expected_date_yardages_inhouse" value={formData.expected_date_yardages_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Yardages In-house):</label>
  <input type="date" name="actual_date_yardages_inhouse" value={formData.actual_date_yardages_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Yardages In-house):</label>
  <input type="datetime-local" name="last_modified_date_time_yardages_inhouse" value={formData.last_modified_date_time_yardages_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Yardages In-house):</label>
  <input type="text" name="running_status_yardages_inhouse" value={formData.running_status_yardages_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>


{/* ---------------------------------------------- */}
{/* 6. Processed Fabric In-house */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Processed Fabric In-house Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Overall Status(Processed Fabric In-house):</label>
  <input type="text" name="overall_status_processed_fabric_inhouse" value={formData.overall_status_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Processed Fabric In-house):</label>
  <input type="date" name="overall_expected_date_processed_fabric_inhouse" value={formData.overall_expected_date_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Processed Fabric In-house):</label>
  <input type="date" name="overall_actual_date_processed_fabric_inhouse" value={formData.overall_actual_date_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Processed Fabric In-house):</label>
  <input type="datetime-local" name="last_modified_date_time_processed_fabric_inhouse" value={formData.last_modified_date_time_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Cumulative Quantity(Processed Fabric In-house):</label>
  <input type="number" name="cumulative_quantity_processed_fabric_inhouse" value={formData.cumulative_quantity_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Processed Fabric In-house):</label>
  <input type="text" name="running_status_processed_fabric_inhouse" value={formData.running_status_processed_fabric_inhouse} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

{/* ---------------------------------------------- */}
{/* 7. Processed Fabric QC */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Processed Fabric QC Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Overall Status(Processed Fabric QC):</label>
  <input type="text" name="overall_status_processed_fabric_qc" value={formData.overall_status_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Processed Fabric QC):</label>
  <input type="date" name="overall_expected_date_processed_fabric_qc" value={formData.overall_expected_date_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Processed Fabric QC):</label>
  <input type="date" name="overall_actual_date_processed_fabric_qc" value={formData.overall_actual_date_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Processed Fabric QC):</label>
  <input type="datetime-local" name="last_modified_date_time_processed_fabric_qc" value={formData.last_modified_date_time_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Cumulative Quantity(Processed Fabric QC):</label>
  <input type="number" name="cumulative_quantity_processed_fabric_qc" value={formData.cumulative_quantity_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Processed Fabric QC):</label>
  <input type="text" name="running_status_processed_fabric_qc" value={formData.running_status_processed_fabric_qc} onChange={handleChange} className="w-64 px-2 py-2 border rounded" />
</div>

{/* ---------------------------------------------- */}
{/* 8. Trims Order */}
<h3 className="mt-8 mb-2 text-lg font-semibold">Trims Order Section</h3>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Overall Status(Trims Order):</label>
  <input type="text" name="overall_status_trims_order" value={formData.overall_status_trims_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Expected Date(Trims Order):</label>
  <input type="date" name="overall_expected_date_trims_order" value={formData.overall_expected_date_trims_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Actual Date(Trims Order):</label>
  <input type="date" name="overall_actual_date_trims_order" value={formData.overall_actual_date_trims_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Last Modified Date Time(Trims Order):</label>
  <input type="datetime-local" name="last_modified_date_time_trims_order" value={formData.last_modified_date_time_trims_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
</div>

<div className="flex items-center mb-4">
  <label className="text-sm font-medium w-72">Running Status(Trims Order):</label>
  <input type="text" name="running_status_trims_order" value={formData.running_status_trims_order} onChange={handleChange} className="w-64 px-2 py-2 border rounded"/>
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
