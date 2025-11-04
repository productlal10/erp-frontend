// src/pages/systemPO/SystemPOMaster.js

import React, { useState, useEffect } from "react";
import SystemPOForm from "./SystemPOForm";
import SystemPOList from "./SystemPOList";

// 1. UPDATE PROP DESTRUCTION: Accept both global activeTab and the setter
const SystemPOMaster = ({ activeTab: globalActiveTab, setActiveTab: setGlobalActiveTab }) => {
  // Use a local state to manage the 'form' or 'list' view internally
  const [localActiveTab, setLocalActiveTab] = useState("list"); 
  const [editingSystemPO, setEditingSystemPO] = useState(null);

  // Use useEffect to synchronize local tab with the global tab from the AppRouter/Sidebar
  useEffect(() => {
    // We check if the global tab is a 'form' or 'list' equivalent for this module
    if (globalActiveTab === 'SystemPOForm') {
      setLocalActiveTab('form');
    } else if (globalActiveTab === 'SystemPOList') {
      setLocalActiveTab('list');
    }
  }, [globalActiveTab]);

  const handleSystemPOSaved = () => {
    setEditingSystemPO(null);
    setLocalActiveTab("list");
    
    // 2. NEW LINE: Notify the main app to update the sidebar highlight
    if (setGlobalActiveTab) setGlobalActiveTab("SystemPOList"); 
  };

  const handleEditSystemPO = (systemPO) => {
    setEditingSystemPO(systemPO);
    setLocalActiveTab("form");
    
    // Optional: Notify the main app/sidebar of the view change
    if (setGlobalActiveTab) setGlobalActiveTab("SystemPOForm"); 
  };
  
  // Custom function for "Add New" button within the list view
  const handleAddNew = () => {
      setLocalActiveTab("form");
      setEditingSystemPO(null);
      // Optional: Notify the main app/sidebar of the view change
      if (setGlobalActiveTab) setGlobalActiveTab("SystemPOForm"); 
  }

  // Use localActiveTab for rendering
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">SystemPO Master</h2>

      {localActiveTab === "form" ? (
        <SystemPOForm
          onSystemPOSaved={handleSystemPOSaved}
          systemPO={editingSystemPO}
          onCancel={() => {
              setLocalActiveTab("list");
              if (setGlobalActiveTab) setGlobalActiveTab("SystemPOList");
          }}
        />
      ) : (
        <SystemPOList
          onEdit={handleEditSystemPO}
          onAddNew={handleAddNew} // Use the new dedicated handler
        />
      )}
    </div>
  );
};

export default SystemPOMaster;