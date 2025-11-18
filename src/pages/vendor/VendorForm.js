
import React, { useState, useEffect } from "react";


const emptyForm = {
  vendorId: null,
  vendorFirstName: "",
  vendorLastName: "",
  companyName: "",
  vendorDisplayName: "",
  primaryContactEmail: "",
  primaryContactMobileNumber: "",
  gstType: "",
  primaryGstNo: "",
  billingAddress: "",
  billingStreet: "",
  billingCountry: "",
  billingCity: "",
  billingState: "",
  billingPinCode: "",
  billingPhone: "",
  shippingAddress: "",
  shippingStreet: "",
  shippingCountry: "",
  shippingCity: "",
  shippingState: "",
  shippingPinCode: "",
  shippingPhone: "",
  accountNumber: "",
  accountType: "",
  accountHolderName: "",
  branchAddress: "",
  bankName: "",
  ifscCode: "",
};

const VendorForm = ({ vendor, onVendorSaved, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (vendor) {
      setFormData({
        vendorId: vendor.vendorId || vendor.vendor_id || null,
        vendorFirstName: vendor.vendorFirstName || "",
        vendorLastName: vendor.vendorLastName || "",
        companyName: vendor.companyName || "",
        vendorDisplayName: vendor.vendorDisplayName || "",
        primaryContactEmail: vendor.primaryContactEmail || "",
        primaryContactMobileNumber: vendor.primaryContactMobileNumber || "",
        gstType: vendor.gstType || "",
        primaryGstNo: vendor.primaryGstNo || "",
        billingAddress: vendor.billingAddress || "",
        billingStreet: vendor.billingStreet || "",
        billingCountry: vendor.billingCountry || "",
        billingCity: vendor.billingCity || "",
        billingState: vendor.billingState || "",
        billingPinCode: vendor.billingPinCode || "",
        billingPhone: vendor.billingPhone || "",
        shippingAddress: vendor.shippingAddress || "",
        shippingStreet: vendor.shippingStreet || "",
        shippingCountry: vendor.shippingCountry || "",
        shippingCity: vendor.shippingCity || "",
        shippingState: vendor.shippingState || "",
        shippingPinCode: vendor.shippingPinCode || "",
        shippingPhone: vendor.shippingPhone || "",
        accountNumber: vendor.accountNumber || "",
        accountType: vendor.accountType || "",
        accountHolderName: vendor.accountHolderName || "",
        branchAddress: vendor.branchAddress || "",
        bankName: vendor.bankName || "",
        ifscCode: vendor.ifscCode || "",
      });
    } else {
      setFormData(emptyForm);
    }
    setSuccessMsg("");
    setError("");
  }, [vendor]);

// adding useEffect for state master

const [states, setStates] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/states", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => setStates(data))
    .catch(err => console.error("Failed to load states:", err));
}, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    const payload = {
      vendor_first_name: formData.vendorFirstName,
      vendor_last_name: formData.vendorLastName,
      company_name: formData.companyName,
      vendor_display_name: formData.vendorDisplayName,
      primary_contact_email: formData.primaryContactEmail,
      primary_contact_mobile_number: formData.primaryContactMobileNumber,
      gst_type: formData.gstType,
      primary_gst_no: formData.primaryGstNo,
      billing_address: formData.billingAddress,
      billing_street: formData.billingStreet,
      billing_country: formData.billingCountry,
      billing_city: formData.billingCity,
      billing_state: formData.billingState,
      billing_pin_code: formData.billingPinCode,
      billing_phone: formData.billingPhone,
      shipping_address: formData.shippingAddress,
      shipping_street: formData.shippingStreet,
      shipping_country: formData.shippingCountry,
      shipping_city: formData.shippingCity,
      shipping_state: formData.shippingState,
      shipping_pin_code: formData.shippingPinCode,
      shipping_phone: formData.shippingPhone,
      account_number: formData.accountNumber,
      account_type: formData.accountType,
      account_holder_name: formData.accountHolderName,
      branch_address: formData.branchAddress,
      bank_name: formData.bankName,
      ifsc_code: formData.ifscCode,
    };

    try {
      const method = formData.vendorId ? "PUT" : "POST";
      const url = formData.vendorId
        ? `http://localhost:4000/vendors/${formData.vendorId}`
        : "http://localhost:4000/vendors";

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to save vendor");

      // show popup
      alert(formData.vendorId ? "Vendor updated successfully!" : "Vendor created successfully!");


      // ✅ Show different success messages for create/update
      //setSuccessMsg(formData.vendorId ? "Vendor updated successfully!" : "Vendor created successfully!");

      onVendorSaved(data);

      if (!formData.vendorId) setFormData(emptyForm);
    } catch (err) {
      console.error("Vendor save error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold">{formData.vendorId ? "Edit Vendor" : "Add Vendor"}</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}

      {/* Basic Info
      <div className="grid grid-cols-3 gap-6">
        {[
          ["Vendor First Name", "vendorFirstName"],
          ["Vendor Last Name", "vendorLastName"],
          ["Company Name", "companyName"],
          ["Vendor Display Name", "vendorDisplayName"],
          ["Primary Contact Email", "primaryContactEmail"],
          ["Primary Contact Mobile", "primaryContactMobileNumber"],
          ["Primary GST No.", "primaryGstNo"],
        ].map(([label, name]) => (
          <div key={name} className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
            <input type="text" name={name} value={formData[name]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
          </div>
        ))}
      </div> */}

{/* Basic Info */}
<div className="grid grid-cols-3 gap-6">
  {[
    ["Vendor First Name", "vendorFirstName"],
    ["Vendor Last Name", "vendorLastName"],
    ["Company Name", "companyName"],
    ["Vendor Display Name", "vendorDisplayName"],
    ["Primary Contact Email", "primaryContactEmail"],
    ["Primary Contact Mobile", "primaryContactMobileNumber"],
    ["Primary GST No.", "primaryGstNo"],
    ["GST Type", "gstType"], // ✅ include GST Type here
  ].map(([label, name]) => (
    <div key={name} className="flex items-center">
      <label className="w-40 text-sm font-medium text-gray-700">{label}</label>

      {name === "gstType" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
        >
          <option value="">Select GST Type</option>
          <option value="Registered">Registered</option>
          <option value="Unregistered">Unregistered</option>
          <option value="Composition">Composition</option>
          <option value="Consumer">Consumer</option>
        </select>
      ) : (
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
        />
      )}
    </div>
  ))}
</div>


      {/* Additional Details */}
      <h3 className="mt-8 mb-4 text-xl font-semibold">Additional Details</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-start">
          <label className="w-40 mt-2 text-sm font-medium text-gray-700">Billing Address</label>
          <textarea name="billingAddress" value={formData.billingAddress} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" rows={4} />
        </div>
        <div className="flex items-start">
          <label className="w-40 mt-2 text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" rows={4} />
        </div>

        {/* {[
          ["Billing Street", "billingStreet"],
          ["Billing Country", "billingCountry"],
          ["Billing City", "billingCity"],
          ["Billing State", "billingState"],
          ["Billing Pin Code", "billingPinCode"],
          ["Billing Phone", "billingPhone"],
          ["Shipping Street", "shippingStreet"],
          ["Shipping Country", "shippingCountry"],
          ["Shipping City", "shippingCity"],
          ["Shipping State", "shippingState"],
          ["Shipping Pin Code", "shippingPinCode"],
          ["Shipping Phone", "shippingPhone"],
        ].map(([label, name]) => (
          <div key={name} className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
            <input type="text" name={name} value={formData[name]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
          </div>
        ))} */}
        {[
  ["Billing Street", "billingStreet"],
  ["Billing Country", "billingCountry"],
  ["Billing City", "billingCity"],
  ["Billing State", "billingState"],
  ["Billing Pin Code", "billingPinCode"],
  ["Billing Phone", "billingPhone"],
  ["Shipping Street", "shippingStreet"],
  ["Shipping Country", "shippingCountry"],
  ["Shipping City", "shippingCity"],
  ["Shipping State", "shippingState"],
  ["Shipping Pin Code", "shippingPinCode"],
  ["Shipping Phone", "shippingPhone"],
].map(([label, name]) => (
  <div key={name} className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">{label}</label>

    {/* ▓▓ IF field is billingState OR shippingState → show dropdown ▓▓ */}
    {(name === "billingState" || name === "shippingState") ? (
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.state_id} value={s.state_name}>
            {s.state_name}
          </option>
        ))}
      </select>
    ) : (
      // otherwise show normal text input
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
      />
    )}
  </div>
))}



      </div>

      {/* Bank Details */}
      <h3 className="mt-8 mb-4 text-xl font-semibold">Bank Details</h3>
      <div className="grid grid-cols-2 gap-6">
        {[
          ["Account Number", "accountNumber"],
          ["Account Type", "accountType"],
          ["Account Holder Name", "accountHolderName"],
          ["Bank Name", "bankName"],
          ["Branch Address", "branchAddress"],
          ["IFSC Code", "ifscCode"],
        ].map(([label, name]) => (
          <div key={name} className="flex items-center">
            <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
            <input type="text" name={name} value={formData[name]} onChange={handleChange} className="w-64 px-2 py-1 text-sm border border-gray-400 rounded" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center mt-8 space-x-4">
        <button type="button" onClick={() => { onCancel && onCancel(); setFormData(emptyForm); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          {loading ? "Saving..." : formData.vendorId ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
