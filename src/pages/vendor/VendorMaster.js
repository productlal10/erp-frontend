// src/pages/vendor/VendorMaster.js

import React, { useState, useEffect } from "react";
// Imports remain correct as long as VendorForm/List are in the same folder.
import VendorForm from "./VendorForm";
import VendorList from "./VendorList";

// 1. UPDATE PROP DESTRUCTION to include setActiveTab
const VendorMaster = ({ activeTab, setActiveTab }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [currentTab, setCurrentTab] = useState("VendorList"); // default tab

  // Respect activeTab prop if provided
  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleVendorSaved = () => {
    setEditingVendor(null); 
    setRefreshTrigger(prev => !prev); // refresh list
    setCurrentTab("VendorList"); 
    
    // NEW LINE: Tell the main App/Router to switch the global active tab (sidebar highlight)
    if (setActiveTab) setActiveTab("VendorList"); 
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setCurrentTab("VendorForm"); 
  };

  const handleDelete = () => {
    setRefreshTrigger(prev => !prev); 
  };

  return (
    <div className="w-full max-w-6xl p-6">
      {currentTab === "VendorForm" && (
        <VendorForm
          vendor={editingVendor}
          onVendorSaved={handleVendorSaved}
        />
      )}
      {currentTab === "VendorList" && (
        <VendorList
          refreshList={refreshTrigger}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default VendorMaster;