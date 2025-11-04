import React, { useState, useEffect } from "react";
import axios from "axios";

// Enable cookies if needed
axios.defaults.withCredentials = true;

const API_BASE = "http://localhost:4000";

//ADDED ACCESS HERE

const EmployeeForm = ({ onEmployeeSaved, employee, access }) => {

  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    employeeid: "",
    role: "",
    name: "",
    email: "",
    department: "",
    username: "",
    password: "",
    reportingTo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch roles from /role-permissions endpoint
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/role-permissions`);
        const data = Array.isArray(res.data) ? res.data : [];
        setRoles(data.map((r) => ({ role: r.role, access: r.access })));
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError(err?.response?.data?.message || "Failed to fetch roles");
      }
    };
    fetchRoles();
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeid: employee.employeeid || "",
        role: employee.role || "",
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        username: employee.username || "",
        password: "",
        reportingTo: employee.reportingto || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.role) return alert("Name and Role are required.");

  //   try {
  //     setLoading(true);
  //     setError("");

  //     if (employee) {
  //       // Update employee
  //       await axios.put(`${API_BASE}/employees/${formData.employeeid}`, formData);
  //       alert("Employee updated successfully!");
  //     } else {
  //       // Create employee
  //       await axios.post(`${API_BASE}/employees`, formData);
  //       alert("Employee saved successfully!");
  //       setFormData({
  //         employeeid: "",
  //         role: "",
  //         name: "",
  //         email: "",
  //         department: "",
  //         username: "",
  //         password: "",
  //         reportingTo: "",
  //       });
  //     }

  //     onEmployeeSaved();
  //   } catch (err) {
  //     console.error(err);
  //     setError(err?.response?.data?.message || "Failed to save employee");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ADDED THIS FOR ACCESS SUCH AS CREATE, EDIT, DELETE


  const handleSubmit = async (e) => {
  e.preventDefault();

  // ADDED THIS FOR THE ACCESS OF  CREATE, EDIT

  if (employee && !access?.edit) {
    return alert("You are not allowed to edit this employee.");
  }
  if (!employee && !access?.create) {
    return alert("You are not allowed to create a new employee.");
  }

  if (!formData.name || !formData.role) return alert("Name and Role are required.");

  try {
    setLoading(true);
    setError("");

    if (employee) {
      await axios.put(`${API_BASE}/employees/${formData.employeeid}`, formData);
      alert("Employee updated successfully!");
    } else {
      await axios.post(`${API_BASE}/employees`, formData);
      alert("Employee saved successfully!");
      setFormData({
        employeeid: "",
        role: "",
        name: "",
        email: "",
        department: "",
        username: "",
        password: "",
        reportingTo: "",
      });
    }

    onEmployeeSaved();
  } catch (err) {
    console.error(err);
    setError(err?.response?.data?.message || "Failed to save employee");
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <h2 className="mb-6 text-2xl font-semibold">Employee Master</h2>

      {/* Name */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Email:</label>
        <input
          type="text"
          name="email"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Department */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Department:</label>
        <input
          type="text"
          name="department"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      {/* Role dropdown from RoleAccess */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.role} value={r.role}>
              {r.role}
            </option>
          ))}
        </select>
      </div>

      {/* Username */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.password}
          onChange={handleChange}
          placeholder={employee ? "Enter new password to change" : ""}
        />
      </div>

      {/* Reporting To */}
      <div className="flex items-center mb-2">
        <label className="w-40 text-sm font-medium text-gray-700">Reporting To:</label>
        <input
          type="text"
          name="reportingTo"
          className="w-64 px-2 py-1 text-sm border border-gray-400 rounded"
          value={formData.reportingTo}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-start mt-6 space-x-3 text-sm">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {loading ? (employee ? "Updating..." : "Saving...") : employee ? "Update" : "Submit"}
        </button>
        <button
          type="reset"
          onClick={() =>
            setFormData({
              employeeid: "",
              role: "",
              name: "",
              email: "",
              department: "",
              username: "",
              password: "",
              reportingTo: "",
            })
          }
          className="px-4 py-1 text-black bg-gray-300 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </form>
  );
};

export default EmployeeForm;
