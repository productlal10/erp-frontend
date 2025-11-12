
import React, { useState, useEffect } from "react";

// ADDED ACCESS HERE AS WELL

const EmployeeList = ({ refreshList, onEdit, onDelete,access }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:4000/employees", {
        method: "GET",
        credentials: "include", // ✅ include cookies for session auth
      });

      if (!response.ok) throw new Error("Failed to fetch employees");

      const data = await response.json();

      // Normalize keys to match EmployeeForm
      const normalized = (data || []).map(emp => ({
        employeeid: emp.employeeid,
        name: emp.name,
        email: emp.email,
        department: emp.department,
        role: emp.role,
        username: emp.username,
        password: emp.password,
        reportingto: emp.reportingto,
        //access: emp.access || {},
      }));

      setEmployees(normalized);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshList]);


  const handleEdit = (emp) => {

  // ADDED NEW LINE

  if (!access?.edit) {
    return alert("You are not allowed to edit this employee.");
  }
  if (onEdit) onEdit({ ...emp });
};


  

  const handleDelete = async (empId) => {
  
  // ADDED NEW LINE


  if (!access?.delete) {
    return alert("You are not allowed to delete this employee.");
  }

    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await fetch(`http://localhost:4000/employees/${empId}`, {
        method: "DELETE",
        credentials: "include", // ✅ include cookies for session auth
      });

      if (!response.ok) throw new Error("Failed to delete employee");

      if (onDelete) onDelete();
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="max-w-full mx-auto overflow-x-auto bg-white rounded-lg shadow-md">
        <h3 className="px-6 py-4 text-2xl font-semibold text-left text-gray-800 border-b">
          Employee List
        </h3>

        {employees.length === 0 ? (
          <p className="p-6 text-gray-500">No employees found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">EmployeeID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Username</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Password</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">ReportingTo</th>
                {/* <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Access</th> */}
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map(emp => (
                <tr key={emp.employeeid}>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.employeeid}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.department}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.role}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.password}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{emp.reportingto}</td>
                  {/* <td className="px-4 py-2 text-sm text-gray-700">
                    {emp.access &&
                      Object.entries(emp.access).map(([moduleName, perms]) => {
                        const permList = Object.entries(perms || {})
                          .filter(([_, val]) => val)
                          .map(([key]) => key)
                          .join(", ");
                        return (
                          <div key={moduleName}>
                            <strong>{moduleName}:</strong> {permList || "-"}
                          </div>
                        );
                      })}
                  </td> */}
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.employeeid)}
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

export default EmployeeList;
