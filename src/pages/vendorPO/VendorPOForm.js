
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const VendorPOForm = ({ vendorPO, onVendorPOSaved, onCancel }) => {
  const [vendors, setVendors] = useState([]);
  const [systemPOs, setSystemPOs] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [buyerPOLineItems, setBuyerPOLineItems] = useState([]);
  const [costSheets, setCostSheets] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  

  const [formData, setFormData] = useState({
    vendor_id: "",
    order_type: "",
    sampling_type: "",
    sampling_purpose:"",
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
    items: [ ],
    sub_total: "",
    shipping_cost: "",
    discount: "",
    total_amount: "",
    terms_and_conditions: "",
    vendor_address:"",
  });

  const uomOptions = ["PCS", "KG", "MTR", "LITRE", "BOX"]; // add more if needed

  // this is for the payment terms dropdown
const [paymentTermsList, setPaymentTermsList] = useState([]);
const [newPaymentTermInput, setNewPaymentTermInput] = useState("");
const [paymentTermModalOpen, setPaymentTermModalOpen] = useState(false);
const [paymentTermLoading, setPaymentTermLoading] = useState(false);

//----------NEW USE-EFFECT-------------

useEffect(() => {
  axios.get(`${API_BASE}/buyer_po_line_items`)
    .then(res => setBuyerPOLineItems(res.data || []))
    .catch(() => {});
}, []);

useEffect(() => {
  axios.get(`${API_BASE}/costsheets`)
    .then(res => setCostSheets(res.data || []))
    .catch(() => {});
}, []);


//----------END USE EFFECT------------



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

  // Only fetch next VPO if this is a new PO
  if (!vendorPO) {
    fetchNextVPONumber();
  }
}, [vendorPO]);
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

// this is for the payment terms dropdown
useEffect(() => {
  const fetchPaymentTerms = async () => {
    setPaymentTermLoading(true); // ✅ mark as loading
    try {
      const res = await axios.get(`${API_BASE}/payment-terms`);
      setPaymentTermsList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching Payment Terms:", err);
    } finally {
      setPaymentTermLoading(false); // ✅ finished loading
    }
  };
  fetchPaymentTerms();
}, []);

//-------------------------

// ✅ Buyer PO filtered items (FOB only)
const filteredBuyerPOItems =
  (formData.order_type === "FOB" || formData.order_type==="Garmenting" || formData.order_type==="Fabric Processing" || formData.order_type==="Fabrics Purchase" || formData.order_type==="Trims Purchase" || formData.order_type==="Sampling") && formData.system_po_id
    ? buyerPOLineItems.filter(
        li => li.system_po_id === formData.system_po_id
      )
    : [];

    const filteredItemsForItemName =
    formData.order_type === "FOB"
      ? itemsList.filter(i => i.item_type === "Goods")
      : formData.order_type==="Fabric Processing"
      ? itemsList.filter(i=>i.item_type==="Service")
      : formData.order_type==="Fabrics Purchase"
      ? itemsList.filter(i=>i.item_type==="Fabrics")
      : formData.order_type==="Trims Purchase"
      ? itemsList.filter(i=>i.item_type==="Trims")
      : itemsList;
  


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
        vendor_address: selectedVendor?.billing_address || "",
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

    // ✅ 👉 ADD THIS BLOCK HERE
  if (name === "order_type") {
    setFormData(prev => ({
      ...prev,
      order_type: value,
      sampling_type: value === "Sampling" ? prev.sampling_type : "",
      sampling_purpose: value === "Sampling" ? prev.sampling_purpose : "" 
    }));
    return;
  }


    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleItemChange = (index, e) => {
  const { name, value } = e.target;
  const updatedItems = [...formData.items];

  // 🔹 Update field value
  updatedItems[index][name] = value;

  // 🔹 Auto-fill item details when item_name changes
  // 🔹 Auto-fill item details + rate when item_name changes
if (name === "item_name") {

/* 🔹 APPLY ITEM MASTER LOGIC ONLY FOR FOB */
if (formData.order_type === "FOB" || formData.order_type === "Sampling") {

  const masterItem = itemsList.find(
    i => i.item_name === value
  );

  if (!masterItem) {
    alert("Item not found in Item Master");
    updatedItems[index].item_name = "";
    updatedItems[index].item_id = null;
    return;
  }

  updatedItems[index].item_id = masterItem.item_id;
  updatedItems[index].style_number = masterItem.style_number || "";
  updatedItems[index].sku_code = masterItem.item_sku || "";
}

// ⬇️ keep your existing Buyer PO → Cost Sheet logic BELOW this
  
  // get buyer PO style for this row
  const selectedStyle = updatedItems[index].style_name_buyer_po;
 // if (!selectedStyle || !formData.system_po_id) return;

if (
  (formData.order_type === "FOB" ||
    formData.order_type === "Garmenting" ||
    formData.order_type === "Fabric Processing" ||
    formData.order_type === "Fabrics Purchase" ||
    formData.order_type === "Trims Purchase")
  &&
  (!selectedStyle || !formData.system_po_id)
) {
  return;
}


  // find buyer PO line item
  const lineItem = buyerPOLineItems.find(
    li =>
      li.style_number === selectedStyle &&
      li.system_po_id === formData.system_po_id
  );
  if (!lineItem) return;

  // ✅ Set style & sku from Buyer PO for non-FOB
if (formData.order_type !== "FOB" &&  formData.order_type !=="Sampling") {
  updatedItems[index].style_number = lineItem.style_number || "";
  updatedItems[index].sku_code = lineItem.sku_code || "";
}



  // ✅ ADD THIS LINE HERE
  const buyerQty = Number(lineItem.quantity || 0);

  // find cost sheet
  const costSheet = costSheets.find(
    cs => cs.cost_sheet_id === lineItem.cost_sheet_id
  );
  if (!costSheet) return;

  /* ================= FABRIC PROCESSING ================= */
  if (
    formData.order_type === "Fabric Processing" &&
    Array.isArray(costSheet.processing_details)
  ) {
    const row = costSheet.processing_details.find(
      p => p.process_name === value
    );
  
    if (row) {
      updatedItems[index].rate = row.rate || 0;
  
      // ✅ QTY = Buyer PO Qty × Construction
      const construction = Number(row.construction || 1);
      updatedItems[index].qty = buyerQty * construction;
    }
  }
  

  /* ================= FABRICS PURCHASE ================= */
  if (
    formData.order_type === "Fabrics Purchase" &&
    Array.isArray(costSheet.fabric_details)
  ) {
    const row = costSheet.fabric_details.find(
      f => f.fabric_name === value
    );
  
    if (row) {
      updatedItems[index].rate = row.rate || 0;
  
      const construction = Number(row.construction || 1);
      updatedItems[index].qty = buyerQty * construction;
    }
  }
  
  /* ================= TRIMS PURCHASE ================= */
  
  if (
    formData.order_type === "Trims Purchase" &&
    Array.isArray(costSheet.stores_or_grinderies_details)
  ) {
    const row = costSheet.stores_or_grinderies_details.find(
      t => t.stores_or_grinderis_name === value
    );
  
    if (row) {
      updatedItems[index].rate = row.rate || 0;
  
      const construction = Number(row.construction || 1);
      updatedItems[index].qty = buyerQty * construction;
    }
  }
  

}


//----------------NEW HANDLE ITEM CHANGE-------
if (
  name === "style_name_buyer_po" &&
  formData.system_po_id
) {
  const lineItem = buyerPOLineItems.find(
    li =>
      li.style_number === value &&
      li.system_po_id === formData.system_po_id
  );

  if (!lineItem) return;

  const costSheet = costSheets.find(
    cs => cs.cost_sheet_id === lineItem.cost_sheet_id
  );


  // ✅ Fabric Processing → store processing details INSIDE THIS ROW
if (formData.order_type === "Fabric Processing" && costSheet) {
  updatedItems[index].processing_details =
    Array.isArray(costSheet.processing_details)
      ? costSheet.processing_details
      : [];

  updatedItems[index].item_name = "";
  updatedItems[index].rate = 0;
}


// ✅ Fabrics Purchase → store fabric details INSIDE THIS ROW
if (formData.order_type === "Fabrics Purchase" && costSheet) {
  updatedItems[index].fabric_details =
    Array.isArray(costSheet.fabric_details)
      ? costSheet.fabric_details
      : [];

  updatedItems[index].item_name = "";
  updatedItems[index].rate = 0;
}

// ✅ Trims Purchase → store fabric details INSIDE THIS ROW
if(formData.order_type==="Trims Purchase" && costSheet) {
  updatedItems[index].stores_or_grinderies_details=
  Array.isArray(costSheet.stores_or_grinderies_details)
  ? costSheet.stores_or_grinderies_details
  : [];

  updatedItems[index].item_name="";
  updatedItems[index].rate=0;
}        


  
  // ❌ NON-FOB order using FOB cost sheet (THIS IS YOUR CASE)
  if (
    formData.order_type !== "FOB" &&
    formData.order_type !== "Sampling" &&  
    costSheet &&
    costSheet.order_type === "FOB"
  ) {
    alert("FOB cost sheet cannot be used for non-FOB orders");

    updatedItems[index].style_name_buyer_po = "";
    updatedItems[index].rate = 0;
    updatedItems[index].qty = 0;
    updatedItems[index].amount = 0;

    setFormData({ ...formData, items: updatedItems });
    return;
  }

  // ❌ FOB order but cost sheet is NOT FOB
  if (
    formData.order_type === "FOB" &&
    costSheet &&
    costSheet.order_type !== "FOB"
  ) {
    alert("Cost sheet is not for FOB order");

    updatedItems[index].style_name_buyer_po = "";
    updatedItems[index].rate = 0;
    updatedItems[index].qty = 0;
    updatedItems[index].amount = 0;

    setFormData({ ...formData, items: updatedItems });
    return;
  }

  
  // ✅ Valid FOB → auto-fill
  if (formData.order_type === "FOB"  && costSheet) {
    
    updatedItems[index].rate = costSheet.cost_price || 0;
    updatedItems[index].qty = lineItem.quantity || 0;
  }


// ✅ Valid Sampling → auto-fill
if (formData.order_type === "Sampling"  && costSheet) {
    
  updatedItems[index].rate = costSheet.cost_price || 0;
  updatedItems[index].qty = lineItem.quantity || 0;
}




  // ✅ GARMENTING → set CMT rate & buyer qty
if (
  formData.order_type === "Garmenting" &&
  costSheet &&
  Array.isArray(costSheet.labor_details)
) {
  const laborRow = costSheet.labor_details.find(
    l => l.labor === "CMT"
  );

  if (laborRow) {
    updatedItems[index].rate = laborRow.rate || 0;
    updatedItems[index].qty = lineItem.quantity || 0;
  }
}







}

  
//----------------NEW HANDLE ITEM CHANGE-------
if (name === "gst_treatment") {
  updatedItems[index][name] = parseFloat(value) || 0;
}

// 🔹 Recalculate item amount when any dependent field changes
if (["rate", "qty", "gst_treatment", "apply_taxes"].includes(name)) {
  const rate = parseFloat(updatedItems[index].rate) || 0;
  const qty = parseFloat(updatedItems[index].qty) || 0;
  const gst = parseFloat(updatedItems[index].gst_treatment) || 0;
  const applyTaxes = updatedItems[index].apply_taxes;

  const baseAmount = rate * qty;
  let finalAmount = baseAmount;

  // 🔹 If Apply Taxes = "No" → GST should be 0 & amount = base amount
  if (applyTaxes === "No") {
    updatedItems[index].gst_treatment = 0;
    finalAmount = baseAmount;
  } else {
    // 🔹 Normal GST calculation
    finalAmount = baseAmount + (baseAmount * gst / 100);
  }

  updatedItems[index].amount = finalAmount.toFixed(2);
}

// 🔹 Recalculate subtotal (without GST)
const subTotal = updatedItems.reduce(
  (sum, item) => sum + (parseFloat(item.rate) || 0) * (parseFloat(item.qty) || 0),
  0
);

// 🔹 Recalculate total (with GST or not)
const totalAmount = updatedItems.reduce(
  (sum, item) => sum + (parseFloat(item.amount) || 0),
  0
);

// 🔹 Update form data
setFormData({
  ...formData,
  items: updatedItems,
  sub_total: subTotal.toFixed(2),
  total_amount: totalAmount.toFixed(2),
});
};




const addItem = () => {
  const isGarmenting = formData.order_type === "Garmenting";

  const cmtItem = isGarmenting
    ? itemsList.find(i => i.item_id === 19)
    : null;

  setFormData(prev => ({
    ...prev,
    items: [
      ...prev.items,
      {
        item_name: cmtItem?.item_name || "",
        style_number: cmtItem?.style_number || "",
        sku_code: cmtItem?.item_sku || "",
        item_id: cmtItem?.item_id || null,
        style_name_buyer_po: "",
        units_of_measure: "",
        rate: "",
        qty: "",
        apply_taxes: "",
        gst_treatment: "",
        amount: "",
        vendor_po_number: prev.vendor_po_no,
      },
    ],
  }));
};


const removeItem = (index) => {
  const updatedItems = formData.items.filter((_, i) => i !== index);

  // 🔹 Recalculate subtotal
  const subTotal = updatedItems.reduce(
    (sum, item) =>
      sum +
      (parseFloat(item.rate) || 0) * (parseFloat(item.qty) || 0),
    0
  );

  // 🔹 Recalculate total
  const totalAmount = updatedItems.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  setFormData({
    ...formData,
    items: updatedItems,
    sub_total: subTotal.toFixed(2),
    total_amount: totalAmount.toFixed(2),
  });
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
    <option value="Testing - FPT/GPT etc.">Testing - FPT/GPT etc.</option>
    <option value="Fabrics Purchase">Fabrics Purchase</option>
    <option value="Trims Purchase">Trims Purchase</option>
    <option value="Sampling">Sampling</option>
  </select>
</div>


{/*-----Adding a New Field called Sampling Type-------*/}
{formData.order_type === "Sampling" && (
<div>
  <label className={labelClass}>Sampling Type</label>
  <select
    name="sampling_type"
    value={formData.sampling_type ?? ""}
    onChange={handleChange}
    className={inputClass}
  >
    <option value="">- Select Sampling Type -</option>
    <option value="Garmenting">Garmenting</option>
    <option value="Fabric Processing">Fabric Processing</option>
    <option value="Direct Purchase">Direct Purchase</option>
    <option value="Fabric Purchase">Fabric Purchase</option>
    <option value="Trim Purchase">Trim Purchase</option>
    <option value="Design Sampling">Design Sampling</option>
  </select>
</div>
)}

{/*-----Adding a New Field called Sampling Purpose-------*/}
{formData.order_type === "Sampling" && (
  <div>
    <label className={labelClass}>Sampling Purpose</label>
    <select
      name="sampling_purpose"
      value={formData.sampling_purpose ?? ""}
      onChange={handleChange}
      className={inputClass}
    >
      <option value="">- Select Sampling Purpose -</option>
      <option value="Order based Sampling">Order based Sampling</option>
      <option value="Lal10 Sampling Collection">Lal10 Sampling Collection</option>
      <option value="Sampling for Buyer (Not for Order)">Sampling for Buyer (Not for Order)</option>
      
    </select>
  </div>
)}

{/*-----Adding a New Field-------*/}


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
            {/* <div>
              <label className={labelClass}>Payment Terms</label>
              <input type="text" name="payment_terms" value={formData.payment_terms ?? ""} onChange={handleChange} className={inputClass} />
            </div> */}

            <div>
  <label className={labelClass}>Payment Terms</label>
  <select
  name="payment_terms"
  value={formData.payment_terms ?? ""}
  onChange={(e) => {
    if (e.target.value === "ADD_NEW") {
      setPaymentTermModalOpen(true);
      setFormData(prev => ({ ...prev, payment_terms: "" }));
    } else {
      setFormData(prev => ({ ...prev, payment_terms: e.target.value }));
    }
  }}
  disabled={paymentTermLoading} // ✅ disable while loading
  className={inputClass}
>
  {paymentTermLoading ? (
    <option>Loading...</option>
  ) : (
    <>
      <option value="">-Select Payment Term-</option>
      {paymentTermsList.map(pt => (
        <option key={pt.payment_term_id} value={pt.payment_term_name}>{pt.payment_term_name}</option>
      ))}
      <option value="ADD_NEW">+ Add New</option>
    </>
  )}
</select>
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


<div>
  <label className={labelClass}>Vendor Address</label>
  <textarea
    name="vendor_address"
    value={formData.vendor_address ?? ""}
    onChange={handleChange}
    className={`${inputClass} h-24`}
    placeholder="Enter vendor address"
  />
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
                  <th className="w-10 px-2 py-2 border"></th>
                  <th className="px-2 py-2 border">Buyer Style Name</th>
                  <th className="px-2 py-2 border">Item Name</th>
                  {(formData.order_type !=="Garmenting" && formData.order_type !=="Fabric Processing") && (<th className="px-2 py-2 border">Style Number</th> )}
                  {(formData.order_type !== "Garmenting" &&  formData.order_type!=="Fabric Processing") && (<th className="px-2 py-2 border">SKU Code</th> )}
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
                      <td className="px-2 py-1 text-center border">
  <button
    type="button"
    onClick={() => removeItem(idx)}
    className="font-bold text-red-600 hover:text-red-800"
    title="Remove row"
  >
    ✕
  </button>
</td>

<td className="px-2 py-1 border">
  

  <select
    name="style_name_buyer_po"
    value={item.style_name_buyer_po ?? ""}
    onChange={(e) => handleItemChange(idx, e)}
    className={inputClass}
    disabled={(formData.order_type === "FOB" || formData.order_type==="Garmenting" || formData.order_type==="Fabric Processing" || formData.order_type==="Fabrics Purchase" || formData.order_type==="Trims Purchase" || formData.order_type==="Sampling") && !formData.system_po_id}
  >
    <option value="">-Select Style-</option>
  
    {(formData.order_type === "FOB" || formData.order_type==="Garmenting" || formData.order_type==="Fabric Processing" || formData.order_type==="Fabrics Purchase" || formData.order_type==="Trims Purchase" || formData.order_type==="Sampling")
      ? filteredBuyerPOItems.map((li, index) => (
          <option key={li.line_item_id ?? index} value={li.style_number}>
            {li.style_number}
          </option>
        ))
      : itemsList.map((i, index) => (
          <option key={i.item_id ?? index} value={i.style_number}>
            {i.style_number}
          </option>
        ))}
  </select>
  
  
    
  </td>


                    <td className="px-2 py-1 border">
                      <select name="item_name" value={item.item_name ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass}>
                        <option value="">-Select Item-</option>
                        
                        {/* {filteredItemsForItemName.map((i, index) => (
                            <option key={i.item_id ?? index} value={i.item_name}>
                            {i.item_name}
                            </option>
                        ))} */}

{formData.order_type === "Fabric Processing" && item.processing_details
  ? item.processing_details.map((p, i) => (
      <option key={i} value={p.process_name}>
        {p.process_name}
      </option>
    ))
  : formData.order_type === "Fabrics Purchase" && item.fabric_details
  ? item.fabric_details.map((f, i) => (
      <option key={i} value={f.fabric_name}>
        {f.fabric_name}
      </option>
    ))
  : formData.order_type==="Trims Purchase" && item.stores_or_grinderies_details
  ? item.stores_or_grinderies_details.map((t,i) => (
      <option key={i} value={t.stores_or_grinderis_name}>
        {t.stores_or_grinderis_name}
      </option>
  ))
  : filteredItemsForItemName.map((i, index) => (
      <option key={i.item_id ?? index} value={i.item_name}>
        {i.item_name}
      </option>
    ))}



                      </select>
                    </td>
                    {(formData.order_type!=="Garmenting" && formData.order_type!=="Fabric Processing") && (
                    <td className="px-2 py-1 border">
                      <input type="text" name="style_number" value={item.style_number ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td> )}
                    {(formData.order_type!=="Garmenting" && formData.order_type!=="Fabric Processing") && (
                    <td className="px-2 py-1 border">
                      <input type="text" name="sku_code" value={item.sku_code ?? ""} onChange={e => handleItemChange(idx, e)} className={inputClass} />
                    </td> )}

              
                  
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
  value={item.gst_treatment || 0}   // ✅ force UI to show 0 when Apply Taxes = "No"
  onChange={(e) => handleItemChange(idx, e)}
  className={inputClass}
  disabled={item.apply_taxes === "No"}   // ✅ optional but recommended
>
  <option value={0}>0</option>   {/* ✅ Add 0 option for Apply Taxes = No */}
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

      {/* added payment term modal */}

      {paymentTermModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-6 bg-white rounded shadow-md w-96">
      <h3 className="mb-4 text-lg font-semibold">Add Payment Term</h3>
      <input
        type="text"
        value={newPaymentTermInput}
        onChange={e => setNewPaymentTermInput(e.target.value)}
        className={inputClass}
        placeholder="Enter new payment term"
      />
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPaymentTermModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={async () => {
            if (!newPaymentTermInput.trim()) return;

            try {
              const res = await axios.post(`${API_BASE}/payment-terms`, { payment_term_name: newPaymentTermInput });
              setPaymentTermsList(prev => [...prev, res.data]);
              setFormData(prev => ({ ...prev, payment_terms: res.data.payment_term_name }));
              setNewPaymentTermInput("");
              setPaymentTermModalOpen(false);
            } catch (err) {
              console.error("Failed to add payment term", err);
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default VendorPOForm;
