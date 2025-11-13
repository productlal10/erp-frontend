// src/CostSheetForm.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// const API_BASE = "http://localhost:4000";

// const emptyForm = {
//   cost_sheet_id: "",
//   cost_sheet_code: "",
//   order_type: "",
//   item_id: "",
//   style_number: "",
//   customer_id: "",
//   buyer_name: "",
//   category_name: "",
//   currency_master: "",
//   exchange_rate: "",
//   cost_price: "",
//   final_price: "",
//   gp: "",
//   total_gp: "",
// };

// const CostSheetForm = ({ editingCostSheet, onCostSheetSaved }) => {
//   const [items, setItems] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [formData, setFormData] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const currencyOptions = ["INR", "USD", "EUR", "GBP", "JPY", "CNY"];

//   // Fetch Items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/items`);
//         setItems(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching items:", err);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Fetch Customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/customers`);
//         setCustomers(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching customers:", err);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // Populate form if editing
//   useEffect(() => {
//     if (editingCostSheet) {
//       setFormData({
//         cost_sheet_id: editingCostSheet.cost_sheet_id,
//         cost_sheet_code: editingCostSheet.cost_sheet_code,
//         order_type: editingCostSheet.order_type || "",
//         item_id: editingCostSheet.item_id || "",
//         style_number: editingCostSheet.style_number || "",
//         customer_id: editingCostSheet.customer_id || "",
//         buyer_name: editingCostSheet.buyer_name || "",
//         category_name: editingCostSheet.category_name || "",
//         currency_master: editingCostSheet.currency_master || "",
//         exchange_rate: editingCostSheet.exchange_rate || "",
//         cost_price: editingCostSheet.cost_price || "",
//         final_price: editingCostSheet.final_price || "",
//         gp: editingCostSheet.gp || "",
//         total_gp: editingCostSheet.total_gp || "",
//       });
//     } else {
//       setFormData(emptyForm);
//     }
//   }, [editingCostSheet]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "style_number") {
//       const selectedItem = items.find((i) => i.style_number === value);
//       setFormData((prev) => ({
//         ...prev,
//         style_number: value,
//         item_id: selectedItem?.item_id || "",
//         category_name: selectedItem?.category_name || "",
//       }));
//     } else if (name === "buyer_name") {
//       const selectedCustomer = customers.find((c) => c.company_name === value);
//       setFormData((prev) => ({
//         ...prev,
//         buyer_name: value,
//         customer_id: selectedCustomer?.customer_id || "",
//       }));
//     } else if (name === "currency_master") {
//       setFormData((prev) => ({
//         ...prev,
//         currency_master: value,
//         exchange_rate: value === "INR" ? "1" : "",
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };
//   // STEP 3: Add the GP auto-calculation useEffect
//   useEffect(() => {
//     const cost = parseFloat(formData.cost_price) || 0;
//     const final = parseFloat(formData.final_price) || 0;

//     if (cost > 0 && final > 0) {
//       const totalGpValue = final - cost;
//       const gpValue = ((final - cost) / cost) * 100;

//       setFormData((prev) => ({
//         ...prev,
//         total_gp: totalGpValue.toFixed(2),
//         gp: gpValue.toFixed(2),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         total_gp: "",
//         gp: "",
//       }));
//     }
//   }, [formData.cost_price, formData.final_price]); // runs whenever cost_price or final_price changes



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.item_id || !formData.customer_id) {
//       return alert("Style Number and Buyer Name are required.");
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const submitData = { ...formData };
//       if (formData.cost_sheet_id) {
//         await axios.put(`${API_BASE}/costsheets/${formData.cost_sheet_id}`, submitData);
//         alert("Cost Sheet updated successfully!");
//       } else {
//         delete submitData.cost_sheet_id;
//         const res = await axios.post(`${API_BASE}/costsheets`, submitData);
//         alert("Cost Sheet saved successfully!");
//         setFormData({
//           ...emptyForm,
//           cost_sheet_id: res.data.cost_sheet_id,
//           cost_sheet_code: res.data.cost_sheet_code || "",
//         });
//       }

//       onCostSheetSaved();
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.error || "Failed to save cost sheet");
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
//       <h2 className="mb-8 text-2xl font-semibold">Cost Sheet</h2>

//       {/* Cost Sheet ID */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet ID:</label>
//         <input
//           type="text"
//           name="cost_sheet_id"
//           value={formData.cost_sheet_id}
//           readOnly
//           className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
//         />
//       </div>

//       {/* Cost Sheet Code */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet Code:</label>
//         <input
//           type="text"
//           name="cost_sheet_code"
//           value={formData.cost_sheet_code}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       {/* Order Type */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Order Type:</label>
//         <select
//           name="order_type"
//           value={formData.order_type}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         >
//           <option value="">Select Order Type</option>
//           <option value="FOB">FOB</option>
//           <option value="NOT FOB">NOT FOB</option>
//         </select>
//       </div>

//       {/* Style Number */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Style Number:</label>
//         <select
//           name="style_number"
//           value={formData.style_number}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         >
//           <option value="">Select Style</option>
//           {items.map((i) => (
//             <option key={i.item_id} value={i.style_number}>
//               {i.style_number}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Buyer Name */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Buyer Name:</label>
//         <select
//           name="buyer_name"
//           value={formData.buyer_name}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         >
//           <option value="">Select Buyer</option>
//           {customers.map((c) => (
//             <option key={c.customer_id} value={c.company_name}>
//               {c.company_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Category Name */}
//       <div className="flex items-center mb-8">
//         <label className="w-40 text-sm font-medium text-gray-700">Category Name:</label>
//         <input
//           type="text"
//           name="category_name"
//           value={formData.category_name}
//           readOnly
//           className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
//         />
//       </div>

//       {/* Cost Section */}
//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Currency:</label>
//         <select
//           name="currency_master"
//           value={formData.currency_master}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         >
//           <option value="">Select Currency</option>
//           {currencyOptions.map((cur) => (
//             <option key={cur} value={cur}>
//               {cur}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Exchange Rate:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="exchange_rate"
//           value={formData.exchange_rate}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Cost Price:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="cost_price"
//           value={formData.cost_price}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">Final Price:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="final_price"
//           value={formData.final_price}
//           onChange={handleChange}
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <label className="w-40 text-sm font-medium text-gray-700">GP:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="gp"
//           value={formData.gp}
//           readOnly
//           className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
//         />
//       </div>

//       <div className="flex items-center mb-8">
//         <label className="w-40 text-sm font-medium text-gray-700">Total GP:</label>
//         <input
//           type="number"
//           step="0.01"
//           name="total_gp"
//           value={formData.total_gp}
//           readOnly
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
//           {editingCostSheet && editingCostSheet.cost_sheet_id ? "Update" : "Submit"}
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

//export default CostSheetForm;

// src/CostSheetForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE = "http://localhost:4000";

const emptyForm = {
  cost_sheet_id: "",
  cost_sheet_code: "",
  order_type: "",
  item_id: "",
  style_number: "",
  customer_id: "",
  buyer_name: "",
  category_name: "",
  currency_master: "",
  exchange_rate: "",
  cost_price: "",
  final_price: "",
  gp: "",
  total_gp: "",
  fabric_details: [],
  processing_details: [],
  stores_or_grinderies_details: [],
  labor_details: [],
  total_cost_of_fabrics: "",
  total_cost_of_process: "",
  total_cost_of_stores: "",
  total_cost_of_labor: "",
};

const CostSheetForm = ({ editingCostSheet, onCostSheetSaved }) => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [fabricDetails, setFabricDetails] = useState([
    {
      fabric_name: "",
      item_name: "",
      type_of_fabric: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    },
  ]);
  const [processingDetails, setProcessingDetails] = useState([
    {
      process_name: "",
      item_name: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    }
  ]);
  const [storesOrGrinderiesDetails, setStoresOrGrinderiesDetails] = useState([
    {
      stores_or_grinderis_name: "",
      item_name: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    }
  ]);

  const [laborDetails, setLaborDetails] = useState([
    {
      labor: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    }
  ]);


  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currencyOptions = ["INR", "USD", "EUR", "GBP", "JPY", "CNY"];

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE}/items`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // Fetch Customers
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

  // Populate form if editing
  useEffect(() => {
    if (editingCostSheet) {
      setFormData({
        cost_sheet_id: editingCostSheet.cost_sheet_id,
        cost_sheet_code: editingCostSheet.cost_sheet_code,
        order_type: editingCostSheet.order_type || "",
        item_id: editingCostSheet.item_id || "",
        style_number: editingCostSheet.style_number || "",
        customer_id: editingCostSheet.customer_id || "",
        buyer_name: editingCostSheet.buyer_name || "",
        category_name: editingCostSheet.category_name || "",
        currency_master: editingCostSheet.currency_master || "",
        exchange_rate: editingCostSheet.exchange_rate || "",
        cost_price: editingCostSheet.cost_price || "",
        final_price: editingCostSheet.final_price || "",
        gp: editingCostSheet.gp || "",
        total_gp: editingCostSheet.total_gp || "",
        fabric_details: editingCostSheet.fabric_details || [],
        processing_details: editingCostSheet.processing_details || [],
        stores_or_grinderies_details: editingCostSheet.stores_or_grinderies_details || [],
        labor_details: editingCostSheet.labor_details || [],
        total_cost_of_fabrics: editingCostSheet.total_cost_of_fabrics || "",
        total_cost_of_process: editingCostSheet.total_cost_of_process || "",
        total_cost_of_stores: editingCostSheet.total_cost_of_stores || "",
        total_cost_of_labor: editingCostSheet.total_cost_of_labor || "",
      });
      setFabricDetails(
        editingCostSheet.fabric_details || [
          {
            fabric_name: "",
            item_name: "",
            type_of_fabric: "",
            construction: "",
            unit: "",
            rate: "",
            amount: "",
          },
        ]
      );
      setProcessingDetails(
        editingCostSheet.processing_details || [
          {
            process_name: "",
            item_name: "",
            construction: "",
            unit: "",
            rate: "",
            amount: "",
          },
        ]
      );
      setStoresOrGrinderiesDetails(
        editingCostSheet.stores_or_grinderies_details || [
          {
            stores_or_grinderis_name: "",
            item_name: "",
            construction: "",
            unit: "",
            rate: "",
            amount: "",
          },
        ]
      );
      setLaborDetails(
        editingCostSheet.labor_details || [
          {
            labor: "",
            construction: "",
            unit: "",
            rate: "",
            amount: "",
          },
        ]
      );
    } else {
      setFormData(emptyForm);
      setFabricDetails([
        {
          fabric_name: "",
          item_name: "",
          type_of_fabric: "",
          construction: "",
          unit: "",
          rate: "",
          amount: "",
        },
      ]);
      setProcessingDetails([
        {
          process_name: "",
          item_name: "",
          construction: "",
          unit: "",
          rate: "",
          amount: "",
        },
      ]);
      setStoresOrGrinderiesDetails([
        {
          stores_or_grinderis_name: "",
          item_name: "",
          construction: "",
          unit: "",
          rate: "",
          amount: "",
        },
      ]);
      setLaborDetails([
        {
          labor: "",
          construction: "",
          unit: "",
          rate: "",
          amount: "",
        },
      ]);
    }
  }, [editingCostSheet]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "style_number") {
      const selectedItem = items.find((i) => i.style_number === value);
      setFormData((prev) => ({
        ...prev,
        style_number: value,
        item_id: selectedItem?.item_id || "",
        category_name: selectedItem?.category_name || "",
      }));
    } else if (name === "buyer_name") {
      const selectedCustomer = customers.find(
        (c) => c.company_name === value
      );
      setFormData((prev) => ({
        ...prev,
        buyer_name: value,
        customer_id: selectedCustomer?.customer_id || "",
      }));
    } else if (name === "currency_master") {
      setFormData((prev) => ({
        ...prev,
        currency_master: value,
        exchange_rate: value === "INR" ? "1" : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // GP auto calculation
  useEffect(() => {
    const cost = parseFloat(formData.cost_price) || 0;
    const final = parseFloat(formData.final_price) || 0;

    if (cost > 0 && final > 0) {
      const totalGpValue = final - cost;
      const gpValue = ((final - cost) / cost) * 100;

      setFormData((prev) => ({
        ...prev,
        total_gp: totalGpValue.toFixed(2),
        gp: gpValue.toFixed(2),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        total_gp: "",
        gp: "",
      }));
    }
  }, [formData.cost_price, formData.final_price]);

// ✅ Auto-calculate Total Cost of Fabrics whenever fabricDetails changes
useEffect(() => {
  const total = fabricDetails.reduce((sum, row) => {
    return sum + (parseFloat(row.amount) || 0);
  }, 0);

  setFormData((prev) => ({
    ...prev,
    total_cost_of_fabrics: total.toFixed(2),
  }));
}, [fabricDetails]);

// ✅ Auto-calculate Total Cost of Process whenever processingDetails changes
useEffect(() => {
  const total = processingDetails.reduce((sum, row) => {
    return sum + (parseFloat(row.amount) || 0);
  }, 0);

  setFormData((prev) => ({
    ...prev,
    total_cost_of_process: total.toFixed(2),
  }));
}, [processingDetails]);


// ✅ Auto-calculate Total Cost of Stores/Grinderies whenever storesOrGrinderiesDetails changes
useEffect(() => {
  const total = storesOrGrinderiesDetails.reduce((sum, row) => {
    return sum + (parseFloat(row.amount) || 0);
  }, 0);

  setFormData((prev) => ({
    ...prev,
    total_cost_of_stores: total.toFixed(2),
  }));
}, [storesOrGrinderiesDetails]);


// ✅ Auto-calculate Total Cost of Labor whenever laborDetails changes
useEffect(() => {
  const total = laborDetails.reduce((sum, row) => {
    return sum + (parseFloat(row.amount) || 0);
  }, 0);

  setFormData((prev) => ({
    ...prev,
    total_cost_of_labor: total.toFixed(2),
  }));
}, [laborDetails]);

  // Fabric Handlers
  // const handleFabricChange = (index, field, value) => {
  //   const updated = [...fabricDetails];
  //   updated[index][field] = value;
  //   setFabricDetails(updated);
  // };

  const handleFabricChange = (index, field, value) => {
  const updated = [...fabricDetails];
  updated[index][field] = value;

  // Auto-fill item_name when fabric_name (style_number) is selected
  if (field === "fabric_name") {
    const selectedItem = items.find(i => i.style_number === value);
    if (selectedItem) {
      updated[index].item_name = selectedItem.item_name || "";
    } else {
      updated[index].item_name = "";
    }
  }

  // ✅ Auto-calculate amount = construction * rate
  const construction = parseFloat(updated[index].construction) || 0;
  const rate = parseFloat(updated[index].rate) || 0;
  updated[index].amount = (construction * rate).toFixed(2);


  setFabricDetails(updated);
};




  const handleProcessingChange = (index, field, value) => {
  const updated = [...processingDetails];
  updated[index][field] = value;
  
  //Auto -fill item_name when process_name (style_number) is selected
  if (field === "process_name") {
    const selectedItem = items.find(i => i.style_number === value);
    if (selectedItem) {
      updated[index].item_name = selectedItem.item_name || "";
    } else {
      updated[index].item_name = "";
    }
  }

  // ✅ Auto-calculate amount = construction * rate
  const construction = parseFloat(updated[index].construction) || 0;
  const rate = parseFloat(updated[index].rate) || 0;
  updated[index].amount = (construction * rate).toFixed(2);

  setProcessingDetails(updated);
};

  const handleStoresOrGrinderiesChange = (index, field, value) => {
  const updated = [...storesOrGrinderiesDetails];
  updated[index][field] = value;
  // Auto-fill item_name when stores_or_grinderis_name (style_number) is selected
  if (field === "stores_or_grinderis_name") {
    const selectedItem = items.find(i => i.style_number === value);
    if (selectedItem) {
      updated[index].item_name = selectedItem.item_name || "";
    } else {
      updated[index].item_name = "";
    }
  }
  // ✅ Auto-calculate amount = construction * rate
  const construction = parseFloat(updated[index].construction) || 0;
  const rate = parseFloat(updated[index].rate) || 0;
  updated[index].amount = (construction * rate).toFixed(2);
  setStoresOrGrinderiesDetails(updated);
}

  const handleLaborChange = (index, field, value) => {
    const updated = [...laborDetails];
    updated[index][field] = value;
    
    // ✅ Auto-calculate amount = construction * rate
    const construction = parseFloat(updated[index].construction) || 0;
    const rate = parseFloat(updated[index].rate) || 0;
    updated[index].amount = (construction * rate).toFixed(2);

    setLaborDetails(updated);
  }
  
  const addFabricRow = () => {
    setFabricDetails([
      ...fabricDetails,
      {
        fabric_name: "",
        item_name: "",
        type_of_fabric: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
  };


  const removeFabricRow = (index) => {
  const updated = fabricDetails.filter((_, i) => i !== index);
  setFabricDetails(updated);
};

  const addProcessingRow = () => {
  setProcessingDetails([
    ...processingDetails,
    {
      process_name: "",
      item_name: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    },
  ]);
};

const removeProcessingRow = (index) => {
  const updated = [...processingDetails];
  updated.splice(index, 1);
  setProcessingDetails(updated);
};


  const addStoresOrGrinderiesRow = () => {
  setStoresOrGrinderiesDetails([
    ...storesOrGrinderiesDetails,
    {
      stores_or_grinderis_name: "",
      item_name: "",
      construction: "",
      unit: "",
      rate: "",
      amount: "",
    },
  ]);
};

const removeStoresOrGrinderiesRow = (index) => {
  const updated = [...storesOrGrinderiesDetails];
  updated.splice(index, 1);
  setStoresOrGrinderiesDetails(updated);
};

  const addLaborRow = () => {
    setLaborDetails([
      ...laborDetails,
      {
        labor: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
  }

  const removeLaborRow = (index) => {
  const updated = [...laborDetails];
  updated.splice(index, 1);
  setLaborDetails(updated);
};

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.item_id || !formData.customer_id) {
      return alert("Style Number and Buyer Name are required.");
    }

    try {
      setLoading(true);
      setError("");

      const submitData = { ...formData, fabric_details: fabricDetails, processing_details: processingDetails, stores_or_grinderies_details: storesOrGrinderiesDetails, labor_details: laborDetails };

      if (formData.cost_sheet_id) {
        await axios.put(
          `${API_BASE}/costsheets/${formData.cost_sheet_id}`,
          submitData
        );
        alert("Cost Sheet updated successfully!");
      } else {
        delete submitData.cost_sheet_id;
        const res = await axios.post(`${API_BASE}/costsheets`, submitData);
        alert("Cost Sheet saved successfully!");
        setFormData({
          ...emptyForm,
          cost_sheet_id: res.data.cost_sheet_id,
          cost_sheet_code: res.data.cost_sheet_code || "",
        });
      }

      onCostSheetSaved();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to save cost sheet");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setFabricDetails([
      {
        fabric_name: "",
        item_name: "",
        type_of_fabric: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
    setProcessingDetails([
      {
        process_name: "",
        item_name: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
    setStoresOrGrinderiesDetails([
      {
        stores_or_grinderis_name: "",
        item_name: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
    setLaborDetails([
      {
        labor: "",
        construction: "",
        unit: "",
        rate: "",
        amount: "",
      },
    ]);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl">
      <h2 className="mb-8 text-2xl font-semibold">Cost Sheet</h2>

      {/* Existing fields remain unchanged above */}
      {/* Cost Sheet ID */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet ID:</label>
        <input
          type="text"
          name="cost_sheet_id"
          value={formData.cost_sheet_id}
          readOnly
          className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
        />
      </div>

      {/* Cost Sheet Code */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Sheet Code:</label>
        <input
          type="text"
          name="cost_sheet_code"
          value={formData.cost_sheet_code}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      {/* Order Type */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Order Type:</label>
        <select
          name="order_type"
          value={formData.order_type}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Order Type</option>
          <option value="FOB">FOB</option>
          <option value="NOT FOB">NOT FOB</option>
        </select>
      </div>

      {/* Style Number */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Style Number:</label>
        <select
          name="style_number"
          value={formData.style_number}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Style</option>
          {items.map((i) => (
            <option key={i.item_id} value={i.style_number}>
              {i.style_number}
            </option>
          ))}
        </select>
      </div>

      {/* Buyer Name */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Buyer Name:</label>
        <select
          name="buyer_name"
          value={formData.buyer_name}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Buyer</option>
          {customers.map((c) => (
            <option key={c.customer_id} value={c.company_name}>
              {c.company_name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Name */}
      <div className="flex items-center mb-8">
        <label className="w-40 text-sm font-medium text-gray-700">Category Name:</label>
        <input
          type="text"
          name="category_name"
          value={formData.category_name}
          readOnly
          className="w-64 px-2 py-2 text-sm bg-gray-100 border border-gray-400 rounded"
        />
      </div>

      {/* Cost Section */}
      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Currency:</label>
        <select
          name="currency_master"
          value={formData.currency_master}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Currency</option>
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Exchange Rate:</label>
        <input
          type="number"
          step="0.01"
          name="exchange_rate"
          value={formData.exchange_rate}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Cost Price:</label>
        <input
          type="number"
          step="0.01"
          name="cost_price"
          value={formData.cost_price}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">Final Price:</label>
        <input
          type="number"
          step="0.01"
          name="final_price"
          value={formData.final_price}
          onChange={handleChange}
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-4">
        <label className="w-40 text-sm font-medium text-gray-700">GP:</label>
        <input
          type="number"
          step="0.01"
          name="gp"
          value={formData.gp}
          readOnly
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      <div className="flex items-center mb-8">
        <label className="w-40 text-sm font-medium text-gray-700">Total GP:</label>
        <input
          type="number"
          step="0.01"
          name="total_gp"
          value={formData.total_gp}
          readOnly
          className="w-64 px-2 py-2 text-sm border border-gray-400 rounded"
        />
      </div>

      {/* Only show if order_type is "NOT FOB" */}
{formData.order_type === "NOT FOB" && (
  <>

      {/* === Fabrics Table === */}
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        Fabric Details
      </h3>

      <div className="overflow-x-auto border border-gray-300 rounded-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Fabric Name
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Item Name
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Type of Fabric
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Construction
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Unit
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Rate
              </th>
              <th className="px-4 py-2 font-semibold text-left text-gray-700">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {fabricDetails.map((fabric, index) => (
              <tr key={index} className="border-b">

              <td className="px-4 py-2">
                <select
                value={fabric.fabric_name}
                onChange={(e) =>
                handleFabricChange(index, "fabric_name", e.target.value)
                  }
                className="w-full px-2 py-1 border border-gray-400 rounded"
                >
              <option value="">Select Style Number</option>
              {items.map((i) => (
              <option key={i.item_id} value={i.style_number}>
              {i.style_number}
              </option>
              ))}
              </select>
              </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={fabric.item_name}
                    onChange={(e) =>
                      handleFabricChange(index, "item_name", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
  <select
    value={fabric.type_of_fabric}
    onChange={(e) =>
      handleFabricChange(index, "type_of_fabric", e.target.value)
    }
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Fabric Type</option>
    <option value="Shell Fabric">Shell Fabric</option>
    <option value="Lining Fabric">Lining Fabric</option>
    <option value="Trim Fabric">Trim Fabric</option>
    {/* Add more options as needed */}
  </select>
</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="0.01"
                    value={fabric.construction}
                    onChange={(e) =>
                      handleFabricChange(index, "construction", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
  <select
    value={fabric.unit}
    onChange={(e) => handleFabricChange(index, "unit", e.target.value)}
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Unit</option>
    <option value="Box">Box</option>
    <option value="Pcs">Pcs</option>
    <option value="Cm">Cm</option>
    <option value="Dz">Dz</option>
    <option value="Ft">Ft</option>
    <option value="G">G</option>
    <option value="In">In</option>
    <option value="Kg">Kg</option>
    <option value="Km">Km</option>
    <option value="Lb">Lb</option>
    <option value="Mg">Mg</option>
    <option value="Ml">Ml</option>
    <option value="M">M</option>
  </select>
</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={fabric.rate}
                    onChange={(e) =>
                      handleFabricChange(index, "rate", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={fabric.amount}
                    onChange={(e) =>
                      handleFabricChange(index, "amount", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
   {/* Adding remove row button */}
      {/* ✅ Remove Row Button */}
    <td className="px-2 py-1 text-center">
  <button
    type="button"
    onClick={() => removeFabricRow(index)}
    className="text-sm font-semibold text-red-500 hover:text-red-700"
    title="Remove Row"
  >
    ❌
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addFabricRow}
        className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        + Add New
      </button>

      <div className="mt-3 text-right">
  <label className="mr-2 font-semibold">Total Cost of Fabrics:</label>
  <input
    type="text"
    value={formData.total_cost_of_fabrics}
    readOnly
    className="w-40 px-2 py-1 text-right bg-gray-100 border rounded"
  />
</div>

      <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">
  Processing Details
</h3>

<div className="overflow-x-auto border border-gray-300 rounded-md">
  <table className="min-w-full border-collapse">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Process Name</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Item Name</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Construction</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Unit</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Rate</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Amount</th>
      </tr>
    </thead>
    <tbody>
      {processingDetails.map((process, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2">
            <select
            value={process.process_name}
            onChange={(e) =>
            handleProcessingChange(index, "process_name", e.target.value)
          }
          className="w-full px-2 py-1 border border-gray-400 rounded"
          >
        <option value="">Select Style Number</option>
        {items.map((i) => (
        <option key={i.item_id} value={i.style_number}>
        {i.style_number}
        </option>
        ))}
        </select>
        </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={process.item_name}
              onChange={(e) =>
                handleProcessingChange(index, "item_name", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={process.construction}
              onChange={(e) =>
                handleProcessingChange(index, "construction", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
  <select
    value={process.unit}
    onChange={(e) => handleProcessingChange(index, "unit", e.target.value)}
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Unit</option>
    <option value="Box">Box</option>
    <option value="Pcs">Pcs</option>
    <option value="Cm">Cm</option>
    <option value="Dz">Dz</option>
    <option value="Ft">Ft</option>
    <option value="G">G</option>
    <option value="In">In</option>
    <option value="Kg">Kg</option>
    <option value="Km">Km</option>
    <option value="Lb">Lb</option>
    <option value="Mg">Mg</option>
    <option value="Ml">Ml</option>
    <option value="M">M</option>
  </select>
</td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={process.rate}
              onChange={(e) =>
                handleProcessingChange(index, "rate", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={process.amount}
              onChange={(e) =>
                handleProcessingChange(index, "amount", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>

          <td className="px-2 py-1 text-center">
  <button
    type="button"
    onClick={() => removeProcessingRow(index)}
    className="text-sm text-red-500 hover:text-red-700"
    title="Remove Row"
  >
    ❌
  </button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<button
  type="button"
  onClick={addProcessingRow}
  className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
>
  + Add New
</button>

<div className="mt-3 text-right">
  <label className="mr-2 font-semibold">Total Cost of Process:</label>
  <input
    type="text"
    value={formData.total_cost_of_process}
    readOnly
    className="w-40 px-2 py-1 text-right bg-gray-100 border rounded"
  />
</div>

<h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">
  Stores / Grinderies Details
</h3>

<div className="overflow-x-auto border border-gray-300 rounded-md">
  <table className="min-w-full border-collapse">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Store / Grinder Name</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Item Name</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Construction</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Unit</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Rate</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Amount</th>
      </tr>
    </thead>
    <tbody>
      {storesOrGrinderiesDetails.map((store, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2">
          <select
            value={store.stores_or_grinderis_name}
            onChange={(e) =>
            handleStoresOrGrinderiesChange(index, "stores_or_grinderis_name", e.target.value)
          }
        className="w-full px-2 py-1 border border-gray-400 rounded"
        >
      <option value="">Select Style Number</option>
      {items.map((i) => (
      <option key={i.item_id} value={i.style_number}>
        {i.style_number}
      </option>
      ))}
    </select>
    </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={store.item_name}
              onChange={(e) =>
                handleStoresOrGrinderiesChange(index, "item_name", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={store.construction}
              onChange={(e) =>
                handleStoresOrGrinderiesChange(index, "construction", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
  <select
    value={store.unit}
    onChange={(e) =>
      handleStoresOrGrinderiesChange(index, "unit", e.target.value)
    }
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Unit</option>
    <option value="Box">Box</option>
    <option value="Pcs">Pcs</option>
    <option value="Cm">Cm</option>
    <option value="Dz">Dz</option>
    <option value="Ft">Ft</option>
    <option value="G">G</option>
    <option value="In">In</option>
    <option value="Kg">Kg</option>
    <option value="Km">Km</option>
    <option value="Lb">Lb</option>
    <option value="Mg">Mg</option>
    <option value="Ml">Ml</option>
    <option value="M">M</option>
  </select>
</td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={store.rate}
              onChange={(e) =>
                handleStoresOrGrinderiesChange(index, "rate", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={store.amount}
              onChange={(e) =>
                handleStoresOrGrinderiesChange(index, "amount", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
            />
          </td>

          <td className="px-2 py-1 text-center">
  <button
    type="button"
    onClick={() => removeStoresOrGrinderiesRow(index)}
    className="text-sm text-red-500 hover:text-red-700"
    title="Remove Row"
  >
    ❌
  </button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<button
  type="button"
  onClick={addStoresOrGrinderiesRow}
  className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
>
  + Add New
</button>

<div className="mt-3 text-right">
  <label className="mr-2 font-semibold">Total Cost of Stores/Grinderies:</label>
  <input
    type="text"
    value={formData.total_cost_of_stores}
    readOnly
    className="w-40 px-2 py-1 text-right bg-gray-100 border rounded"
  />
</div>

<h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">
  Labor Details
</h3>

<div className="overflow-x-auto border border-gray-300 rounded-md">
  <table className="min-w-full border-collapse">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Labor</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Construction</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Unit</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Rate</th>
        <th className="px-4 py-2 font-semibold text-left text-gray-700">Amount</th>
      </tr>
    </thead>
    <tbody>
      {laborDetails.map((labor, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2">
  <select
    value={labor.labor}
    onChange={(e) => handleLaborChange(index, "labor", e.target.value)}
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Labor Type</option>
    <option value="CMT">CMT</option>
    <option value="Cutting">Cutting</option>
    <option value="Stitching">Stitching</option>
    <option value="Finishing">Finishing</option>
    <option value="Other Cost">Other Cost</option>
    <option value="Packing">Packing</option>
  </select>
</td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={labor.construction}
              onChange={(e) => handleLaborChange(index, "construction", e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
  <select
    value={labor.unit}
    onChange={(e) => handleLaborChange(index, "unit", e.target.value)}
    className="w-full px-2 py-1 border border-gray-400 rounded"
  >
    <option value="">Select Unit</option>
    <option value="Box">Box</option>
    <option value="Pcs">Pcs</option>
    <option value="Cm">Cm</option>
    <option value="Dz">Dz</option>
    <option value="Ft">Ft</option>
    <option value="G">G</option>
    <option value="In">In</option>
    <option value="Kg">Kg</option>
    <option value="Km">Km</option>
    <option value="Lb">Lb</option>
    <option value="Mg">Mg</option>
    <option value="Ml">Ml</option>
    <option value="M">M</option>
  </select>
</td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={labor.rate}
              onChange={(e) => handleLaborChange(index, "rate", e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              step="0.01"
              value={labor.amount}
              onChange={(e) => handleLaborChange(index, "amount", e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
          </td>
          <td className="px-2 py-1 text-center">
      <button
        type="button"
        onClick={() => removeLaborRow(index)}
        className="text-sm text-red-500 hover:text-red-700"
        title="Remove Row"
      >
        ❌
      </button>
    </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<button
  type="button"
  onClick={addLaborRow}
  className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
>
  + Add Labor
</button>
<div className="mt-3 text-right">
  <label className="mr-2 font-semibold">Total Cost of Labor:</label>
  <input
    type="text"
    value={formData.total_cost_of_labor}
    readOnly
    className="w-40 px-2 py-1 text-right bg-gray-100 border rounded"
  />
</div>
</>
)}




      {/* Submit Section */}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {editingCostSheet && editingCostSheet.cost_sheet_id
            ? "Update"
            : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default CostSheetForm;