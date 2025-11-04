// // src/pages/customer/CustomerMaster.js

// import React, { useState, useEffect } from "react";
// // Imports remain correct as long as CustomerForm/List are in the same folder.
// import CustomerForm from "./CustomerForm";
// import CustomerList from "./CustomerList";

// // 1. UPDATE PROP DESTRUCTION to include setActiveTab
// const CustomerMaster = ({ activeTab, setActiveTab }) => {
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [currentTab, setCurrentTab] = useState("CustomerList"); // default tab

//   // Respect activeTab prop if provided
//   useEffect(() => {
//     if (activeTab) setCurrentTab(activeTab);
//   }, [activeTab]);

//   const handleCustomerSaved = () => {
//     setEditingCustomer(null); 
//     setRefreshTrigger(prev => !prev); // refresh list
//     setCurrentTab("CustomerList"); 
    
//     // NEW LINE: Tell the main App/Router to switch the global active tab (sidebar highlight)
//     if (setActiveTab) setActiveTab("CustomerList"); 
//   };

//   const handleEdit = (customer) => {
//     setEditingCustomer(customer);
//     setCurrentTab("CustomerForm"); 
//   };

//   const handleDelete = () => {
//     setRefreshTrigger(prev => !prev); 
//   };

//   return (
//     <div className="w-full max-w-6xl p-6">
//       {currentTab === "CustomerForm" && (
//         <CustomerForm
//           customer={editingCustomer}
//           onCustomerSaved={handleCustomerSaved}
//         />
//       )}
//       {currentTab === "CustomerList" && (
//         <CustomerList
//           refreshList={refreshTrigger}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomerMaster;

////

// src/pages/customer/CustomerMaster.js - FINAL CORRECTED VERSION

import React, { useState, useEffect } from "react";
// Imports remain correct as long as CustomerForm/List are in the same folder.
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

// CRITICAL: Ensure activeTab and setActiveTab are destructured from props
const CustomerMaster = ({ activeTab, setActiveTab }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  // Initial state should align with the component being displayed first
  const [currentTab, setCurrentTab] = useState("CustomerList"); 

  // Respect activeTab prop if provided from AppRouter/Sidebar
  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleCustomerSaved = () => {
    setEditingCustomer(null); 
    setRefreshTrigger(prev => !prev); // refresh list
    setCurrentTab("CustomerList"); 
    
    // Tell the main App/Router to switch the global active tab (sidebar highlight)
    if (setActiveTab) setActiveTab("CustomerList"); 
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setCurrentTab("CustomerForm"); 
    // If you want the sidebar to highlight 'Customer Form' when editing:
    // if (setActiveTab) setActiveTab("CustomerForm"); 
  };

  const handleDelete = () => {
    // This is called after a delete from the list, triggering a list refresh
    setRefreshTrigger(prev => !prev); 
  };

  return (
    // FIX: Added 'mx-auto' (margin horizontal auto) to center the content
    // This resolves the visual shrinking/left-aligned appearance.
    <div className="w-full max-w-6xl p-6 mx-auto">
      {currentTab === "CustomerForm" && (
        <CustomerForm
          customer={editingCustomer}
          onCustomerSaved={handleCustomerSaved}
        />
      )}
      {currentTab === "CustomerList" && (
        <CustomerList
          refreshList={refreshTrigger}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CustomerMaster;