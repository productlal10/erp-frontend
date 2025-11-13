
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const VendorPOForm = ({ vendorPO, onVendorPOSaved, onCancel }) => {
  const [vendors, setVendors] = useState([]);
  const [systemPOs, setSystemPOs] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    vendor_id: "",
    order_type: "",
    vendor_company_name: "",
    vendor_name: "",
    vendor_code: "",
    primary_email_id: "",
    vendor_po_no: "",
    payment_terms: "",
    requested_by: "",
    buyer_po_number: "",
    buyer_company_name: "",
    purchase_order_date: "",
    expected_delivery_date: "",
    items: [
      {
        item_name: "",
        style_number: "",
        sku_code: "",
        units_of_measure: "",
        rate: "",
        qty: "",
        apply_taxes: "",
        gst_treatment: "",
        amount: "",
        vendor_po_number: "",
      },
    ],
    sub_total: "",
    shipping_cost: "",
    discount: "",
    total_amount: "",
    terms_and_conditions: "",
  });

  const uomOptions = ["PCS", "KG", "MTR", "LITRE", "BOX"]; // add more if needed

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/vendors`);
        setVendors(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchSystemPOs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/systempos`);
        setSystemPOs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching system POs:", err);
      }
    };
    fetchSystemPOs();
  }, []);

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


useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      // Normalize to just name
      const employeeData = Array.isArray(res.data) ? res.data : [];
      setEmployees(employeeData.map(emp => ({ id: emp.employeeid, name: emp.name })));
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  fetchEmployees();
}, []);

  // fetch buyer po number
  // Fetch vendor_po_no when the Vendor PO form loads
useEffect(() => {
  const fetchNextVPONumber = async () => {
    try {
      const res = await fetch("http://localhost:4000/vendorpos/next-vpo-number", {
        credentials: "include"
      });
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        vendor_po_no: data.nextVPOCode,
      }));
    } catch (err) {
      console.error("Error fetching next Vendor PO number:", err);
    }
  };

  fetchNextVPONumber();
}, []);

  // useEffect(() => {
  //   if (vendorPO) {
  //     setFormData({ ...vendorPO });
  //     setIsUpdate(true);
  //   }
  // }, [vendorPO]);

  useEffect(() => {
  if (vendorPO) {
    const normalizedItems = vendorPO.items?.map(item => ({
      ...item,
      qty: item.quantity || item.qty || 0, // ✅ Convert backend 'quantity' to frontend 'qty'
    })) || [];

    setFormData({ ...vendorPO, items: normalizedItems });
    setIsUpdate(true);
  }
}, [vendorPO]);



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vendor_company_name") {
      const selectedVendor = vendors.find(v => v.company_name === value);
      setFormData(prev => ({
        ...prev,
        vendor_company_name: value,
        vendor_name: selectedVendor?.vendor_first_name || "",
        vendor_code: selectedVendor?.vendor_code || "",
        primary_email_id: selectedVendor?.primary_contact_email || "",
        vendor_id: selectedVendor?.vendor_id || "null",
      }));
      return;
    }

    if (name === "buyer_po_number") {
      const selectedPO = systemPOs.find(po => po.po_number === value);
      setFormData(prev => ({
        ...prev,
        buyer_po_number: value,
        buyer_company_name: selectedPO?.buyer_name || "",
        purchase_order_date: selectedPO?.buyer_order_date || "",
        expected_delivery_date: selectedPO?.expected_delivery_date || "",
        system_po_id: selectedPO?.system_po_id || null,
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleItemChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedItems = [...formData.items];

  //   if (name === "item_name") {
  //     const selectedItem = itemsList.find(i => i.item_name === value);
  //     updatedItems[index] = {
  //       ...updatedItems[index],
  //       item_name: value,
  //       style_number: selectedItem?.style_number || "",
  //       sku_code: selectedItem?.item_sku || "",
  //       item_id: selectedItem?.item_id || null,
  //     };
  //   }
  //   // ✅ Convert gst_treatment to a number
  // else if (name === "gst_treatment") {
  //   updatedItems[index][name] = parseFloat(value) || 0;
  // } 
  
  //   else {
  //     updatedItems[index][name] = value;
  //   }

  //   if (name === "rate" || name === "qty") {
  //     const rate = parseFloat(updatedItems[index].rate) || 0;
  //     const qty = parseFloat(updatedItems[index].qty) || 0;
  //     updatedItems[index].amount = (rate * qty).toFixed(2);
  //   }

  //   setFormData({ ...formData, items: updatedItems });
  // };


  const handleItemChange = (index, e) => {
  const { name, value } = e.target;
  const updatedItems = [...formData.items];

  // 🔹 Update field value
  updatedItems[index][name] = value;

  // 🔹 Auto-fill item details when item_name changes
  if (name === "item_name") {
    const selectedItem = itemsList.find(i => i.item_name === value);
    if (selectedItem) {
      updatedItems[index].style_number = selectedItem.style_number || "";
      updatedItems[index].sku_code = selectedItem.item_sku || "";
      updatedItems[index].item_id = selectedItem.item_id || null;
    }
  }

  // 🔹 Ensure GST value is numeric
  if (name === "gst_treatment") {
    updatedItems[index][name] = parseFloat(value) || 0;
  }

  // 🔹 Recalculate item amount when rate, qty, or gst_treatment changes
  if (["rate", "qty", "gst_treatment"].includes(name)) {
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const qty = parseFloat(updatedItems[index].qty) || 0;
    const gst = parseFloat(updatedItems[index].gst_treatment) || 0;

    const baseAmount = rate * qty;
    const totalWithGST = baseAmount + (baseAmount * gst / 100);

    updatedItems[index].amount = totalWithGST.toFixed(2);
  }

  // 🔹 Calculate subtotal (without GST)
  const subTotal = updatedItems.reduce(
    (sum, item) => sum + (parseFloat(item.rate) || 0) * (parseFloat(item.qty) || 0),
    0
  );

  // 🔹 Calculate total (including GST)
  const totalAmount = updatedItems.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  // 🔹 Update the formData with calculated totals
  setFormData({
    ...formData,
    items: updatedItems,
    sub_total: subTotal.toFixed(2),
    total_amount: totalAmount.toFixed(2),
  });
};




  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_name: "",
          style_number: "",
          sku_code: "",
          units_of_measure: "",
          rate: "",
          qty: "",
          apply_taxes: "",
          gst_treatment: "",
          amount: "",
          vendor_po_number: formData.vendor_po_no,
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("🧾 FormData sent to backend:", formData); 
      if (isUpdate && formData.vendor_po_id) {
        await axios.put(`${API_BASE}/vendorpos/${formData.vendor_po_id}`, formData);
      } else {
        await axios.post(`${API_BASE}/vendorpos`, formData);
      }
      alert(isUpdate ? "Vendor PO updated!" : "Vendor PO saved!");
      if (onVendorPOSaved) onVendorPOSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save Vendor PO");
    }
  };

  const inputClass = "p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 w-64";
  const labelClass = "block mb-1 text-sm font-medium text-gray-700";
  const fieldContainerClass = "flex flex-wrap gap-6 mb-4";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl p-6 mx-auto bg-white border border-gray-200 shadow-md">
        <h2 className="pb-2 mb-6 text-xl font-semibold text-gray-800 border-b">Vendor PO</h2>

        <form onSubmit={handleSubmit}>
          {/* Vendor PO Info */}
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Vendor PO Info</h3>
          <div className={fieldContainerClass}>
            {/* <div>
              <label className={labelClass}>Order Type</label>
              <input type="text" name="order_type" value={formData.order_type ?? ""} onChange={handleChange} className={inputClass} />
            </div> */}
            <div>
  <label className={labelClass}>Order Type</label>
  <select
    name="order_type"
    value={formData.order_type ?? ""}
    onChange={handleChange}
    className={inputClass}
  >
    <option value="">- Select Order Type -</option>
    <option value="Garmenting">Garmenting</option>
    <option value="Fabric Processing">Fabric Processing</option>
    <option value="FOB">FOB</option>
    <option value="Direct Purchase">Direct Purchase</option>
    <option value="Fabrics Purchase">Fabrics Purchase</option>
    <option value="Trims Purchase">Trims Purchase</option>
  </select>
</div>
            <div>
            
              <label className={labelClass}>Vendor Company</label>
              <select name="vendor_company_name" value={formData.vendor_company_name ?? ""} onChange={handleChange} className={inputClass}>
                <option value="">-Select Company-</option>
                {vendors.map((v, index) => (
                  <option key={v.vendor_id ?? index} value={v.company_name}>{v.company_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Vendor Name</label>
              <input type="text" name="vendor_name" value={formData.vendor_name ?? ""} readOnly className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Vendor Code</label>
              <input type="text" name="vendor_code" value={formData.vendor_code ?? ""} readOnly className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Primary Email ID</label>
              <input type="text" name="primary_email_id" value={formData.primary_email_id ?? ""} readOnly className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Vendor PO No.</label>
              <input type="text" name="vendor_po_no" value={formData.vendor_po_no ?? ""} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Payment Terms</label>
              <input type="text" name="payment_terms" value={formData.payment_terms ?? ""} onChange={handleChange} className={inputClass} />
            </div>
            {/* <div>
              <label className={labelClass}>Requested By</label>
              <input type="text" name="requested_by" value={formData.requested_by ?? ""} onChange={handleChange} className={inputClass} />
            </div> */}

            <div>
  <label className={labelClass}>Requested By</label>
  <select
    name="requested_by"
    value={formData.requested_by ?? ""}
    onChange={handleChange}
    className={inputClass}
  >
    <option value="">-Select Employee-</option>
    {employees.map(emp => (
      <option key={emp.id} value={emp.name}>
        {emp.name}
      </option>
    ))}
  </select>
</div>


          </div>

          {/* Buyer PO Info */}
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Buyer PO Information</h3>
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Select Buyer PO No.</label>
              <select name="buyer_po_number" value={formData.buyer_po_number ?? ""} onChange={handleChange} className={inputClass}>
                <option value="">-Select PO-</option>
                {systemPOs.map((po, index) => (
                  <option key={po.system_po_id ?? index} value={po.po_number}>{po.po_number}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Company Name</label>
              <input type="text" name="buyer_company_name" value={formData.buyer_company_name ?? ""} readOnly className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Purchase Order Date</label>
              <input type="date" name="purchase_order_date" value={formData.purchase_order_date ?? ""} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Expected Delivery Date</label>
              <input type="date" name="expected_delivery_date" value={formData.expected_delivery_date ?? ""} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Item Details */}
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Item Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border">Item Name</th>
                  <th className="px-2 py-2 border">Style Number</th>
                  <th className="px-2 py-2 border">SKU Code</th>
                  <th className="px-2 py-2 border">UOM</th>
                  <th className="px-2 py-2 border">Rate</th>
                  <th className="px-2 py-2 border">Qty</th>
                  <th className="px-2 py-2 border">Apply Taxes</th>
                  <th className="px-2 py-2 border">Taxes</th>
                  <th className="px-2 py-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    <td className="px-2 py-1 border">
                      <select name="item_name" value={item.item_name ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass}>
                        <option value="">-Select Item-</option>
                        {itemsList.map((i, index) => (
                          <option key={i.item_id ?? index} value={i.item_name}>{i.item_name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <input type="text" name="style_number" value={item.style_number ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td>
                    <td className="px-2 py-1 border">
                      <input type="text" name="sku_code" value={item.sku_code ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td>
                    {/* <td className="px-2 py-1 border">
                      <input type="text" name="units_of_measure" value={item.units_of_measure ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td> */}
                    <td className="px-2 py-1 border"> <select name="units_of_measure" value={item.units_of_measure ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} > <option value="">-Select UOM-</option> {uomOptions.map((uom) => ( <option key={uom} value={uom}> {uom}</option>))} </select> </td>
                    <td className="px-2 py-1 border">
                      <input type="number" name="rate" value={item.rate ?? 0} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td>
                    <td className="px-2 py-1 border">
                      <input type="number" name="qty" value={item.qty ?? 0} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td>
                    <td className="px-2 py-1 border">
                      <select name="apply_taxes" value={item.apply_taxes ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass}>
                        <option value="">-Select-</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="px-2 py-1 border">
                      <select
                        name="gst_treatment"
                        value={item.gst_treatment}
                        onChange={(e) => handleItemChange(idx, e)}
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
                      <input type="number" name="amount" value={item.amount ?? 0} readOnly className={inputClass} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={addItem} className="px-4 py-2 mt-4 font-semibold text-white bg-green-500 rounded hover:bg-green-600">+ Add New</button>

          {/* Additional Details */}
          <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-700">Additional Details</h3>
          <div className={fieldContainerClass}>
            <div>
              <label className={labelClass}>Sub Total</label>
              <input type="number" name="sub_total" value={formData.sub_total ?? 0} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Shipping Cost</label>
              <input type="number" name="shipping_cost" value={formData.shipping_cost ?? 0} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Discount</label>
              <input type="number" name="discount" value={formData.discount ?? 0} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Total Amount</label>
              <input type="number" name="total_amount" value={formData.total_amount ?? 0} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Terms & Conditions</label>
              <textarea name="terms_and_conditions" value={formData.terms_and_conditions ?? ""} onChange={handleChange} className={`${inputClass} h-20`} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex mt-6 space-x-4">
            <button type="submit" className={`px-4 py-2 font-semibold text-white rounded ${isUpdate ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}>
              {isUpdate ? "Update" : "Submit"}
            </button>
            <button type="button" onClick={() => setFormData({...formData})} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Reset</button>
            {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorPOForm;
