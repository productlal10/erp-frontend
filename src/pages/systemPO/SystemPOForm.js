
// src/SystemPOForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const SystemPOForm = ({ systemPO, onSystemPOSaved, onCancel }) => {
  const [customers, setCustomers] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [costSheets, setCostSheets] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // to check if updating existing record
  const [formData, setFormData] = useState({
    merchandiser: "",
    department: "",
    upload_buyer_po: null,
    po_number: "",
    buyer_name: "",
    customer_code: "",
    customer_id: null,
    buyer_order_date: "",
    expected_delivery_date: "",
    buyer_po_reference_number: "",
    type_of_buyer_po: "",
    items: [
      {
        item_id: "",
        item_name: "",
        item_description: "",
        style_number: "",
        cost_sheet_id: "",
        cost_sheet_code: "",
        sku_code: "",
        units_of_measure: "",
        rate: "",
        quantity: "",
        apply_taxes: "",
        gst_treatment: "",
        amount: "",
        remarks: "",
      },
    ],
    discount_amount: "",
    sub_total_amount: "",
    gst_amount: "",
    shipping_cost: "",
    total_amount: "",
    billing_address: "",
    shipping_address: "",
  });

  const uomOptions = ["PCS", "KG", "MTR", "LITRE", "BOX"]; // add more if needed

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/customers`);
        setCustomers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE}/items`);
        setItemsList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // Fetch cost sheets
  useEffect(() => {
    const fetchCostSheets = async () => {
      try {
        const res = await axios.get(`${API_BASE}/costsheets`);
        setCostSheets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching cost sheets:", err);
      }
    };
    fetchCostSheets();
  }, []);

  // Fetch po_number
  useEffect(() => {
  const fetchNextPONumber = async () => {
    try {
      //const res = await fetch("/api/systempos/next-po-number");
      const res = await fetch("http://localhost:4000/systempos/next-po-number"); 
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        po_number: data.nextPOCode,
      }));
    } catch (error) {
      console.error("Error fetching next PO number:", error);
    }
  };

  fetchNextPONumber();
}, []);




  // Populate form for editing
  useEffect(() => {
    if (systemPO) {
      setFormData(prev => ({
        ...prev,
        ...systemPO,
        items:
          systemPO.items && systemPO.items.length > 0
            ? systemPO.items
            : prev.items,
      }));
      setIsUpdate(true);
    }
  }, [systemPO]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "buyer_name") {
      const selectedCustomer = customers.find(
        (c) => c.company_name === value
      );

      setFormData((prev) => ({
        ...prev,
        buyer_name: value,
        customer_code: selectedCustomer ? selectedCustomer.customer_code : "",
        customer_id: selectedCustomer ? selectedCustomer.customer_id : null,
      }));
    } 
    
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  // const handleItemChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedItems = [...formData.items];

  //   if (name === "item_name") {
  //     const selectedItem = itemsList.find((i) => i.item_name === value);
  //     updatedItems[index].item_name = value;
  //     updatedItems[index].style_number = selectedItem?.style_number || "";
  //     updatedItems[index].item_id = selectedItem?.item_id || "";
  //     updatedItems[index].item_sku = selectedItem?.item_sku || ""; 
  //   } else if (name === "cost_sheet_id") {
  //     const selectedCostSheet = costSheets.find(
  //       (cs) => cs.cost_sheet_code === value
  //     );
  //     updatedItems[index].cost_sheet_id = selectedCostSheet
  //       ? selectedCostSheet.cost_sheet_id
  //       : "";
  //     updatedItems[index].cost_sheet_code = value;
  //   } else {
  //     updatedItems[index][name] = value;
  //   }

  //   if (name === "rate" || name === "quantity") {
  //     const rate = parseFloat(updatedItems[index].rate) || 0;
  //     const qty = parseFloat(updatedItems[index].quantity) || 0;
  //     updatedItems[index].amount = (rate * qty).toFixed(2);
  //   }

  //   setFormData({ ...formData, items: updatedItems });
  // };

//   const handleItemChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedItems = [...formData.items];

//   if (name === "item_name") {
//     const selectedItem = itemsList.find((i) => i.item_name === value);
//     updatedItems[index].item_name = value;
//     updatedItems[index].style_number = selectedItem?.style_number || "";
//     updatedItems[index].item_id = selectedItem?.item_id || "";
//     updatedItems[index].sku_code = selectedItem?.item_sku || ""; 
//   } else if (name === "cost_sheet_id") {
//     const selectedCostSheet = costSheets.find(
//       (cs) => cs.cost_sheet_code === value
//     );
//     updatedItems[index].cost_sheet_id = selectedCostSheet
//       ? selectedCostSheet.cost_sheet_id
//       : "";
//     updatedItems[index].cost_sheet_code = value;
//   } 
//   // ✅ Add this block for gst_treatment
//   else if (name === "gst_treatment") {
//     updatedItems[index][name] = parseInt(value) || 0; // convert to integer
//   } 
//   else {
//     updatedItems[index][name] = value;
//   }

//   if (["rate", "quantity", "gst_treatment"].includes(name)) {
//   const rate = parseFloat(updatedItems[index].rate) || 0;
//   const qty = parseFloat(updatedItems[index].quantity) || 0;
//   const gst = parseFloat(updatedItems[index].gst_treatment) || 0;

//   const baseAmount = rate * qty;
//   const totalAmount = baseAmount + (baseAmount * gst / 100); // GST added
//   updatedItems[index].amount = totalAmount.toFixed(2);
// }

//   setFormData({ ...formData, items: updatedItems });
// };


const handleItemChange = (index, e) => {
  const { name, value } = e.target;
  const updatedItems = [...formData.items];

  // 🔹 Update field value
  updatedItems[index][name] = value;

  // 🔹 Auto-fill item-related fields
  if (name === "item_name") {
    const selectedItem = itemsList.find(i => i.item_name === value);
    if (selectedItem) {
      updatedItems[index].style_number = selectedItem.style_number || "";
      updatedItems[index].item_id = selectedItem.item_id || "";
      updatedItems[index].sku_code = selectedItem.item_sku || "";
    }
  }

  // 🔹 Auto-fill cost sheet mapping
  if (name === "cost_sheet_id") {
    const selectedCostSheet = costSheets.find(
      cs => cs.cost_sheet_code === value
    );
    updatedItems[index].cost_sheet_id = selectedCostSheet
      ? selectedCostSheet.cost_sheet_id
      : "";
    updatedItems[index].cost_sheet_code = value;
  }

  // 🔹 Handle GST treatment conversion
  if (name === "gst_treatment") {
    updatedItems[index][name] = parseFloat(value) || 0;
  }

  // 🔹 Calculate per-line amount (with GST)
  if (["rate", "quantity", "gst_treatment"].includes(name)) {
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const qty = parseFloat(updatedItems[index].quantity) || 0;
    const gst = parseFloat(updatedItems[index].gst_treatment) || 0;

    const baseAmount = rate * qty;
    const gstAmount = (baseAmount * gst) / 100;
    const totalAmount = baseAmount + gstAmount;

    updatedItems[index].base_amount = baseAmount.toFixed(2); // optional: show pure amount before GST
    updatedItems[index].gst_value = gstAmount.toFixed(2); // optional: show GST value
    updatedItems[index].amount = totalAmount.toFixed(2);
  }

  // 🔹 Recalculate totals across all line items
  const subTotal = updatedItems.reduce(
    (sum, item) =>
      sum + (parseFloat(item.rate) || 0) * (parseFloat(item.quantity) || 0),
    0
  );

  const gstTotal = updatedItems.reduce(
    (sum, item) =>
      sum +
      ((parseFloat(item.rate) || 0) *
        (parseFloat(item.quantity) || 0) *
        (parseFloat(item.gst_treatment) || 0)) /
        100,
    0
  );

  const totalAmount = subTotal + gstTotal;

  // 🔹 Update formData with all calculated totals
  setFormData({
    ...formData,
    items: updatedItems,
    sub_total_amount: subTotal.toFixed(2),
    gst_amount: gstTotal.toFixed(2),
    total_amount: totalAmount.toFixed(2),
  });
};


  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_id: "",
          item_name: "",
          item_description: "",
          style_number: "",
          cost_sheet_id: "",
          cost_sheet_code: "",
          sku_code: "",
          units_of_measure: "",
          rate: "",
          quantity: "",
          apply_taxes: "",
          gst_treatment: "",
          amount: "",
          remarks: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData };

      if (Array.isArray(dataToSend.items)) {
        dataToSend.items = dataToSend.items.map(({ amount, ...rest }) => rest);
      }

      if (formData.upload_buyer_po) {
        const formDataObj = new FormData();
        formDataObj.append("upload_buyer_po", formData.upload_buyer_po);

        Object.keys(dataToSend).forEach((key) => {
          if (key !== "upload_buyer_po") {
            formDataObj.append(key, JSON.stringify(dataToSend[key]));
          }
        });

        if (isUpdate) {
          await axios.put(
            `${API_BASE}/systempos/${formData.system_po_id}`,
            formDataObj,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          await axios.post(`${API_BASE}/systempos`, formDataObj, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      } else {
        if (isUpdate) {
          await axios.put(`${API_BASE}/systempos/${formData.system_po_id}`, dataToSend);
        } else {
          await axios.post(`${API_BASE}/systempos`, dataToSend);
        }
      }

      alert(isUpdate ? "System PO updated successfully!" : "System PO saved successfully!");

      handleReset();
      if (onSystemPOSaved) onSystemPOSaved();
    } catch (err) {
      console.error("Error saving System PO:", err);
      alert("Failed to save System PO. Check console.");
    }
  };

  const handleReset = () => {
    setFormData({
      merchandiser: "",
      department: "",
      upload_buyer_po: null,
      po_number: "",
      buyer_name: "",
      customer_code: "",
      customer_id: null,
      buyer_order_date: "",
      expected_delivery_date: "",
      buyer_po_reference_number: "",
      type_of_buyer_po: "",
      items: [
        {
          item_id: "",
          item_name: "",
          item_description: "",
          style_number: "",
          cost_sheet_id: "",
          cost_sheet_code: "",
          sku_code: "",
          units_of_measure: "",
          rate: "",
          quantity: "",
          apply_taxes: "",
          gst_treatment: "",
          amount: "",
          remarks: "",
        },
      ],
      discount_amount: "",
      sub_total_amount: "",
      gst_amount: "",
      shipping_cost: "",
      total_amount: "",
      billing_address: "",
      shipping_address: "",
    });
    setIsUpdate(false);
  };

  const inputClass =
    "p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 w-64";
  const labelClass = "block mb-1 text-sm font-medium text-gray-700";
  const fieldContainerClass = "flex flex-wrap gap-6 mb-4";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl p-6 mx-auto bg-white border border-gray-200 shadow-md">
        <h2 className="pb-2 mb-6 text-xl font-semibold text-gray-800 border-b">
          System PO Master
        </h2>

        <form onSubmit={handleSubmit}>
          {/* ================= General Info ================= */}
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            General Information
          </h3>

          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Merchandiser</label>
              <input
                type="text"
                name="merchandiser"
                value={formData.merchandiser}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            {/* <div>
              <label className={labelClass}>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={inputClass}
              />
            </div> */}

        <div>
          <label className={labelClass}>Department</label>
          <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={inputClass}
            >
        <option value="">- Select Department -</option>
        <option value="Apparels">Apparels</option>
        <option value="Soft-Home">Soft-Home</option>
        <option value="Furniture">Furniture</option>
        <option value="Fabrics">Fabrics</option>
        
        </select>
      </div>




            <div>
              <label className={labelClass}>Upload Buyer PO</label>
              <input
                type="file"
                name="upload_buyer_po"
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* ================= Buyer Details ================= */}
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Buyer PO No</label>
              <input
                type="text"
                name="po_number"
                value={formData.po_number}
                readOnly
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Buyer Name</label>
              <select
                name="buyer_name"
                value={formData.buyer_name}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">-Select Buyer-</option>
                {customers.map((c) => (
                  <option key={c.customer_id} value={c.company_name}>
                    {c.company_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Customer Code</label>
              <input
                type="text"
                name="customer_code"
                value={formData.customer_code}
                readOnly
                className={inputClass}
              />
            </div>
          </div>

          {/* ================= Dates ================= */}
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Buyer Order Date</label>
              <input
                type="date"
                name="buyer_order_date"
                value={formData.buyer_order_date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Expected Delivery Date</label>
              <input
                type="date"
                name="expected_delivery_date"
                value={formData.expected_delivery_date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Buyer PO Reference Number</label>
              <input
                type="text"
                name="buyer_po_reference_number"
                value={formData.buyer_po_reference_number}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

 {/* ================= Type of PO ================= */}
          
  <div className={fieldContainerClass}>
    <div>
    <label className={labelClass}>Type of Buyer PO</label>
    <select
      name="type_of_buyer_po"
      value={formData.type_of_buyer_po}
      onChange={handleChange}
      className={inputClass}
    >
      <option value="">- Select Type -</option>
      <option value="Order">Order</option>
      <option value="Sampling">Sampling</option>
      <option value="Others">Others</option>
      <option value="Replacement PO">Replacement PO</option>
      <option value="FOB Order">FOB Order</option>
    </select>
    </div>
  </div>



          <hr className="my-6 border-gray-200" />

          {/* ================= Item Details ================= */}
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Item Details
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border">Item Name</th>
                  <th className="px-2 py-2 border">Item Description</th>
                  <th className="px-2 py-2 border">Style Number</th>
                  <th className="px-2 py-2 border">Cost Sheet ID</th>
                  <th className="px-2 py-2 border">SKU Code</th>
                  <th className="px-2 py-2 border">UOM</th>
                  <th className="px-2 py-2 border">Rate</th>
                  <th className="px-2 py-2 border">Quantity</th>
                  <th className="px-2 py-2 border">Apply Taxes</th>
                  <th className="px-2 py-2 border">Tax</th>
                  <th className="px-2 py-2 border">Amount</th>
                  <th className="px-2 py-2 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-2 py-1 border">
                      <select
                        name="item_name"
                        value={item.item_name}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      >
                        <option value="">-Select Item-</option>
                        {itemsList.map((i) => (
                          <option key={i.item_id} value={i.item_name}>
                            {i.item_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="item_description"
                        value={item.item_description}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="style_number"
                        value={item.style_number}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <select
                        name="cost_sheet_id"
                        value={item.cost_sheet_code || ""}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      >
                        <option value="">-Select Cost Sheet-</option>
                        {costSheets.map((cs) => (
                          <option key={cs.cost_sheet_id} value={cs.cost_sheet_code}>
                            {cs.cost_sheet_code}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="sku_code"
                        value={item.sku_code}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    {/* <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="units_of_measure"
                        value={item.units_of_measure}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td> */}
                    <td className="px-2 py-1 border">
                        <select
                        name="units_of_measure"
                        value={item.units_of_measure ?? ""}
                        onChange={e => handleItemChange(index, e)}
                        className={inputClass}
                        >
                        <option value="">-Select UOM-</option>
                        {uomOptions.map((uom) => (
                        <option key={uom} value={uom}>
                        {uom}
                        </option>
                        ))}
                        </select>
                        </td>

                    <td className="px-2 py-1 border">
                      <input
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <select
                        name="apply_taxes"
                        value={item.apply_taxes}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      >
                        <option value="">-Select-</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <select
                        name="gst_treatment"
                        value={item.gst_treatment}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      >
                        <option value="">-Select-</option>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                        <option value={18}>18</option>
            
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="number"
                        name="amount"
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        type="text"
                        name="remarks"
                        value={item.remarks}
                        onChange={(e) => handleItemChange(index, e)}
                        className={inputClass}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 mt-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
          >
            + Add New
          </button>

          {/* ================= Other Info ================= */}
          <hr className="my-6 border-gray-200" />
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Other Information</h3>
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Discount Amount</label>
              <input
                type="number"
                name="discount_amount"
                value={formData.discount_amount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Sub-Total Amount</label>
              <input
                type="number"
                name="sub_total_amount"
                value={formData.sub_total_amount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GST Amount</label>
              <input
                type="number"
                name="gst_amount"
                value={formData.gst_amount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Shipping Cost</label>
              <input
                type="number"
                name="shipping_cost"
                value={formData.shipping_cost}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Total Amount</label>
              <input
                type="number"
                name="total_amount"
                value={formData.total_amount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* ================= Address Info ================= */}
          <hr className="my-6 border-gray-200" />
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Address Information</h3>
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Billing Address</label>
              <textarea
                name="billing_address"
                value={formData.billing_address}
                onChange={handleChange}
                className={`${inputClass} h-20`}
              />
            </div>
            <div>
              <label className={labelClass}>Shipping Address</label>
              <textarea
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                className={`${inputClass} h-20`}
              />
            </div>
          </div>

          {/* ================= Buttons ================= */}
          <div className="flex mt-6 space-x-4">
            {/* <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button> */}
            <button
  type="submit"
  className={`px-4 py-2 font-semibold text-white rounded ${
    isUpdate ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {isUpdate ? "Update" : "Submit"}
</button>


        
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Reset
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
      </div>
    </div>
  );
};

export default SystemPOForm;