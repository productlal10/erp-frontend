// // Permission.js
// import React, { useState } from "react";

// const Permission = () => {
//   const [permissionId, setPermissionId] = useState("");
//   const [permissionName, setPermissionName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Permission Submitted:", {
//       permission_id: permissionId,
//       permission_name: permissionName,
//     });
//     // TODO: API call to save permission
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded-2xl">
//       <h2 className="mb-6 text-xl font-bold">Permission Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Permission Details */}
//         <div>
//           <h3 className="mb-4 text-lg font-semibold">Permission Details</h3>
//           <div className="grid grid-cols-3 gap-6">
//             <div>
//               <label className="block mb-1 font-medium">Permission ID</label>
//               <input
//                 type="text"
//                 value={permissionId}
//                 onChange={(e) => setPermissionId(e.target.value)}
//                 placeholder="Enter permission ID"
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block mb-1 font-medium">Permission Name</label>
//               <input
//                 type="text"
//                 value={permissionName}
//                 onChange={(e) => setPermissionName(e.target.value)}
//                 placeholder="e.g., view_customer_master, create_vendor"
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
//             Save Permission
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Permission;


// Permission.js
import React, { useState } from "react";
import axios from "axios";

const Permission = () => {
  const [permissionId, setPermissionId] = useState("");
  const [permissionName, setPermissionName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await axios.post(
        "http://localhost:4000/permissions",
        {
          permission_id: permissionId,
          permission_name: permissionName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`✅ Permission saved: ${res.data.permission_name}`);
      setPermissionId("");
      setPermissionName("");
    } catch (err) {
      console.error("Error saving permission:", err);
      setMessage("❌ Failed to save permission");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="mb-6 text-xl font-bold">Permission Master</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Permission Details */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Permission Details</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 font-medium">Permission ID</label>
              <input
                type="text"
                value={permissionId}
                onChange={(e) => setPermissionId(e.target.value)}
                placeholder="Enter permission ID"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Permission Name</label>
              <input
                type="text"
                value={permissionName}
                onChange={(e) => setPermissionName(e.target.value)}
                placeholder="e.g., view_customer_master, create_vendor"
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
            Save Permission
          </button>
        </div>
      </form>

      {message && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
};

export default Permission;