// src/pages/costSheet/CostSheetMaster.js

import React, { useState, useEffect } from "react";
import CostSheetForm from "./CostSheetForm";
import CostSheetList from "./CostSheetList";

// 1. UPDATE PROP DESTRUCTION to include setActiveTab
const CostSheetMaster = ({ activeTab, setActiveTab }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingCostSheet, setEditingCostSheet] = useState(null);
  const [currentTab, setCurrentTab] = useState("CostSheetList"); // default tab

  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleCostSheetSaved = () => {
    setEditingCostSheet(null); // reset form after save
    setRefreshTrigger(!refreshTrigger); // refresh list
    setCurrentTab("CostSheetList"); // switch to list
    
    // NEW LINE: Tell the main App/Router to switch the global active tab (sidebar highlight)
    if (setActiveTab) setActiveTab("CostSheetList");
  };

  const handleEdit = (costSheet) => {
    setEditingCostSheet(costSheet); // set cost sheet to edit
    setCurrentTab("CostSheetForm"); // switch to form
  };

  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger); // refresh list after delete
  };

  // const handleAddNew = () => {
  //   setEditingCostSheet(null); // open empty form
  //   setCurrentTab("CostSheetForm");
    
  //   // Optional: If you want the sidebar to highlight 'CostSheetForm' when clicking the button:
  //   // if (setActiveTab) setActiveTab("CostSheetForm");
  // };

  return (
    <div className="w-full max-w-6xl p-6">
      {currentTab === "CostSheetForm" && (
        
        <CostSheetForm
        editingCostSheet={editingCostSheet}  // <- use correct prop name
        onCostSheetSaved={handleCostSheetSaved}
        />
      )}

      {currentTab === "CostSheetList" && (
        <div>
          <CostSheetList
            refreshList={refreshTrigger}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default CostSheetMaster;