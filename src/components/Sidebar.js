// // src/components/Sidebar.js

// import React from 'react';

// // Destructure all the props from App.js
// const Sidebar = ({
//   user, activeTab, setActiveTab, handleLogout, 
//   // Editing State Setters (used to reset forms when navigating via menu)
//   setEditingCustomer, setEditingVendor, setEditingEmployee, setEditingItem, setEditingCostSheet, 
//   setEditingSystemPO, setEditingTna, setEditingVendorPO, setEditingDailyProductionReport,
//   // Dropdown States and Handlers
//   isCustomerDropdownOpen, openCustomerDropdown, closeCustomerDropdownWithDelay,
//   isVendorDropdownOpen, openVendorDropdown, closeVendorDropdownWithDelay,
//   isEmployeeDropdownOpen, openEmployeeDropdown, closeEmployeeDropdownWithDelay,
//   isItemMasterDropdownOpen, openItemDropdown, closeItemDropdownWithDelay,
//   isUserManagementDropdownOpen, openUserManagementDropdown, closeUserManagementDropdownWithDelay,
//   isCostSheetDropdownOpen, openCostSheetDropdown, closeCostSheetDropdownWithDelay,
//   isSystemPODropdownOpen, openSystemPODropdown, closeSystemPODropdownWithDelay,
//   isTnaDropdownOpen, openTnaDropdown, closeTnaDropdownWithDelay,
//   isVendorPODropdownOpen, openVendorPODropdown, closeVendorPODropdownWithDelay,
//   isDailyProductionReportDropdownOpen, openDailyProductionReportDropdown, closeDailyProductionReportDropdownWithDelay,
// }) => {

//   const accessibleModules = Object.keys(user?.access || {}).filter((module) => user.access[module]?.view);

//   // Helper to simplify button clicks (including resetting editing state and closing dropdown)
//   const handleNavigation = (tabName, setEditingState = null, closeDropdown = null) => {
//     if (setEditingState) setEditingState(null); 
//     setActiveTab(tabName);
//     if (closeDropdown) closeDropdown();
//   };

//   return (
//     <aside className="flex flex-col w-64 bg-gray-800 shadow-md">
//       <div className="px-6 py-4 text-xl font-bold text-white border-b border-gray-700">LAL 10</div>
//       <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto text-white">
        
//         {/* Home */}
//         <button onClick={() => setActiveTab('Home')} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === 'Home' ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>
//           <span className="flex items-center"><span className="mr-2">🏠</span> Home</span>
//         </button>
        
//         {/* Simple Module Links (Non-Master/Non-Dropdown) */}
//         {accessibleModules.map((module) => {
//           if (['Customer Master','Employee Master','Vendor Master','Item Master','CostSheet Master','SystemPO Master','TNA Master','VendorPO Master','DailyProductionReport Master'].includes(module)) return null;
//           return <button key={module} onClick={() => setActiveTab(module)} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === module ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>{module}</button>;
//         })}

//         {/* Customer Dropdown */}
//         {user?.access?.['Customer Master']?.view && (
//           <div onMouseEnter={openCustomerDropdown} onMouseLeave={closeCustomerDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">🧑‍💼</span> Customer Master </span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isCustomerDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('CustomerForm', setEditingCustomer, closeCustomerDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer Form</button>
//                 <button onClick={() => handleNavigation('CustomerList', null, closeCustomerDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Vendor Dropdown */}
//         {user?.access?.['Vendor Master']?.view && (
//           <div onMouseEnter={openVendorDropdown} onMouseLeave={closeVendorDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">🏢</span> Vendor Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isVendorDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isVendorDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('VendorForm', setEditingVendor, closeVendorDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor Form</button>
//                 <button onClick={() => handleNavigation('VendorList', null, closeVendorDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Employee Dropdown */}
//         {user?.access?.['Employee Master']?.view && (
//           <div onMouseEnter={openEmployeeDropdown} onMouseLeave={closeEmployeeDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">👨‍💻</span> Employee Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isEmployeeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isEmployeeDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('EmployeeForm', setEditingEmployee, closeEmployeeDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee Form</button>
//                 <button onClick={() => handleNavigation('EmployeeList', null, closeEmployeeDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Item Dropdown */}
//         {user?.access?.['Item Master']?.view && (
//           <div onMouseEnter={openItemDropdown} onMouseLeave={closeItemDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">📦</span> Item Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isItemMasterDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isItemMasterDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('ItemForm', setEditingItem, closeItemDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item Form</button>
//                 <button onClick={() => handleNavigation('ItemList', null, closeItemDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* User Management */}
//         <div onMouseEnter={openUserManagementDropdown} onMouseLeave={closeUserManagementDropdownWithDelay}>
//           <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//             <span className="flex items-center">
//               <span className="mr-2">👥</span> User Management
//             </span>
//             <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isUserManagementDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </button>
//           {isUserManagementDropdownOpen && (
//             <div className="mt-2 ml-4 space-y-2">
//               <button onClick={() => handleNavigation('RoleAccess', null, closeUserManagementDropdownWithDelay)} className="flex items-center w-full px-2 py-2 text-left rounded hover:bg-gray-600">
//                 <span className="mr-2">🔒</span> Role Access
//               </button>
//             </div>
//           )}
//         </div>
      
//         {/* Cost Sheet Module */}
//         {user?.access?.['CostSheet Master']?.view && (
//           <div onMouseEnter={openCostSheetDropdown} onMouseLeave={closeCostSheetDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">📊</span> CostSheet Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCostSheetDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//             </button>
//             {isCostSheetDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('CostSheetForm', setEditingCostSheet, closeCostSheetDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet Form</button>
//                 <button onClick={() => handleNavigation('CostSheetList', null, closeCostSheetDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet List</button>
//               </div>
//             )}
//           </div>
//         )}
        
//         {/* System PO Module */}
//         {user?.access?.['SystemPO Master']?.view && (
//           <div onMouseEnter={openSystemPODropdown} onMouseLeave={closeSystemPODropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">📑</span> SystemPO Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isSystemPODropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isSystemPODropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('SystemPOForm', setEditingSystemPO, closeSystemPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO Form</button>
//                 <button onClick={() => handleNavigation('SystemPOList', null, closeSystemPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Buyer PO Line Items - Simple Link */}
//         <button
//           onClick={() => setActiveTab("BuyerPOLineItemList")}
//           className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === "BuyerPOLineItemList" ? "bg-gray-700 font-semibold text-blue-400" : ""}`}
//         >
//           <span className="flex items-center"><span className="mr-2">📝</span> Buyer PO Line Items</span>
//         </button>

//         {/* TNA Module */}
//         {user?.access?.['TNA Master']?.view && (
//           <div onMouseEnter={openTnaDropdown} onMouseLeave={closeTnaDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center"><span className="mr-2">📝</span> TNA Master</span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isTnaDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isTnaDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('TnaForm', setEditingTna, closeTnaDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA Form</button>
//                 <button onClick={() => handleNavigation('TnaList', null, closeTnaDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Vendor PO Master */}
//         {user?.access?.['VendorPO Master']?.view && (
//           <div onMouseEnter={openVendorPODropdown} onMouseLeave={closeVendorPODropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center">
//                 <span className="mr-2">🧾</span> VendorPO Master
//               </span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isVendorPODropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             {isVendorPODropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('VendorPOForm', setEditingVendorPO, closeVendorPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">VendorPO Form</button>
//                 <button onClick={() => handleNavigation('VendorPOList', null, closeVendorPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">VendorPO List</button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Daily Production Report Master */}
//         {user?.access?.['DailyProductionReport Master']?.view && (
//           <div onMouseEnter={openDailyProductionReportDropdown} onMouseLeave={closeDailyProductionReportDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center">
//                 <span className="mr-2">🏭</span> DPR Master
//               </span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isDailyProductionReportDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             {isDailyProductionReportDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => handleNavigation('DailyProductionReportForm', setEditingDailyProductionReport, closeDailyProductionReportDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">DailyProductionReport Form</button>
//                 <button onClick={() => handleNavigation('DailyProductionReportList', null, closeDailyProductionReportDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">DailyProductionReport List</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="px-4 py-4 border-t border-gray-700">
//         <div className="mb-2 font-semibold whitespace-nowrap">Hello, {user?.username}!</div>
//         <button onClick={handleLogout} className="w-full px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Log Out</button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

////

// src/components/Sidebar.js - The FINAL CLEAN VERSION

import React from 'react';

// Destructure all the props from App.js
const Sidebar = ({
  user, activeTab, setActiveTab, handleLogout, 
  // DELETED PROPS (All setEditingXxx functions are REMOVED)
  // Dropdown States and Handlers (KEEP these)
  isCustomerDropdownOpen, openCustomerDropdown, closeCustomerDropdownWithDelay,
  isVendorDropdownOpen, openVendorDropdown, closeVendorDropdownWithDelay,
  isEmployeeDropdownOpen, openEmployeeDropdown, closeEmployeeDropdownWithDelay,
  isItemMasterDropdownOpen, openItemDropdown, closeItemDropdownWithDelay,
  isUserManagementDropdownOpen, openUserManagementDropdown, closeUserManagementDropdownWithDelay,
  isCostSheetDropdownOpen, openCostSheetDropdown, closeCostSheetDropdownWithDelay,
  isSystemPODropdownOpen, openSystemPODropdown, closeSystemPODropdownWithDelay,
  isTnaDropdownOpen, openTnaDropdown, closeTnaDropdownWithDelay,
  isVendorPODropdownOpen, openVendorPODropdown, closeVendorPODropdownWithDelay,
  isDailyProductionReportDropdownOpen, openDailyProductionReportDropdown, closeDailyProductionReportDropdownWithDelay,
}) => {

  const accessibleModules = Object.keys(user?.access || {}).filter((module) => user.access[module]?.view);

  // Helper to simplify button clicks (CRITICAL: Removed setEditingState logic)
  const handleNavigation = (tabName, closeDropdown = null) => {
    setActiveTab(tabName);
    if (closeDropdown) closeDropdown();
  };

  return (
    <aside className="flex flex-col w-64 bg-gray-800 shadow-md">
      <div className="px-6 py-4 text-xl font-bold text-white border-b border-gray-700">LAL 10</div>
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto text-white">
        
        {/* Home */}
        <button onClick={() => setActiveTab('Home')} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === 'Home' ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>
          <span className="flex items-center"><span className="mr-2">🏠</span> Home</span>
        </button>
        
        {/* Simple Module Links (Non-Master/Non-Dropdown) */}
        {accessibleModules.map((module) => {
          // Filter out the dropdown masters
          if (['Customer Master','Employee Master','Vendor Master','Item Master','CostSheet Master','SystemPO Master','TNA Master','VendorPO Master','DailyProductionReport Master'].includes(module)) return null;

          // Special case for Buyer PO Line Items
          if (module === 'Buyer PO Line Items') {
             return (
              <button key={module} onClick={() => setActiveTab('BuyerPOLineItemList')} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === 'BuyerPOLineItemList' ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>
                <span className="flex items-center"><span className="mr-2">📝</span> Buyer PO Line Items</span>
              </button>
             )
          }

          // Render other simple links (e.g., UserManagement, RoleAccess)
          return <button key={module} onClick={() => setActiveTab(module)} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === module ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>{module}</button>;
        })}

        {/* Customer Dropdown */}
        {user?.access?.['Customer Master']?.view && (
          <div onMouseEnter={openCustomerDropdown} onMouseLeave={closeCustomerDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">🧑‍💼</span> Customer Master </span>
            </button>
            {isCustomerDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {/* Simplified onClick calls */}
                <button onClick={() => handleNavigation('CustomerForm', closeCustomerDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer Form</button>
                <button onClick={() => handleNavigation('CustomerList', closeCustomerDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer List</button>
              </div>
            )}
          </div>
        )}

        {/* Vendor Dropdown */}
        {user?.access?.['Vendor Master']?.view && (
          <div onMouseEnter={openVendorDropdown} onMouseLeave={closeVendorDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">🏢</span> Vendor Master</span>
            </button>
            {isVendorDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('VendorForm', closeVendorDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor Form</button>
                <button onClick={() => handleNavigation('VendorList', closeVendorDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor List</button>
              </div>
            )}
          </div>
        )}

        {/* Employee Dropdown */}
        {user?.access?.['Employee Master']?.view && (
          <div onMouseEnter={openEmployeeDropdown} onMouseLeave={closeEmployeeDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">👨‍💻</span> Employee Master</span>
            </button>
            {isEmployeeDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('EmployeeForm', closeEmployeeDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee Form</button>
                <button onClick={() => handleNavigation('EmployeeList', closeEmployeeDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee List</button>
              </div>
            )}
          </div>
        )}

        {/* Item Dropdown */}
        {user?.access?.['Item Master']?.view && (
          <div onMouseEnter={openItemDropdown} onMouseLeave={closeItemDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">📦</span> Item Master</span>
            </button>
            {isItemMasterDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('ItemForm', closeItemDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item Form</button>
                <button onClick={() => handleNavigation('ItemList', closeItemDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item List</button>
              </div>
            )}
          </div>
        )}

        {/* User Management */}
        <div onMouseEnter={openUserManagementDropdown} onMouseLeave={closeUserManagementDropdownWithDelay}>
          <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
            <span className="flex items-center"><span className="mr-2">👥</span> User Management</span>
          </button>
          {isUserManagementDropdownOpen && (
            <div className="mt-2 ml-4 space-y-2">
              <button onClick={() => handleNavigation('RoleAccess', closeUserManagementDropdownWithDelay)} className="flex items-center w-full px-2 py-2 text-left rounded hover:bg-gray-600">
                <span className="mr-2">🔒</span> Role Access
              </button>
              {/* You might add 'UserManagement' button here if it's a separate page */}
            </div>
          )}
        </div>
      
        {/* Cost Sheet Module */}
        {user?.access?.['CostSheet Master']?.view && (
          <div onMouseEnter={openCostSheetDropdown} onMouseLeave={closeCostSheetDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">📊</span> CostSheet Master</span>
            </button>
            {isCostSheetDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('CostSheetForm', closeCostSheetDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet Form</button>
                <button onClick={() => handleNavigation('CostSheetList', closeCostSheetDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet List</button>
              </div>
            )}
          </div>
        )}
        
        {/* System PO Module */}
        {user?.access?.['SystemPO Master']?.view && (
          <div onMouseEnter={openSystemPODropdown} onMouseLeave={closeSystemPODropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">📑</span> SystemPO Master</span>
            </button>
            {isSystemPODropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('SystemPOForm', closeSystemPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO Form</button>
                <button onClick={() => handleNavigation('SystemPOList', closeSystemPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO List</button>
              </div>
            )}
          </div>
        )}

        {/* Buyer PO Line Items - Simple Link (Handle directly, as per AppRouter) */}
        <button
          onClick={() => setActiveTab("BuyerPOLineItemList")}
          className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === "BuyerPOLineItemList" ? "bg-gray-700 font-semibold text-blue-400" : ""}`}
        >
          <span className="flex items-center"><span className="mr-2">📝</span> Buyer PO Line Items</span>
        </button>

        {/* TNA Module */}
        {user?.access?.['TNA Master']?.view && (
          <div onMouseEnter={openTnaDropdown} onMouseLeave={closeTnaDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">📝</span> TNA Master</span>
            </button>
            {isTnaDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('TnaForm', closeTnaDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA Form</button>
                <button onClick={() => handleNavigation('TnaList', closeTnaDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA List</button>
              </div>
            )}
          </div>
        )}

        {/* Vendor PO Master */}
        {user?.access?.['VendorPO Master']?.view && (
          <div onMouseEnter={openVendorPODropdown} onMouseLeave={closeVendorPODropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">🧾</span> VendorPO Master</span>
            </button>
            {isVendorPODropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('VendorPOForm', closeVendorPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">VendorPO Form</button>
                <button onClick={() => handleNavigation('VendorPOList', closeVendorPODropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">VendorPO List</button>
              </div>
            )}
          </div>
        )}

        {/* Daily Production Report Master */}
        {user?.access?.['DailyProductionReport Master']?.view && (
          <div onMouseEnter={openDailyProductionReportDropdown} onMouseLeave={closeDailyProductionReportDropdownWithDelay}>
            <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
              <span className="flex items-center"><span className="mr-2">🏭</span> DPR Master</span>
            </button>
            {isDailyProductionReportDropdownOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button onClick={() => handleNavigation('DailyProductionReportForm', closeDailyProductionReportDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">DailyProductionReport Form</button>
                <button onClick={() => handleNavigation('DailyProductionReportList', closeDailyProductionReportDropdownWithDelay)} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">DailyProductionReport List</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="mb-2 font-semibold whitespace-nowrap">Hello, {user?.username}!</div>
        <button onClick={handleLogout} className="w-full px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Log Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;