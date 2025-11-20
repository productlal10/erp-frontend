import React, { useState, useEffect } from "react";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

// emptyForm moved outside to fix ESLint dependency warning
const emptyForm = {
  salutation: "",
  firstName: "",
  lastName: "",
  companyName: "",
  customerType: "",
  primaryEmail: "",
  customerDisplayName: "",
  paymentTerms: "",
  primaryMobile: "",
  type: "Company",
  userName: "",
  password: "",
  attachment: null,
  currency: "",
  brandPin: "",
  billingAddress: "",
  shippingAddress: "",
  country: "",
  country1: "",
  state_name: "",
  state_name1: "",
  city: "",
  city1: "",
  pinCode: "",
  pinCode1: "",
  gst_treatment: "",
  pan_no: "",
  gstin_no:"",
  tax_preference: "",
  accountNumber: "",
  accountHolderName: "",
  bankName: "",
  branchAddress: "",
  iFSCCode: "",
  place_of_supply:"",
};

const CustomerForm = ({ customer, onCustomerSaved }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [initialData, setInitialData] = useState(emptyForm); // store original
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const valueFromCustomer = (obj, ...keys) => {
    if (!obj) return "";
    for (const k of keys) {
      if (obj.hasOwnProperty(k) && obj[k] !== undefined && obj[k] !== null) {
        return obj[k];
      }
    }
    return "";
  };

  useEffect(() => {
    if (customer) {
      const loaded = {
        salutation: valueFromCustomer(customer, "salutation", "Salutation"),
        firstName: valueFromCustomer(customer, "firstName", "FirstName"),
        lastName: valueFromCustomer(customer, "lastName", "LastName"),
        companyName: valueFromCustomer(customer, "companyName", "CompanyName"),
        customerType: valueFromCustomer(customer, "customerType", "CustomerType"),
        primaryEmail: valueFromCustomer(customer, "primaryEmail", "PrimaryEmail"),
        customerDisplayName: valueFromCustomer(customer, "customerDisplayName", "CustomerDisplayName"),
        paymentTerms: valueFromCustomer(customer, "paymentTerms", "PaymentTerms"),
        primaryMobile: valueFromCustomer(customer, "primaryMobile", "PrimaryMobile"),
        type: valueFromCustomer(customer, "type", "Type") || "Company",
        userName: valueFromCustomer(customer, "userName", "UserName", "Username"),
        password: "",
        attachment: null,
        currency: valueFromCustomer(customer, "currency", "Currency"),
        brandPin: valueFromCustomer(customer, "brandPin", "BrandPin"),
        billingAddress: valueFromCustomer(customer, "billingAddress", "BillingAddress"),
        shippingAddress: valueFromCustomer(customer, "shippingAddress", "ShippingAddress"),
        country: valueFromCustomer(customer, "country", "Country"),
        country1: valueFromCustomer(customer, "country1", "Country1"),
        state_name: valueFromCustomer(customer, "state_name", "State_Name"),
        state_name1: valueFromCustomer(customer, "state_name1", "State_Name1"),
        city: valueFromCustomer(customer, "city", "City"),
        city1: valueFromCustomer(customer, "city1", "City1"),
        pinCode: valueFromCustomer(customer, "pinCode", "PinCode"),
        pinCode1: valueFromCustomer(customer, "pinCode1", "PinCode1"),
        gst_treatment: valueFromCustomer(customer, "gst_treatment", "GST_Treatment"),
        pan_no: valueFromCustomer(customer, "pan_no", "PAN_No"),
        gstin_no: valueFromCustomer(customer, "gstin_no", "gstin_No"), 
        tax_preference: valueFromCustomer(customer, "tax_preference", "Tax_Preference"),
        accountNumber: valueFromCustomer(customer, "accountNumber", "AccountNumber"),
        accountHolderName: valueFromCustomer(customer, "accountHolderName", "AccountHolderName"),
        bankName: valueFromCustomer(customer, "bankName", "BankName"),
        branchAddress: valueFromCustomer(customer, "branchAddress", "BranchAddress"),
        iFSCCode: valueFromCustomer(customer, "iFSCCode", "IFSCCode", "iFSCcODE"),
        place_of_supply:valueFromCustomer(customer,"place_of_supply","Place_of_Supply"),
      };
      setFormData(loaded);
      setInitialData(loaded); // save snapshot for reset
    } else {
      setFormData(emptyForm);
      setInitialData(emptyForm);
    }
  }, [customer]);

// adding this section for the state name

const [states, setStates] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/states", {
    credentials: "include",   // 🔥 VERY IMPORTANT
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch states");
      }
      return res.json();
    })
    .then(data => {
     // console.log("States fetched:", data);
      setStates(Array.isArray(data) ? data : []); // 🔒 prevents .map error
    })
    .catch(err => {
      console.error("State fetch error:", err);
    });
}, []);



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (files && files[0] ? files[0] : null) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = customer?.customer_id
        ? `http://localhost:4000/customers/${customer.customer_id}`
        : "http://localhost:4000/customers";

      const method = customer?.customer_id ? "PUT" : "POST";

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to save customer");

      alert(
        customer
          ? `Customer updated successfully!`
          : `Customer saved successfully!`
      );

      setFormData(emptyForm);
      setInitialData(emptyForm);
      onCustomerSaved && onCustomerSaved();
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...initialData }); // restore original data
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl">
      <h2 className="mb-6 text-2xl font-semibold">Customer Master</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Salutation */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Salutation</label>
          <select
            name="salutation"
            value={formData.salutation}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          >
            <option value="">-Select-</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>

        {/* First Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        {/* Last Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        {/* Company Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        {/* Customer Type */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Customer Type *</label>
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            required
          >
            <option value="">-Select-</option>
            <option value="Business">Business</option>
            <option value="Individual">Individual</option>
          </select>
        </div>

        {/* Primary Email */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Primary Email *</label>
          <input
            type="email"
            name="primaryEmail"
            value={formData.primaryEmail}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            required
          />
        </div>

        {/* Customer Display Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Customer Display Name *</label>
          <input
            type="text"
            name="customerDisplayName"
            value={formData.customerDisplayName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            required
          />
        </div>

        {/* Payment Terms */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Payment Terms</label>
          <select
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          >
            <option value="">-Select-</option>
            <option value="Net 30">Net 30</option>
            <option value="Net 60">Net 60</option>
            <option value="Advance">Advance</option>
          </select>
        </div>

        {/* Primary Mobile */}
        {/* <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Primary Mobile</label>
          <input
            type="tel"
            name="primaryMobile"
            value={formData.primaryMobile}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div> */}
        {/* Primary Contact Mobile No. */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Primary Contact Mobile No.</label>
  <div className="w-64">
    <PhoneInput
      country={'in'} // default country (India)
      value={formData.primaryMobile}
      onChange={(phone) =>
        setFormData((prev) => ({ ...prev, primaryMobile: phone }))
      }
      inputStyle={{
        width: '100%',
        fontSize: '14px',
        border: '1px solid #9ca3af',
        borderRadius: '4px',
        height: '32px',
      }}
      buttonStyle={{
        border: '1px solid #9ca3af',
        borderRight: 'none',
      }}
      dropdownStyle={{
        fontSize: '13px',
      }}
    />
  </div>
</div>

        {/* Type */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          >
            <option value="Company">Company</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership Firm">Partnership Firm</option>
          </select>
        </div>

        {/* User Name */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        {/* Password */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            placeholder={customer ? "Enter new password if you want to change" : ""}
          />
        </div>

        {/* Attachment */}
        <div className="flex items-center">
          <label className="w-64 text-sm font-medium text-gray-700">Attachment</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="w-48 px-1 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        {/* Currency */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          >
            <option value="">-Select-</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Brand Pin */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Brand Pin</label>
          <input
            type="text"
            name="brandPin"
            value={formData.brandPin}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>


      </div>

      {/* Additional Details */}
      <h3 className="mt-8 mb-4 text-xl font-semibold">Additional Details</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-start">
          <label className="w-40 mt-2 text-sm font-medium text-gray-700">Billing Address</label>
          <textarea
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            rows={4}
          />
        </div>
        <div className="flex items-start">
          <label className="w-40 mt-2 text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
            rows={4}
          />
        </div>

        {/* Country / City / Pin */}
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
{/*  adding this for the field state */}

  <div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Billing State</label>
  <select
    name="state_name"
    value={formData.state_name}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {states.map((s) => (
      <option key={s.state_code} value={s.state_name}>
        {s.state_name}
      </option>
    ))}
  </select>
</div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country1"
            value={formData.country1}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

{/* // adding this for the field state1 */}

<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Shipping State</label>
  <select
    name="state_name1"
    value={formData.state_name1}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  >
    <option value="">-Select-</option>
    {states.map((s) => (
      <option key={s.state_code} value={s.state_name}>
        {s.state_name}
      </option>
    ))}
  </select>
</div>


        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city1"
            value={formData.city1}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>

        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Pin Code</label>
          <input
            type="text"
            name="pinCode1"
            value={formData.pinCode1}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
      </div>

{/* GST INFORMATION */}
<h3 className="mt-8 mb-4 text-xl font-semibold">GST Information</h3>

<div className="grid grid-cols-2 gap-6">

  {/* GST Treatment */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">GST Treatment</label>
    <select
      name="gst_treatment"
      value={formData.gst_treatment}
      onChange={handleChange}
      className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
    >
      <option value="">-Select-</option>
      <option value="Registered Business - Regular">Registered Business - Regular</option>
      <option value="Registered Business - Composition">Registered Business - Composition</option>
      <option value="Unregistered Business">Unregistered Business</option>
      <option value="Consumer">Consumer</option>
      <option value="Overseas">Overseas</option>
      <option value="Special Economic Zone">Special Economic Zone</option>
    </select>
  </div>

  {/* PAN Number */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">PAN No</label>
    <input
      type="text"
      name="pan_no"
      value={formData.pan_no}
      onChange={handleChange}
      className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
    />
  </div>

  {/* Tax Preference */}
  <div className="flex items-center">
    <label className="w-40 text-sm font-medium text-gray-700">Tax Preference</label>
    <select
      name="tax_preference"
      value={formData.tax_preference}
      onChange={handleChange}
      className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
    >
      <option value="">-Select-</option>
      <option value="Taxable">Taxable</option>
      <option value="Non-Taxable">Non-Taxable</option>
      <option value="Exempt">Exempt</option>
    </select>
  </div>

{/* GSTIN Number */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">GSTIN No</label>
  <input
    type="text"
    name="gstin_no"
    value={formData.gstin_no}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
  />
</div>


{/* Place of Supply */}
<div className="flex items-center">
  <label className="w-40 text-sm font-medium text-gray-700">Place of Supply</label>
  <select
    name="place_of_supply"
    value={formData.place_of_supply}
    onChange={handleChange}
    className="w-64 px-2 py-1 text-sm border border-gray-400 rounded h-9"
  >
    <option value="">-Select-</option>
    {states.map((s) => (
      <option key={s.state_code} value={s.state_name}>
        {s.state_name}
      </option>
    ))}
  </select>
</div>







</div>


      {/* Bank Details */}
      <h3 className="mt-8 mb-4 text-xl font-semibold">Bank Details</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">Branch Address</label>
          <input
            type="text"
            name="branchAddress"
            value={formData.branchAddress}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="iFSCCode"
            value={formData.iFSCCode}
            onChange={handleChange}
            className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          />
        </div>
      </div>

      {/* Submit & Reset */}
      <div className="flex items-center mt-8 space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          {loading ? "Saving..." : customer ? "Update" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
        >
          Reset
        </button>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default CustomerForm;
