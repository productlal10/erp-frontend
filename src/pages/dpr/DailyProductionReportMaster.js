// // src/pages/dpr/DailyProductionReportMaster.js

// import React, { useState, useEffect } from "react";
// // Imports use relative paths since Form/List are in the same folder
// import DailyProductionReportForm from "./DailyProductionReportForm"; 
// import DailyProductionReportList from "./DailyProductionReportList";

// // Accept activeTab (for initial view) and setActiveTab (for notifying AppRouter)
// const DailyProductionReportMaster = ({ activeTab, setActiveTab }) => {
//   const [editingReport, setEditingReport] = useState(null);
//   const [currentTab, setCurrentTab] = useState("DPRList"); // local view state
//   const [refreshTrigger, setRefreshTrigger] = useState(false); // for list refresh

//   // Synchronize local tab with the global tab from the AppRouter/Sidebar
//   useEffect(() => {
//     if (activeTab) setCurrentTab(activeTab);
//   }, [activeTab]);

//   const handleReportSaved = () => {
//     setEditingReport(null); // Clear the report being edited
//     setRefreshTrigger(prev => !prev); // Trigger list refresh
//     setCurrentTab("DPRList"); // Switch local view to list
    
//     // CRITICAL: Notify the main app to update the sidebar/active tab
//     if (setActiveTab) setActiveTab("DPRList"); 
//   };

//   const handleEdit = (report) => {
//     setEditingReport(report); // Set the report data for the form
//     setCurrentTab("DPRForm"); // Switch local view to form
    
//     // Optional: Notify the main app/sidebar of the view change
//     if (setActiveTab) setActiveTab("DPRForm"); 
//   };
  
//   const handleCancel = () => {
//     setEditingReport(null);
//     setCurrentTab("DPRList");
//     // Notify the main app/sidebar of the view change
//     if (setActiveTab) setActiveTab("DPRList"); 
//   };

//   return (
//     <div className="w-full max-w-6xl p-6">
//       {currentTab === "DPRForm" && (
//         <DailyProductionReportForm
//           report={editingReport}
//           onSaved={handleReportSaved}
//           onCancel={handleCancel}
//         />
//       )}
      
//       {currentTab === "DPRList" && (
//         <DailyProductionReportList
//           onEdit={handleEdit}
//           refreshList={refreshTrigger} // Prop needed for list to refresh on save/delete
//         />
//       )}
//     </div>
//   );
// };

// export default DailyProductionReportMaster;


////

// src/pages/dpr/DailyProductionReportMaster.js - FINAL CORRECTED VERSION

import React, { useState, useEffect } from "react";
// Imports use relative paths since Form/List are in the same folder
import DailyProductionReportForm from "./DailyProductionReportForm"; 
import DailyProductionReportList from "./DailyProductionReportList";

// Accept activeTab (for initial view) and setActiveTab (for notifying AppRouter)
const DailyProductionReportMaster = ({ activeTab, setActiveTab }) => {
  const [editingReport, setEditingReport] = useState(null);
  
  // 🔑 CRITICAL FIX 1: Change "DPRList" to the full name the sidebar sends
  const [currentTab, setCurrentTab] = useState("DailyProductionReportList"); 
  
  const [refreshTrigger, setRefreshTrigger] = useState(false); // for list refresh

  // Synchronize local tab with the global tab from the AppRouter/Sidebar
  useEffect(() => {
    // This now correctly pulls 'DailyProductionReportForm' or 'DailyProductionReportList'
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleReportSaved = () => {
    setEditingReport(null); // Clear the report being edited
    setRefreshTrigger(prev => !prev); // Trigger list refresh
    
    // 🔑 CRITICAL FIX 2 & 3: Use the full name for state changes
    setCurrentTab("DailyProductionReportList"); 
    if (setActiveTab) setActiveTab("DailyProductionReportList"); 
  };

  const handleEdit = (report) => {
    setEditingReport(report); // Set the report data for the form
    
    // 🔑 CRITICAL FIX 4 & 5: Use the full name for state changes
    setCurrentTab("DailyProductionReportForm"); 
    if (setActiveTab) setActiveTab("DailyProductionReportForm"); 
  };
  
  const handleCancel = () => {
    setEditingReport(null);
    
    // 🔑 CRITICAL FIX 6 & 7: Use the full name for state changes
    setCurrentTab("DailyProductionReportList");
    if (setActiveTab) setActiveTab("DailyProductionReportList"); 
  };

  return (
    <div className="w-full max-w-6xl p-6">
      
      {/* 🔑 CRITICAL FIX 8: Conditional check using the full name */}
      {currentTab === "DailyProductionReportForm" && (
        <DailyProductionReportForm
          report={editingReport}
          onSaved={handleReportSaved}
          onCancel={handleCancel}
        />
      )}
      
      {/* 🔑 CRITICAL FIX 9: Conditional check using the full name */}
      {currentTab === "DailyProductionReportList" && (
        <DailyProductionReportList
          onEdit={handleEdit}
          refreshList={refreshTrigger} 
        />
      )}
    </div>
  );
};

export default DailyProductionReportMaster;