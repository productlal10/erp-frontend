
import React, { useState, useEffect } from "react";

const CustomerList = ({ refreshList, onEdit, onDelete }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/customers", {
        method: "GET",
        credentials: "include", // ✅ include session cookie
      });

      if (!response.ok) throw new Error("Failed to fetch customers");

      const data = await response.json();

      const normalized = (data || []).map((cust) => ({
        customer_id: cust.customer_id,
        customer_code: cust.customer_code,
        salutation: cust.salutation,
        firstName: cust.first_name,
        lastName: cust.last_name,
        companyName: cust.company_name,
        type: cust.type,
        customerDisplayName: cust.display_name,
        primaryEmail: cust.email,
        primaryMobile: cust.phone,
        paymentTerms: cust.payment_terms,
        currency: cust.currency,
        accountNumber: cust.account_number,
        bankName: cust.bank_name,
        city: cust.billing_city,
        country: cust.billing_country,
        pinCode: cust.billing_pincode,
        billingAddress: cust.billing_address,
        shippingAddress: cust.shipping_address,
      }));

      setCustomers(normalized);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(err.message);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshList]);

  const handleEdit = async (customerId) => {
    try {
      // if Add button clicked → open empty form
      if (!customerId) {
        if (onEdit) onEdit(null);
        return;
      }

      const resp = await fetch(`http://localhost:4000/customers/${customerId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!resp.ok) throw new Error("Failed to fetch customer details");

      const fullCustomer = await resp.json();
      if (onEdit) onEdit(fullCustomer); // send full record to CustomerForm
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  };

  const handleDelete = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:4000/customers/${customerId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete customer");

      if (onDelete) onDelete();
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        {/* 🔹 Header with Add Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Customer List</h3>
          {/* <button
            onClick={() => handleEdit(null)} // opens empty form
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            + Add
          </button> */}

        </div>

        {customers.length === 0 ? (
          <p className="p-6 text-gray-500">No customers found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer Code</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Salutation</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">First Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Last Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Company Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Display Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Mobile</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">City</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Country</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Pincode</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Payment Terms</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Currency</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account #</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Bank Name</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>

                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((cust) => (
                <tr key={cust.customer_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.customer_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.customer_code}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.salutation}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.firstName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.lastName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.companyName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.type}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.primaryEmail}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.customerDisplayName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.primaryMobile}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.city}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.country}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.pinCode}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.paymentTerms}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.currency}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.accountNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{cust.bankName}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(cust.customer_id)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cust.customer_id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
