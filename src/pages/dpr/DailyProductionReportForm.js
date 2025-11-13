
//////


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
  items: [
    {
      dpr_code: "",
      dpr_date: "",
      style_number: "",
      vendor_po_number: "",
      units_produced: "",
      cutting: "",
      stitching: "",
      finishing: "",
      packaging: "",
      defects: "",
    },
  ],
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

  // useEffect(() => {
  //   if (report) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       vendor_line_item_id: report.vendor_line_item_id ?? "",
  //       quantity: report.quantity ?? 0,
  //       vendor_po_number: report.vendor_po_number ?? "",
  //       colour: report.colour ?? "",
  //       buyer_po_number: report.buyer_po_number ?? "",
  //       style_number: report.style_number ?? "",
  //       item_name: report.item_name ?? "",
  //       sku_code: report.sku_code ?? "",
  //       vendor_name: report.vendor_name ?? "",
  //       buyer_name: report.buyer_name ?? "",
  //       vendor_code: report.vendor_code ?? "",
  //       buyer_code: report.buyer_code ?? "",
  //       remarks: report.remarks ?? "",
  //       dpr_code: report.dpr_code ?? "",
  //       units_produced: report.units_produced ?? 0,
  //       cutting: report.cutting ?? 0,
  //       stitching: report.stitching ?? 0,
  //       finishing: report.finishing ?? 0,
  //       packaging: report.packaging ?? 0,
  //       reported_on: report.reported_on
  //         ? new Date(report.reported_on).toISOString().substring(0, 10)
  //         : "",
  //       items: report.items?.length ? report.items : [],
  //     }));
  //   } else {
  //     setFormData(emptyForm);
  //   }
  // }, [report]);
  

  useEffect(() => {
  if (report) {
    setFormData((prev) => ({
      ...prev,
      vendor_line_item_id: report.vendor_line_item_id ?? "",
      quantity: Number(report.quantity) || 0,
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
      units_produced: Number(report.units_produced) || 0,
      cutting: Number(report.cutting) || 0,
      stitching: Number(report.stitching) || 0,
      finishing: Number(report.finishing) || 0,
      packaging: Number(report.packaging) || 0,
      reported_on: report.reported_on
        ? new Date(report.reported_on).toISOString().substring(0, 10)
        : "",
      items: report.items?.length
        ? report.items.map((item) => ({
            dpr_line_item_id: item.dpr_line_item_id, // ✅ key added
            dpr_code: item.dpr_code ?? report.dpr_code ?? "",
            dpr_date: item.dpr_date
              ? new Date(item.dpr_date).toISOString().substring(0, 10)
              : "",
            style_number: item.style_number ?? report.style_number ?? "",
            vendor_po_number: item.vendor_po_number ?? report.vendor_po_number ?? "",
            units_produced: Number(item.units_produced) || 0,
            cutting: Number(item.cutting) || 0,
            stitching: Number(item.stitching) || 0,
            finishing: Number(item.finishing) || 0,
            packaging: Number(item.packaging) || 0,
            defects: Number(item.defects) || 0,
          }))
        : [],
    }));
  } else {
    setFormData(emptyForm);
  }
}, [report]);


// Add this useEffect inside your component
useEffect(() => {
  // List of numeric fields to sum from line items
  const fieldsToSum = ["units_produced", "cutting", "stitching", "finishing", "packaging", "defects"];

  // Create an object with summed values
  const totals = fieldsToSum.reduce((acc, field) => {
    acc[field] = formData.items.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
    return acc;
  }, {});

  // Update the main form with these totals
  setFormData((prev) => ({ ...prev, ...totals }));
}, [formData.items]);


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

  const inputClass =
    "w-56 h-10 px-3 py-2 border border-gray-400 rounded text-base"; // smaller width, slightly taller

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-8 mx-auto bg-white rounded shadow max-w-7xl"
    >
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
          <div key={field} className="flex items-center">
            <label className="w-48 pr-3 font-medium text-right">{label}</label>
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
          <div key={field} className="flex items-center">
            <label className="w-48 pr-3 font-medium text-right">{label}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}

        <div className="flex items-center">
          <label className="w-48 pr-3 font-medium text-right">DPR Code</label>
          <input
            type="text"
            value={formData.dpr_code}
            readOnly
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        <div className="flex items-center">
          <label className="w-48 pr-3 font-medium text-right">Reported On</label>
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

      

      <div className="w-full overflow-x-auto">
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
                <th key={h} className="px-3 py-2 border min-w-[200px]">
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
                  <td key={i} className="px-3 py-2 border min-w-[200px]">
                    <input
                      type={type}
                      name={field}
                      value={item[field]}
                      onChange={(e) => handleItemChange(index, e)}
                      className="h-10 px-2 py-1 text-base border border-gray-400 rounded w-36"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <div className="mt-4 mb-6"> {/* Added top and bottom margin */}
  <button
    type="button"
    onClick={addRow}
    className="px-4 py-2 text-white bg-blue-600 rounded"
  >
    + Add Row
  </button>
</div>

    <div>
  <label className="block mb-1 font-medium">Remarks</label>
  <textarea
    name="remarks"
    value={formData.remarks}
    onChange={handleChange}
    className="w-full px-3 py-2 text-base border border-gray-400 rounded h-28"
  />
</div>

      <button
        type="submit"
        className="px-6 py-2 mt-6 text-white bg-green-600 rounded"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
};

export default DailyProductionReportForm;