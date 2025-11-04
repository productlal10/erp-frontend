// // src/components/AppRouter.js

// import React from 'react';

// // --- Import ALL your view components from the parent directory (../) ---
// import HomePage from '../Home.js';
// import CustomerForm from '../CustomerForm.js';
// import CustomerList from '../CustomerList.js';
// import VendorForm from '../VendorForm.js';
// import VendorList from '../VendorList.js';
// import EmployeeForm from '../EmployeeForm.js';
// import EmployeeList from '../EmployeeList.js';
// import ItemForm from '../ItemForm.js';
// import ItemList from '../ItemList.js';
// import RoleAccess from "../RoleAccess";
// import CostSheetForm from '../CostSheetForm.js';
// import CostSheetList from '../CostSheetList.js';
// import SystemPOForm from '../SystemPOForm.js';
// import SystemPOList from '../SystemPOList.js';
// import BuyerPOLineItemList from "../BuyerPOLineItemList";
// import TnaForm from '../TnaForm.js';
// import TnaList from '../TnaList.js';
// import VendorPOForm from '../VendorPOForm.js';
// import VendorPOList from '../VendorPOList.js';
// import DailyProductionReportForm from '../DailyProductionReportForm.js';
// import DailyProductionReportList from '../DailyProductionReportList.js';
// // ------------------------------------------------------------------------

// // Destructure all the props needed from App.js
// const AppRouter = ({
//   user,
//   activeTab,
//   // Editing Objects (Data)
//   editingCustomer, editingVendor, editingEmployee, editingItem, editingCostSheet, editingSystemPO, editingTna, editingVendorPO, editingDailyProductionReport,
//   // Save Handlers
//   handleCustomerSaved, handleVendorSaved, handleEmployeeSaved, handleItemSaved, handleCostSheetSaved, handleSystemPOSaved, handleTnaSaved, handleVendorPOSaved, handleDailyProductionReportSaved,
//   // Edit Handlers
//   handleEditCustomer, handleEditVendor, handleEditEmployee, handleEditItem, handleEditCostSheet, handleEditSystemPO, handleEditTna, handleEditVendorPO, handleEditDailyProductionReport,
// }) => {
//   return (
//     <main className="flex-1 p-4 overflow-auto">
//       {activeTab === 'Home' && <HomePage username={user?.username} />}
      
//       {activeTab === 'CustomerForm' && <CustomerForm onCustomerSaved={handleCustomerSaved} customer={editingCustomer} />}
//       {activeTab === 'CustomerList' && <CustomerList onEdit={handleEditCustomer} />}
    
//       {activeTab === 'VendorForm' && <VendorForm vendor={editingVendor} onVendorSaved={handleVendorSaved} />}
//       {activeTab === 'VendorList' && <VendorList onEdit={handleEditVendor} />}
      
//       {activeTab === 'EmployeeForm' && (<EmployeeForm onEmployeeSaved={handleEmployeeSaved} employee={editingEmployee} access={user?.access?.['Employee Master']} />)}
//       {activeTab === 'EmployeeList' && ( <EmployeeList onEdit={handleEditEmployee} access={user?.access?.['Employee Master']} />)}

//       {activeTab === 'ItemForm' && <ItemForm onItemSaved={handleItemSaved} item={editingItem} />} 
//       {activeTab === 'ItemList' && <ItemList onEdit={handleEditItem} />}
      
//       {activeTab === 'RoleAccess' && <RoleAccess />}
      
//       {activeTab === 'CostSheetForm' && ( <CostSheetForm editingCostSheet={editingCostSheet} onCostSheetSaved={handleCostSheetSaved}/>)}
//       {activeTab === 'CostSheetList' && <CostSheetList onEdit={handleEditCostSheet} />}
      
//       {activeTab === 'SystemPOForm' && (<SystemPOForm onSystemPOSaved={handleSystemPOSaved} systemPO={editingSystemPO} />)}
//       {activeTab === 'SystemPOList' && (<SystemPOList onEdit={handleEditSystemPO} />)}
      
//       {activeTab === "BuyerPOLineItemList" && (<BuyerPOLineItemList />)}
      
//       {activeTab === 'TnaForm' && <TnaForm editingTna={editingTna} onTnaSaved={handleTnaSaved} />}
//       {activeTab === 'TnaList' && <TnaList onEdit={handleEditTna} />}
      
//       {activeTab === 'VendorPOForm' && (<VendorPOForm vendorPO={editingVendorPO} onVendorPOSaved={handleVendorPOSaved} />)}
//       {activeTab === 'VendorPOList' && (<VendorPOList onEdit={handleEditVendorPO} />)}
      
//       {activeTab === 'DailyProductionReportForm' && (<DailyProductionReportForm report={editingDailyProductionReport} onDailyProductionReportSaved={handleDailyProductionReportSaved} />)}
//       {activeTab === 'DailyProductionReportList' && (<DailyProductionReportList onEdit={handleEditDailyProductionReport} />)}
//     </main>
//   );
// };

// export default AppRouter;


/////


// src/components/AppRouter.js - The FINAL CORRECTED MODULAR ROUTER

import React from 'react';

// =========================================================
// 1. UPDATED IMPORTS from the new 'pages/' structure
// =========================================================

// Standalone Pages (assuming these are in the root of the 'pages/' folder)
import Home from '../pages/Home.js'; 
import RoleAccess from '../pages/RoleAccess.js';
import UserManagement from '../pages/UserManagement.js'; 

// Modular Master Components
import ItemMaster from '../pages/item/ItemMaster.js';
import CustomerMaster from '../pages/customer/CustomerMaster.js';
import VendorMaster from '../pages/vendor/VendorMaster.js';
import EmployeeMaster from '../pages/employee/EmployeeMaster.js';
import CostSheetMaster from '../pages/costSheet/CostSheetMaster.js';
import SystemPOMaster from '../pages/systemPO/SystemPOMaster.js';
import DailyProductionReportMaster from '../pages/dpr/DailyProductionReportMaster.js';

// CRITICAL FIX: These are now TAB-SWITCHING MASTERS, but imports remain here
import TnaMaster from '../pages/tna/TnaMaster.js';
import VendorPOMaster from '../pages/vendorPO/VendorPOMaster.js';

// Standalone List Component
import BuyerPOLineItemList from '../pages/buyerPOLineItem/BuyerPOLineItemList.js';


// 2. CLEAN UP PROPS: Only keep user, activeTab, and the setter setActiveTab
const AppRouter = ({
  user,
  activeTab,
  setActiveTab, // CRITICAL: This is needed to manage global state updates
}) => {
    
  // A helper function to easily check if the activeTab is a form or list view for a master component
  const isTabForModule = (moduleName) => {
    // This check is the key: it allows the Master component to mount for Form OR List tabs
    return activeTab === `${moduleName}Form` || activeTab === `${moduleName}List`;
  };

  // 3. UPDATED RENDERING LOGIC
  return (
    <main className="flex-1 p-4 overflow-auto">
      
      {/* ----------------- CORE/STANDALONE PAGES ----------------- */}
      {activeTab === 'Home' && <Home username={user?.username} />}
      {activeTab === 'RoleAccess' && <RoleAccess />}
      {activeTab === 'UserManagement' && <UserManagement />}
      {activeTab === 'BuyerPOLineItemList' && <BuyerPOLineItemList />}


      {/* ----------------- TAB-SWITCHING MASTER MODULES ----------------- 
          All masters that switch between Form and List views must use isTabForModule.
      */}
      {isTabForModule('Customer') && (
        <CustomerMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      {isTabForModule('Vendor') && (
        <VendorMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      {isTabForModule('Employee') && (
        <EmployeeMaster activeTab={activeTab} setActiveTab={setActiveTab} access={user?.access?.['Employee Master']} />
      )}

      {isTabForModule('Item') && (
        <ItemMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {isTabForModule('CostSheet') && (
        <CostSheetMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {isTabForModule('SystemPO') && (
        <SystemPOMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {isTabForModule('DailyProductionReport') && (
        <DailyProductionReportMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* CRITICAL FIX: TNA Master (Moved to Tab-Switching) */}
      {isTabForModule('Tna') && (
        <TnaMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      {/* CRITICAL FIX: VendorPO Master (Moved to Tab-Switching) */}
      {isTabForModule('VendorPO') && (
        <VendorPOMaster activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      {/* ----------------- SIDE-BY-SIDE MASTER MODULES ----------------- 
          THIS SECTION IS NOW EMPTY AND CAN BE REMOVED/DELETED.
      */}
      
    </main>
  );
};

export default AppRouter;