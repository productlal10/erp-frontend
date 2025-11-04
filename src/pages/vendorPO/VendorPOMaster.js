// // src/pages/vendorPO/VendorPOMaster.js

// import React, { useState } from "react";
// import VendorPOForm from "./VendorPOForm";
// import VendorPOList from "./VendorPOList";

// // Added the setActiveTab prop to communicate with the main application
// const VendorPOMaster = ({ setActiveTab }) => {
//   const [editingPO, setEditingPO] = useState(null);

//   const handleEdit = (po) => {
//     setEditingPO(po);
//   };

//   const handleSaved = () => {
//     setEditingPO(null);
    
//     // NEW LINE: Notify the main app to keep the sidebar highlighted on the Vendor PO link.
//     // Assuming the sidebar link is named 'VendorPOList' or similar for this view.
//     if (setActiveTab) setActiveTab("VendorPOList"); 
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <VendorPOForm poToEdit={editingPO} onSaved={handleSaved} />
//         <VendorPOList onEdit={handleEdit} />
//       </div>
//     </div>
//   );
// };

// export default VendorPOMaster;

/////////


// src/pages/vendorPO/VendorPOMaster.js - Converted to TAB-SWITCHING MODULE

import React, { useState, useEffect } from "react";
import VendorPOForm from "./VendorPOForm";
import VendorPOList from "./VendorPOList";

// CRITICAL: Destructure activeTab and setActiveTab from props
const VendorPOMaster = ({ activeTab, setActiveTab }) => {
  const [editingPO, setEditingPO] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [currentTab, setCurrentTab] = useState("VendorPOList"); // Default to list

  // 1. Respect activeTab prop from AppRouter/Sidebar
  useEffect(() => {
    // activeTab will be 'VendorPOForm' or 'VendorPOList' from the sidebar click
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleEdit = (po) => {
    setEditingPO(po);
    setCurrentTab("VendorPOForm");     // Switch local tab state to form
    setActiveTab("VendorPOForm");      // CRITICAL: Update global state for sidebar highlighting
  };

  const handleSaved = () => {
    setEditingPO(null);
    setRefreshTrigger(!refreshTrigger); // Trigger list refresh
    setCurrentTab("VendorPOList");      // Switch back to the List tab
    setActiveTab("VendorPOList");       // CRITICAL: Update global state for sidebar highlighting
  };
  
  // Assuming a handleDelete function is needed for the list component
  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger); 
  };


  return (
    <div className="w-full max-w-6xl p-6">
      
      {/* 2. Conditional Rendering for Form */}
      {currentTab === "VendorPOForm" && (
        <VendorPOForm poToEdit={editingPO} onSaved={handleSaved} />
      )}
      
      {/* 3. Conditional Rendering for List */}
      {currentTab === "VendorPOList" && (
        <VendorPOList 
          refreshList={refreshTrigger}
          onEdit={handleEdit} 
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default VendorPOMaster;