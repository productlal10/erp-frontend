// // src/pages/employee/EmployeeMaster.js

// import React, { useState, useEffect } from "react";
// import EmployeeForm from "./EmployeeForm";
// import EmployeeList from "./EmployeeList";

// // 1. UPDATE PROP DESTRUCTION to include setActiveTab
// const EmployeeMaster = ({ activeTab, setActiveTab }) => { 
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [currentTab, setCurrentTab] = useState("EmployeeList"); // default to list

//   // If you want to respect prop activeTab when component mounts
//   useEffect(() => {
//     if (activeTab) setCurrentTab(activeTab);
//   }, [activeTab]);

//   const handleEmployeeSaved = () => {
//     setEditingEmployee(null); // reset form after save
//     setRefreshTrigger(!refreshTrigger); // refresh list
//     setCurrentTab("EmployeeList"); // go back to list after saving
    
//     // NEW LINE: Tell the main App/Router to switch the global active tab (sidebar highlight)
//     if (setActiveTab) setActiveTab("EmployeeList");
//   };

//   const handleEdit = (emp) => {
//     setEditingEmployee(emp); // set the employee to edit
//     setCurrentTab("EmployeeForm"); // switch to form tab
//     // Optional: If you want the sidebar to highlight the form link when editing:
//     // if (setActiveTab) setActiveTab("EmployeeForm"); 
//   };

//   const handleDelete = () => {
//     setRefreshTrigger(!refreshTrigger); // refresh list after delete
//   };

//   return (
//     <div className="w-full max-w-6xl p-6">
//       {currentTab === "EmployeeForm" && (
//         <EmployeeForm
//           employee={editingEmployee}
//           onEmployeeSaved={handleEmployeeSaved}
//         />
//       )}
//       {currentTab === "EmployeeList" && (
//         <EmployeeList
//           refreshList={refreshTrigger}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeeMaster;


////


// src/pages/employee/EmployeeMaster.js - FINAL CORRECTED VERSION

import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

// 1. CRITICAL: ACCEPT 'access' PROP HERE
const EmployeeMaster = ({ activeTab, setActiveTab, access }) => { 
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentTab, setCurrentTab] = useState("EmployeeList"); // default to list

  // If you want to respect prop activeTab when component mounts
  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleEmployeeSaved = () => {
    setEditingEmployee(null); // reset form after save
    setRefreshTrigger(!refreshTrigger); // refresh list
    setCurrentTab("EmployeeList"); // go back to list after saving
    
    // Tell the main App/Router to switch the global active tab (sidebar highlight)
    if (setActiveTab) setActiveTab("EmployeeList");
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp); // set the employee to edit
    setCurrentTab("EmployeeForm"); // switch to form tab
  };

  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger); // refresh list after delete
  };

  return (
    // NOTE: If you are still seeing shrinking/left-alignment, add mx-auto here:
    // <div className="w-full max-w-6xl p-6 mx-auto">
    <div className="w-full max-w-6xl p-6"> 
      {currentTab === "EmployeeForm" && (
        <EmployeeForm
          employee={editingEmployee}
          onEmployeeSaved={handleEmployeeSaved}
          access={access} // 2. PASS 'access' DOWN TO THE FORM
        />
      )}
      {currentTab === "EmployeeList" && (
        <EmployeeList
          refreshList={refreshTrigger}
          onEdit={handleEdit}
          onDelete={handleDelete}
          access={access} // 3. PASS 'access' DOWN TO THE LIST
        />
      )}
    </div>
  );
};

export default EmployeeMaster;