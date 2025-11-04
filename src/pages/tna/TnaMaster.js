
////////

// src/pages/tna/TnaMaster.js - Converted to TAB-SWITCHING MODULE (Like ItemMaster)

// import React, { useState, useEffect } from 'react';
// import TnaList from './TnaList';
// import TnaForm from './TnaForm';

// // CRITICAL: Destructure activeTab and setActiveTab from props
// const TnaMaster = ({ activeTab, setActiveTab }) => {
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const [editingTna, setEditingTna] = useState(null);
//   const [currentTab, setCurrentTab] = useState("TnaList"); // Default to list

//   // 1. Respect activeTab prop from AppRouter/Sidebar
//   useEffect(() => {
//     // activeTab will be 'TnaForm' or 'TnaList' from the sidebar click
//     if (activeTab) setCurrentTab(activeTab);
//   }, [activeTab]);

//   const handleTnaSaved = () => {
//     setEditingTna(null);           // Clear editing state
//     setRefreshTrigger(!refreshTrigger); // Trigger list refresh
//     setCurrentTab("TnaList");      // Switch back to the List tab
//     setActiveTab("TnaList");       // CRITICAL: Update global state for sidebar highlighting
//   };

//   const handleEdit = (tna) => {
//     setEditingTna(tna);          // Set the item data to edit
//     setCurrentTab("TnaForm");     // Switch local tab state to form
//     setActiveTab("TnaForm");      // CRITICAL: Update global state for sidebar highlighting
//   };
  
//   const handleDelete = () => {
//     setRefreshTrigger(!refreshTrigger); // Trigger list refresh after delete
//   };

//   return (
//     <div className="w-full max-w-6xl p-6">
      
//       {/* 2. Conditional Rendering for Form */}
//       {currentTab === 'TnaForm' && (
//         <TnaForm tnaToEdit={editingTna} onTnaSaved={handleTnaSaved} />
//       )}
      
//       {/* 3. Conditional Rendering for List */}
//       {currentTab === 'TnaList' && (
//         <TnaList 
//           refreshList={refreshTrigger}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default TnaMaster;

////////////

// src/pages/tna/TnaMaster.js

import React, { useState, useEffect } from 'react';
import TnaList from './TnaList';
import TnaForm from './TnaForm';

const TnaMaster = ({ activeTab, setActiveTab }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [editingTna, setEditingTna] = useState(null); // ✅ IMPORTANT
  const [currentTab, setCurrentTab] = useState("TnaList");

  useEffect(() => {
    if (activeTab) setCurrentTab(activeTab);
  }, [activeTab]);

  const handleTnaSaved = () => {
    setEditingTna(null);
    setRefreshTrigger(!refreshTrigger);
    setCurrentTab("TnaList");
    setActiveTab("TnaList");
  };

  const handleEdit = (tna) => {
    setEditingTna(tna); // ✅ SEND DATA TO FORM
    setCurrentTab("TnaForm");
    setActiveTab("TnaForm");
  };

  const handleDelete = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="w-full max-w-6xl p-6">
      {currentTab === 'TnaForm' && (
        <TnaForm 
          tnaToEdit={editingTna} // ✅ PASSED FOR PREFILL
          onTnaSaved={handleTnaSaved}
        />
      )}

      {currentTab === 'TnaList' && (
        <TnaList
          refreshList={refreshTrigger}
          onEdit={handleEdit} // ✅ EDIT CONNECTED
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TnaMaster;


