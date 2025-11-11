import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const VendorPOLineItemList = () => {
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    fetchLineItems();
  }, []);

  const fetchLineItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vendor_po_line_items`);
      setLineItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching Vendor PO Line Items:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Vendor PO Line Items
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Line Item ID",
                "Vendor PO ID",
                "Vendor PO Number",
                "Item ID",
                "Item Name",
                "Style Number",
                "SKU Code",
                "Units of Measure",
                "Quantity",
                "Rate",
                "Amount",
                "Apply Taxes",
                "Taxes"
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {lineItems.map((item) => (
              <tr key={item.vendor_line_item_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{item.vendor_line_item_id}</td>
                <td className="px-4 py-2 text-sm">{item.vendor_po_id}</td>
                <td className="px-4 py-2 text-sm">{item.vendor_po_number}</td>
                <td className="px-4 py-2 text-sm">{item.item_id}</td>
                <td className="px-4 py-2 text-sm">{item.item_name}</td>
                <td className="px-4 py-2 text-sm">{item.style_number}</td>
                <td className="px-4 py-2 text-sm">{item.sku_code}</td>
                <td className="px-4 py-2 text-sm">{item.units_of_measure}</td>
                <td className="px-4 py-2 text-sm">{item.quantity}</td>
                <td className="px-4 py-2 text-sm">{item.rate}</td>
                <td className="px-4 py-2 text-sm">{item.amount}</td>
                <td className="px-4 py-2 text-sm">{item.apply_taxes ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-sm">{item.gst_treatment}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default VendorPOLineItemList;
