// // Role.js
// import React, { useState } from "react";

// const Role = () => {
//   const [roleId, setRoleId] = useState("");
//   const [roleName, setRoleName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Role Submitted:", {
//       role_id: roleId,
//       role_name: roleName,
//     });
//     // TODO: API call to save role
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded-2xl">
//       <h2 className="mb-6 text-xl font-bold">Role Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Role Details */}
//         <div>
//           <h3 className="mb-4 text-lg font-semibold">Role Details</h3>
//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label className="block mb-1 font-medium">Role ID</label>
//               <input
//                 type="text"
//                 value={roleId}
//                 onChange={(e) => setRoleId(e.target.value)}
//                 placeholder="Enter role ID"
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Role Name</label>
//               <input
//                 type="text"
//                 value={roleName}
//                 onChange={(e) => setRoleName(e.target.value)}
//                 placeholder="Enter role name"
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div>
//           <button
//             type="submit"
//             className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
//           >
//             Save Role
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Role;


// Role.js
import React, { useState } from "react";
import axios from "axios";

const Role = () => {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token from login
      const res = await axios.post(
        "http://localhost:4000/roles",
        {
          role_id: roleId,
          role_name: roleName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`✅ Role saved: ${res.data.role_name}`);
      setRoleId("");
      setRoleName("");
    } catch (err) {
      console.error("Error saving role:", err);
      setMessage("❌ Failed to save role");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="mb-6 text-xl font-bold">Role Master</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Role Details */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Role Details</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 font-medium">Role ID</label>
              <input
                type="text"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                placeholder="Enter role ID"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          >
            Save Role
          </button>
        </div>
      </form>

      {message && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
};

export default Role;