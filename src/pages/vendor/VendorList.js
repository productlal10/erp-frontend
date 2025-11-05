import React, { useState, useEffect } from "react";

const VendorList = ({ refreshList, onEdit, onDelete }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/vendors", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch vendors");

      const data = await response.json();

      // ✅ Keep vendor_id for proper editing
      const normalized = (data || []).map((v) => ({
        id: v.vendor_id,  
        vendor_id: v.vendor_id,
        vendorFirstName: v.vendor_first_name,
        vendorLastName: v.vendor_last_name,
        companyName: v.company_name,
        vendorDisplayName: v.vendor_display_name,
        primaryContactEmail: v.primary_contact_email,
        primaryContactMobile: v.primary_contact_mobile_number,
        gstType: v.gst_type,
        primaryGstNo: v.primary_gst_no,
        billingAddress: v.billing_address,
        shippingAddress: v.shipping_address,
        accountNumber: v.account_number,
        accountHolderName: v.account_holder_name,
        bankName: v.bank_name,
        branchAddress: v.branch_address,
        ifscCode: v.ifsc_code,
      }));

      setVendors(normalized);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setError(err.message);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [refreshList]);

  const handleEdit = async (vendorId) => {
    try {
      if (!vendorId) {
        if (onEdit) onEdit(null);
        return;
      }

      const resp = await fetch(`http://localhost:4000/vendors/${vendorId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!resp.ok) throw new Error("Failed to fetch vendor details");

      const fullVendor = await resp.json();

      if (onEdit) onEdit(fullVendor);
    } catch (err) {
      console.error("Error fetching vendor:", err);
    }
  };

  const handleDelete = async (vendorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      const response = await fetch(`http://localhost:4000/vendors/${vendorId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete vendor");
      if (onDelete) onDelete();
      fetchVendors();
    } catch (err) {
      console.error("Error deleting vendor:", err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">Vendor List</h3>
          {/* <button
            onClick={() => handleEdit(null)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            + Add
          </button> */}
        </div>
        {vendors.length === 0 ? (
          <p className="p-6 text-gray-500">No vendors found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">First Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Last Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Company Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Display Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Mobile</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">GST Type</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">GST No.</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Billing Address</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Shipping Address</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account #</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account Holder</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Bank Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Branch</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">IFSC</th>
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((v) => (
                <tr key={v.vendor_id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.vendor_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.vendorFirstName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.vendorLastName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.companyName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.vendorDisplayName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.primaryContactEmail}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.primaryContactMobile}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.gstType}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.primaryGstNo}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.billingAddress}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.shippingAddress}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.accountNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.accountHolderName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.bankName}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.branchAddress}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{v.ifscCode}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(v.vendor_id)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(v.vendor_id)}
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

export default VendorList;
