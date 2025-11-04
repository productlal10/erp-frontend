// src/BuyerPOLineItemList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const BuyerPOLineItemList = ({ onEdit }) => {
  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    fetchLineItems();
  }, []);

  const fetchLineItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/buyer_po_line_items`);
      setLineItems(res.data);
    } catch (err) {
      console.error("Error fetching line items:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Buyer PO Line Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "System PO ID",
                "Cost Sheet ID",
                "Cost Sheet Code",
                "PO Number",
                "Item Name",
                "Style Number",
                "Units of Measure",
                "Quantity",
                "Rate",
                "Amount",
                "Apply Taxes",
                "GST Treatment",
                "SKU Code",
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
              <tr key={item.line_item_id} className="transition-colors duration-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.line_item_id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.system_po_id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.cost_sheet_id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.cost_sheet_code}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.po_number}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.item_name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.style_number}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.units_of_measure}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.rate}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.apply_taxes}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.gst_treatment}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.sku_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerPOLineItemList;
