
// ///////////////////////////

// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// import HomePage from './Home.js';
// import CustomerForm from './CustomerForm.js';
// import CustomerList from './CustomerList.js';
// import VendorForm from './VendorForm.js';
// import VendorList from './VendorList.js';
// import EmployeeForm from './EmployeeForm.js';
// import EmployeeList from './EmployeeList.js';
// import ItemForm from './ItemForm.js';
// import ItemList from './ItemList.js';
// import RoleAccess from "./RoleAccess";
// import CostSheetForm from './CostSheetForm.js';
// import CostSheetList from './CostSheetList.js';
// import SystemPOForm from './SystemPOForm.js';
// import SystemPOList from './SystemPOList.js';
// import BuyerPOLineItemList from "./BuyerPOLineItemList";
// import TnaForm from './TnaForm.js';
// import TnaList from './TnaList.js';
// import VendorPOForm from './VendorPOForm.js';
// import VendorPOList from './VendorPOList.js';
// import DailyProductionReportForm from './DailyProductionReportForm.js';
// import DailyProductionReportList from './DailyProductionReportList.js';





// const App = () => {
//   const API_BASE_URL = 'http://localhost:4000';

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('Home');

//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [editingVendor, setEditingVendor] = useState(null); // ✅ Added Vendor state
//   const [editingCostSheet, setEditingCostSheet] = useState(null);
//   const [editingSystemPO, setEditingSystemPO] = useState(null);
//   //const [editingBuyerPOLineItem, setEditingBuyerPOLineItem] = useState(null);
//   const [editingTna, setEditingTna] = useState(null);
//   const [editingVendorPO, setEditingVendorPO] = useState(null);
//   const [editingDailyProductionReport, setEditingDailyProductionReport] = useState(null);




//   const [isItemMasterDropdownOpen, setIsItemMasterDropdownOpen] = useState(false);
//   const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
//   const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
//   const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false); // ✅ Added Vendor dropdown
//   const [isUserManagementDropdownOpen, setIsUserManagementDropdownOpen] = useState(false);
//   const [isCostSheetDropdownOpen, setIsCostSheetDropdownOpen] = useState(false);
//   const [isSystemPODropdownOpen, setIsSystemPODropdownOpen] = useState(false);
//   const [isTnaDropdownOpen, setIsTnaDropdownOpen] = useState(false);
//   const [isVendorPODropdownOpen, setIsVendorPODropdownOpen] = useState(false);
//   const [isDailyProductionReportDropdownOpen, setIsDailyProductionReportDropdownOpen] = useState(false);

  

//   const customerCloseTimeoutRef = useRef(null);
//   const vendorCloseTimeoutRef = useRef(null);
//   const employeeCloseTimeoutRef = useRef(null);
//   const itemCloseTimeoutRef = useRef(null);
//   const userManagementCloseTimeoutRef = useRef(null);
//   const costSheetCloseTimeoutRef = useRef(null);
//   const systemPOCloseTimeoutRef = useRef(null);
//   const tnaCloseTimeoutRef = useRef(null);
//   const vendorPOCloseTimeoutRef = useRef(null);
//   const dailyProductionReportCloseTimeoutRef = useRef(null);

  

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/session`, {
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await response.json();

//         if (response.ok && data.success) {
//           setIsLoggedIn(true);
//           setUser(data.user);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Session check failed:", error);
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };

//     checkSession();

//     return () => {
//       clearTimeout(customerCloseTimeoutRef.current);
//       clearTimeout(vendorCloseTimeoutRef.current);
//       clearTimeout(employeeCloseTimeoutRef.current);
//       clearTimeout(itemCloseTimeoutRef.current);
//       clearTimeout(userManagementCloseTimeoutRef.current);
//       clearTimeout(costSheetCloseTimeoutRef.current);
//       clearTimeout(systemPOCloseTimeoutRef.current);
//       clearTimeout(tnaCloseTimeoutRef.current);
//       clearTimeout(vendorPOCloseTimeoutRef.current);
//       clearTimeout(dailyProductionReportCloseTimeoutRef.current);



//     };
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: "include",
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setIsLoggedIn(true);
//         setUser(data.user);
//         setLoginError('');
//       } else {
//         setLoginError(data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setLoginError('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_BASE_URL}/logout`, {
//         method: "POST",
//         credentials: "include"
//       });
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }

//     setIsLoggedIn(false);
//     setUser(null);
//     setUsername('');
//     setPassword('');
//     setActiveTab('Home');
//   };

//   // ------------------ Handlers for editing and saving ------------------
//   const handleEmployeeSaved = () => { setEditingEmployee(null); setActiveTab('EmployeeList'); };
//   const handleEditEmployee = (employee) => { setEditingEmployee({ ...employee }); setActiveTab('EmployeeForm'); };
//   const handleCustomerSaved = () => { setEditingCustomer(null); setActiveTab('CustomerList'); };
//   const handleEditCustomer = (customer) => { setEditingCustomer(customer); setActiveTab('CustomerForm'); };
//   const handleItemSaved = () => { setEditingItem(null); setActiveTab('ItemList'); };
//   const handleEditItem = (item) => { setEditingItem(item); setActiveTab('ItemForm'); };

//   const handleVendorSaved = () => { setEditingVendor(null); setActiveTab('VendorList'); }; // ✅ Vendor save
//   const handleEditVendor = (vendor) => { setEditingVendor(vendor); setActiveTab('VendorForm'); }; // ✅ Vendor edit
//   const handleCostSheetSaved = () => { setEditingCostSheet(null); setActiveTab('CostSheetList'); };

//   const handleEditCostSheet = (costSheet) => { setEditingCostSheet(costSheet);  setActiveTab('CostSheetForm'); };
//   const handleSystemPOSaved = () => { setEditingSystemPO(null);  setActiveTab('SystemPOList'); };

//   const handleEditSystemPO = (systemPO) => { setEditingSystemPO(systemPO); setActiveTab('SystemPOForm'); };
//   // TNA Handlers
//   const handleTnaSaved = () => { setEditingTna(null); setActiveTab('TnaList'); };
//   const handleEditTna = (tna) => { setEditingTna(tna); setActiveTab('TnaForm'); };
//   const handleVendorPOSaved = () => {setEditingVendorPO(null);setActiveTab('VendorPOList');};
//   const handleEditVendorPO = (vendorPO) => {setEditingVendorPO(vendorPO);setActiveTab('VendorPOForm');};
//   const handleDailyProductionReportSaved = () => {setEditingDailyProductionReport(null);setActiveTab('DailyProductionReportList');};

//   const handleEditDailyProductionReport = (report) => {setEditingDailyProductionReport(report);setActiveTab('DailyProductionReportForm');};






//   // ------------------ Dropdowns ------------------
//   const openCustomerDropdown = () => { clearTimeout(customerCloseTimeoutRef.current); setIsCustomerDropdownOpen(true); };
//   const closeCustomerDropdownWithDelay = () => { clearTimeout(customerCloseTimeoutRef.current); customerCloseTimeoutRef.current = setTimeout(() => setIsCustomerDropdownOpen(false), 150); };
//   const openVendorDropdown = () => { clearTimeout(vendorCloseTimeoutRef.current); setIsVendorDropdownOpen(true); };
//   const closeVendorDropdownWithDelay = () => { clearTimeout(vendorCloseTimeoutRef.current); vendorCloseTimeoutRef.current = setTimeout(() => setIsVendorDropdownOpen(false), 150); };
//   const openEmployeeDropdown = () => { clearTimeout(employeeCloseTimeoutRef.current); setIsEmployeeDropdownOpen(true); };
//   const closeEmployeeDropdownWithDelay = () => { clearTimeout(employeeCloseTimeoutRef.current); employeeCloseTimeoutRef.current = setTimeout(() => setIsEmployeeDropdownOpen(false), 150); };
//   const openItemDropdown = () => { clearTimeout(itemCloseTimeoutRef.current); setIsItemMasterDropdownOpen(true); };
//   const closeItemDropdownWithDelay = () => { clearTimeout(itemCloseTimeoutRef.current); itemCloseTimeoutRef.current = setTimeout(() => setIsItemMasterDropdownOpen(false), 150); };
//   const openUserManagementDropdown = () => { clearTimeout(userManagementCloseTimeoutRef.current); setIsUserManagementDropdownOpen(true); };
//   const closeUserManagementDropdownWithDelay = () => { clearTimeout(userManagementCloseTimeoutRef.current); userManagementCloseTimeoutRef.current = setTimeout(() => setIsUserManagementDropdownOpen(false), 150); };
//   const openCostSheetDropdown = () => { clearTimeout(costSheetCloseTimeoutRef.current); setIsCostSheetDropdownOpen(true);};
//   const closeCostSheetDropdownWithDelay = () => {clearTimeout(costSheetCloseTimeoutRef.current);costSheetCloseTimeoutRef.current = setTimeout(() => setIsCostSheetDropdownOpen(false), 150);};
//   const openSystemPODropdown = () => { clearTimeout(systemPOCloseTimeoutRef.current); setIsSystemPODropdownOpen(true); };
//   const closeSystemPODropdownWithDelay = () => { clearTimeout(systemPOCloseTimeoutRef.current); systemPOCloseTimeoutRef.current = setTimeout(() => setIsSystemPODropdownOpen(false), 150); };
//   const openTnaDropdown = () => { clearTimeout(tnaCloseTimeoutRef.current); setIsTnaDropdownOpen(true); };
//   const closeTnaDropdownWithDelay = () => { clearTimeout(tnaCloseTimeoutRef.current); tnaCloseTimeoutRef.current = setTimeout(() => setIsTnaDropdownOpen(false), 150); };
//   const openVendorPODropdown = () => {clearTimeout(vendorPOCloseTimeoutRef.current);setIsVendorPODropdownOpen(true);};
//   const closeVendorPODropdownWithDelay = () => {clearTimeout(vendorPOCloseTimeoutRef.current);vendorPOCloseTimeoutRef.current = setTimeout(() => setIsVendorPODropdownOpen(false), 150);};
//   const openDailyProductionReportDropdown = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);setIsDailyProductionReportDropdownOpen(true);};
//   const closeDailyProductionReportDropdownWithDelay = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);dailyProductionReportCloseTimeoutRef.current = setTimeout(() => setIsDailyProductionReportDropdownOpen(false),150);};




//   if (!isLoggedIn) {
//     return (
//       <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-100">
//         <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
//           <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block mb-2 font-semibold text-gray-700" htmlFor="username">Username</label>
//               <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
//             </div>
//             <div>
//               <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">Password</label>
//               <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
//             </div>
//             {loginError && <p className="text-sm font-medium text-center text-red-500">{loginError}</p>}
//             <button type="submit" className="w-full px-4 py-2 font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105">{isLoading ? 'Logging In...' : 'Log In'}</button>
//           </form>
//         </div>
//       </div>
//     ); 
//   }

//   const accessibleModules = Object.keys(user?.access || {}).filter((module) => user.access[module]?.view);

//   return (
//     <div className="flex min-h-screen font-sans bg-gray-100">
//       {/* Sidebar */}
//       <aside className="flex flex-col w-64 bg-gray-800 shadow-md">
//         <div className="px-6 py-4 text-xl font-bold text-white border-b border-gray-700">LAL 10</div>
//         <div className="flex-1 px-4 py-6 space-y-4 text-white">
//           <button onClick={() => setActiveTab('Home')} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === 'Home' ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}><span className="flex items-center"><span className="mr-2">🏠</span> Home</span>
//           </button>
//           {accessibleModules.map((module) => {
//             if (['Customer Master','Employee Master','Vendor Master','Item Master','CostSheet Master','SystemPO Master','TNA Master','VendorPO Master','DailyProductionReport Master'].includes(module)) return null;
//             return <button key={module} onClick={() => setActiveTab(module)} className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${activeTab === module ? 'bg-gray-700 font-semibold text-blue-400' : ''}`}>{module}</button>;
//           })}

//           {/* Customer Dropdown */}
//           {user?.access?.['Customer Master']?.view && (
//             <div onMouseEnter={openCustomerDropdown} onMouseLeave={closeCustomerDropdownWithDelay}>
//               <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//                 <span className="flex items-center"><span className="mr-2">🧑‍💼</span> Customer Master </span>
//                 <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>
//               {isCustomerDropdownOpen && (
//                 <div className="mt-2 ml-4 space-y-2">
//                   <button onClick={() => { setEditingCustomer(null); setActiveTab('CustomerForm'); setIsCustomerDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer Form</button>
//                   <button onClick={() => { setActiveTab('CustomerList'); setIsCustomerDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Customer List</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Vendor Dropdown */}
//           {user?.access?.['Vendor Master']?.view && (
//             <div onMouseEnter={openVendorDropdown} onMouseLeave={closeVendorDropdownWithDelay}>
//               <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//                 <span className="flex items-center"><span className="mr-2">🏢</span> Vendor Master</span>
//                 <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isVendorDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>
//               {isVendorDropdownOpen && (
//                 <div className="mt-2 ml-4 space-y-2">
//                   <button onClick={() => { setEditingVendor(null); setActiveTab('VendorForm'); setIsVendorDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor Form</button>
//                   <button onClick={() => { setActiveTab('VendorList'); setIsVendorDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Vendor List</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Employee Dropdown */}
//           {user?.access?.['Employee Master']?.view && (
//             <div onMouseEnter={openEmployeeDropdown} onMouseLeave={closeEmployeeDropdownWithDelay}>
//               <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//                 <span className="flex items-center"><span className="mr-2">👨‍💻</span> Employee Master</span>
//                 <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isEmployeeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>
//               {isEmployeeDropdownOpen && (
//                 <div className="mt-2 ml-4 space-y-2">
//                   <button onClick={() => { setEditingEmployee(null); setActiveTab('EmployeeForm'); setIsEmployeeDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee Form</button>
//                   <button onClick={() => { setActiveTab('EmployeeList'); setIsEmployeeDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Employee List</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Item Dropdown */}
//           {user?.access?.['Item Master']?.view && (
//             <div onMouseEnter={openItemDropdown} onMouseLeave={closeItemDropdownWithDelay}>
//               <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//                 <span className="flex items-center"><span className="mr-2">📦</span> Item Master</span>
//                 <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isItemMasterDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </button>
//               {isItemMasterDropdownOpen && (
//                 <div className="mt-2 ml-4 space-y-2">
//                   <button onClick={() => { setEditingItem(null); setActiveTab('ItemForm'); setIsItemMasterDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item Form</button>
//                   <button onClick={() => { setActiveTab('ItemList'); setIsItemMasterDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">Item List</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* User Management */}
//           <div onMouseEnter={openUserManagementDropdown} onMouseLeave={closeUserManagementDropdownWithDelay}>
//             <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//               <span className="flex items-center">
//                 <span className="mr-2">👥</span> User Management
//               </span>
//               <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isUserManagementDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isUserManagementDropdownOpen && (
//               <div className="mt-2 ml-4 space-y-2">
//                 <button onClick={() => { setActiveTab('RoleAccess'); setIsUserManagementDropdownOpen(false); }} className="flex items-center w-full px-2 py-2 text-left rounded hover:bg-gray-600">
//                   <span className="mr-2">🔒</span> Role Access
//                 </button>
//               </div>
//             )}
//           </div>
        

//         {/* Cost Sheet Module */}
//         {user?.access?.['CostSheet Master']?.view && (
//         //<div onMouseEnter={() => setIsCostSheetDropdownOpen(true)} onMouseLeave={() => setIsCostSheetDropdownOpen(false)}>
//         <div onMouseEnter={openCostSheetDropdown} onMouseLeave={closeCostSheetDropdownWithDelay}>
//         <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//           <span className="flex items-center"><span className="mr-2">📊</span> CostSheet Master</span>
//           <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isCostSheetDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//         </button>
//         {isCostSheetDropdownOpen && (
//           <div className="mt-2 ml-4 space-y-2">
//             <button onClick={() => { setEditingCostSheet(null); setActiveTab('CostSheetForm'); setIsCostSheetDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet Form</button>
//             <button onClick={() => { setActiveTab('CostSheetList'); setIsCostSheetDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">CostSheet List</button>
//           </div>
//           )}
//       </div>
//     )}
    
//     {user?.access?.['SystemPO Master']?.view && (
//     <div onMouseEnter={openSystemPODropdown} onMouseLeave={closeSystemPODropdownWithDelay}>
//     <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//       <span className="flex items-center"><span className="mr-2">📑</span> SystemPO Master</span>
//       <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isSystemPODropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//       </svg>
//     </button>
//     {isSystemPODropdownOpen && (
//       <div className="mt-2 ml-4 space-y-2">
//         <button onClick={() => { setEditingSystemPO(null); setActiveTab('SystemPOForm'); setIsSystemPODropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO Form</button>
//         <button onClick={() => { setActiveTab('SystemPOList'); setIsSystemPODropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">SystemPO List</button>
//       </div>
//     )}
//   </div>
// )}

// {/* Buyer PO Line Items - No access check for now */}
// <button
//   onClick={() => setActiveTab("BuyerPOLineItemList")}
//   className={`block w-full text-left py-2 px-2 rounded hover:bg-gray-700 ${
//     activeTab === "BuyerPOLineItemList" ? "bg-gray-700 font-semibold text-blue-400" : ""
//   }`}
// >
//   <span className="flex items-center"><span className="mr-2">📝</span> Buyer PO Line Items</span>
// </button>



// {user?.access?.['TNA Master']?.view && (
//   <div onMouseEnter={openTnaDropdown} onMouseLeave={closeTnaDropdownWithDelay}>
//     <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//       <span className="flex items-center"><span className="mr-2">📝</span> TNA Master</span>
//       <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isTnaDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//       </svg>
//     </button>
//     {isTnaDropdownOpen && (
//       <div className="mt-2 ml-4 space-y-2">
//         <button onClick={() => { setEditingTna(null); setActiveTab('TnaForm'); setIsTnaDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA Form</button>
//         <button onClick={() => { setActiveTab('TnaList'); setIsTnaDropdownOpen(false); }} className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600">TNA List</button>
//       </div>
//     )}
//   </div>
// )}

// {/* Vendor PO Master */}
// {user?.access?.['VendorPO Master']?.view && (
//   <div onMouseEnter={openVendorPODropdown} onMouseLeave={closeVendorPODropdownWithDelay}>
//     <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//       <span className="flex items-center">
//         <span className="mr-2">🧾</span> VendorPO Master
//       </span>
//       <svg
//         className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
//           isVendorPODropdownOpen ? 'rotate-180' : ''
//         }`}
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>

//     {isVendorPODropdownOpen && (
//       <div className="mt-2 ml-4 space-y-2">
//         <button
//           onClick={() => {
//             setEditingVendorPO(null);
//             setActiveTab('VendorPOForm');
//             setIsVendorPODropdownOpen(false);
//           }}
//           className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600"
//         >
//           VendorPO Form
//         </button>
//         <button
//           onClick={() => {
//             setActiveTab('VendorPOList');
//             setIsVendorPODropdownOpen(false);
//           }}
//           className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600"
//         >
//           VendorPO List
//         </button>
//       </div>
//     )}
//   </div>
// )}

// {/* Daily Production Report Master */}
// {user?.access?.['DailyProductionReport Master']?.view && (
//   <div
//     onMouseEnter={openDailyProductionReportDropdown}
//     onMouseLeave={closeDailyProductionReportDropdownWithDelay}
//   >
//     <button className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-700">
//       <span className="flex items-center">
//         <span className="mr-2">🏭</span> DPR Master
//       </span>
//       <svg
//         className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
//           isDailyProductionReportDropdownOpen ? 'rotate-180' : ''
//         }`}
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M19 9l-7 7-7-7"
//         />
//       </svg>
//     </button>

//     {isDailyProductionReportDropdownOpen && (
//       <div className="mt-2 ml-4 space-y-2">
//         <button
//           onClick={() => {
//             setEditingDailyProductionReport(null);
//             setActiveTab('DailyProductionReportForm');
//             setIsDailyProductionReportDropdownOpen(false);
//           }}
//           className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600"
//         >
//           DailyProductionReport Form
//         </button>
//         <button
//           onClick={() => {
//             setActiveTab('DailyProductionReportList');
//             setIsDailyProductionReportDropdownOpen(false);
//           }}
//           className="block w-full px-2 py-2 text-left rounded hover:bg-gray-600"
//         >
//           DailyProductionReport List
//         </button>
//       </div>
//     )}
//   </div>
// )}


// </div>

//         {/* Footer */}
//         <div className="px-4 py-4 border-t border-gray-700">
//           <div className="mb-2 font-semibold whitespace-nowrap">Hello, {user?.username}!</div>
//           <button onClick={handleLogout} className="w-full px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Log Out</button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 overflow-auto">
//         {activeTab === 'Home' && <HomePage username={user?.username} />}
//         {activeTab === 'CustomerForm' && <CustomerForm onCustomerSaved={handleCustomerSaved} customer={editingCustomer} />}
//         {activeTab === 'CustomerList' && <CustomerList onEdit={handleEditCustomer} />}
      
//         {activeTab === 'VendorForm' && <VendorForm vendor={editingVendor} onVendorSaved={handleVendorSaved} />} {/* ✅ Vendor integration */}
//         {activeTab === 'VendorList' && <VendorList onEdit={handleEditVendor} />} {/* ✅ Vendor edit */}
//         {/*} {activeTab === 'EmployeeForm' && <EmployeeForm onEmployeeSaved={handleEmployeeSaved} employee={editingEmployee} />}
//         {activeTab === 'EmployeeList' && <EmployeeList onEdit={handleEditEmployee} />} */}
//         {activeTab === 'EmployeeForm' && (<EmployeeForm onEmployeeSaved={handleEmployeeSaved} employee={editingEmployee}access={user?.access?.['Employee Master']} />)}

//         {activeTab === 'EmployeeList' && ( <EmployeeList onEdit={handleEditEmployee} access={user?.access?.['Employee Master']} />)}

//         {/*  {activeTab==='ItemForm' && (<ItemForm onItemSaved={handleItemSaved} item={editingItem} access={user?.access?.['Item Master']}/>)}*/}

//         {activeTab === 'ItemForm' && <ItemForm onItemSaved={handleItemSaved} item={editingItem} />} 
//         {activeTab === 'ItemList' && <ItemList onEdit={handleEditItem} />}
//         {activeTab === 'RoleAccess' && <RoleAccess />}
//         {activeTab === 'CostSheetForm' && ( <CostSheetForm editingCostSheet={editingCostSheet}onCostSheetSaved={handleCostSheetSaved}/>)}
//         {activeTab === 'CostSheetList' && <CostSheetList onEdit={handleEditCostSheet} />}
//         {activeTab === 'SystemPOForm' && (<SystemPOForm onSystemPOSaved={handleSystemPOSaved} systemPO={editingSystemPO} />)}
//         {activeTab === 'SystemPOList' && (<SystemPOList onEdit={handleEditSystemPO} />)}
//         {activeTab === "BuyerPOLineItemList" && (<BuyerPOLineItemList />)}
//         {activeTab === 'TnaForm' && <TnaForm editingTna={editingTna} onTnaSaved={handleTnaSaved} />}
//         {activeTab === 'TnaList' && <TnaList onEdit={handleEditTna} />}
//         {activeTab === 'VendorPOForm' && (<VendorPOForm vendorPO={editingVendorPO} onVendorPOSaved={handleVendorPOSaved} />)}
//         {activeTab === 'VendorPOList' && (<VendorPOList onEdit={handleEditVendorPO} />)}
//         {activeTab === 'DailyProductionReportForm' && (<DailyProductionReportForm report={editingDailyProductionReport}onDailyProductionReportSaved={handleDailyProductionReportSaved} />)}
//         {activeTab === 'DailyProductionReportList' && (<DailyProductionReportList onEdit={handleEditDailyProductionReport} />)}




//       </main>
//     </div>
//   );
// };

// export default App;

///////////////////


// src/App.js

// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// // --- NEW IMPORTS for Modularized Components ---
// import LoginScreen from './components/LoginScreen'; 
// import Sidebar from './components/Sidebar';         
// import AppRouter from './components/AppRouter';     
// // ---------------------------------------------

// // NOTE: All imports for your view components (Home.js, CustomerForm.js, etc.) 
// // should be DELETED from here and moved to components/AppRouter.js

// const App = () => {
//   const API_BASE_URL = 'http://localhost:4000';

//   // --- State Variables ---
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('Home');

//   // Editing States (Used to pass data to forms)
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [editingVendor, setEditingVendor] = useState(null); 
//   const [editingCostSheet, setEditingCostSheet] = useState(null);
//   const [editingSystemPO, setEditingSystemPO] = useState(null);
//   const [editingTna, setEditingTna] = useState(null);
//   const [editingVendorPO, setEditingVendorPO] = useState(null);
//   const [editingDailyProductionReport, setEditingDailyProductionReport] = useState(null);

//   // Dropdown States
//   const [isItemMasterDropdownOpen, setIsItemMasterDropdownOpen] = useState(false);
//   const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
//   const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
//   const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false); 
//   const [isUserManagementDropdownOpen, setIsUserManagementDropdownOpen] = useState(false);
//   const [isCostSheetDropdownOpen, setIsCostSheetDropdownOpen] = useState(false);
//   const [isSystemPODropdownOpen, setIsSystemPODropdownOpen] = useState(false);
//   const [isTnaDropdownOpen, setIsTnaDropdownOpen] = useState(false);
//   const [isVendorPODropdownOpen, setIsVendorPODropdownOpen] = useState(false);
//   const [isDailyProductionReportDropdownOpen, setIsDailyProductionReportDropdownOpen] = useState(false);

//   // Timeout Refs for Dropdowns
//   const customerCloseTimeoutRef = useRef(null);
//   const vendorCloseTimeoutRef = useRef(null);
//   const employeeCloseTimeoutRef = useRef(null);
//   const itemCloseTimeoutRef = useRef(null);
//   const userManagementCloseTimeoutRef = useRef(null);
//   const costSheetCloseTimeoutRef = useRef(null);
//   const systemPOCloseTimeoutRef = useRef(null);
//   const tnaCloseTimeoutRef = useRef(null);
//   const vendorPOCloseTimeoutRef = useRef(null);
//   const dailyProductionReportCloseTimeoutRef = useRef(null);

  
//   // --- useEffect (Session Check & Cleanup) ---
//   useEffect(() => {
//     const checkSession = async () => {
//       // ... (Your session check logic remains here)
//       try {
//         const response = await fetch(`${API_BASE_URL}/session`, {
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await response.json();

//         if (response.ok && data.success) {
//           setIsLoggedIn(true);
//           setUser(data.user);
//         } else {
//           setIsLoggedIn(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Session check failed:", error);
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     };

//     checkSession();

//     return () => {
//       clearTimeout(customerCloseTimeoutRef.current);
//       clearTimeout(vendorCloseTimeoutRef.current);
//       clearTimeout(employeeCloseTimeoutRef.current);
//       clearTimeout(itemCloseTimeoutRef.current);
//       clearTimeout(userManagementCloseTimeoutRef.current);
//       clearTimeout(costSheetCloseTimeoutRef.current);
//       clearTimeout(systemPOCloseTimeoutRef.current);
//       clearTimeout(tnaCloseTimeoutRef.current);
//       clearTimeout(vendorPOCloseTimeoutRef.current);
//       clearTimeout(dailyProductionReportCloseTimeoutRef.current);
//     };
//   }, []);

//   // --- Login/Logout Handlers ---
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginError('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: "include",
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setIsLoggedIn(true);
//         setUser(data.user);
//         setLoginError('');
//       } else {
//         setLoginError(data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setLoginError('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_BASE_URL}/logout`, {
//         method: "POST",
//         credentials: "include"
//       });
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }

//     setIsLoggedIn(false);
//     setUser(null);
//     setUsername('');
//     setPassword('');
//     setActiveTab('Home');
//   };

//   // --- Handlers for saving and editing (All remain here) ---
//   const handleEmployeeSaved = () => { setEditingEmployee(null); setActiveTab('EmployeeList'); };
//   const handleEditEmployee = (employee) => { setEditingEmployee({ ...employee }); setActiveTab('EmployeeForm'); };
//   const handleCustomerSaved = () => { setEditingCustomer(null); setActiveTab('CustomerList'); };
//   const handleEditCustomer = (customer) => { setEditingCustomer(customer); setActiveTab('CustomerForm'); };
//   const handleItemSaved = () => { setEditingItem(null); setActiveTab('ItemList'); };
//   const handleEditItem = (item) => { setEditingItem(item); setActiveTab('ItemForm'); };
//   const handleVendorSaved = () => { setEditingVendor(null); setActiveTab('VendorList'); }; 
//   const handleEditVendor = (vendor) => { setEditingVendor(vendor); setActiveTab('VendorForm'); }; 
//   const handleCostSheetSaved = () => { setEditingCostSheet(null); setActiveTab('CostSheetList'); };
//   const handleEditCostSheet = (costSheet) => { setEditingCostSheet(costSheet);  setActiveTab('CostSheetForm'); };
//   const handleSystemPOSaved = () => { setEditingSystemPO(null);  setActiveTab('SystemPOList'); };
//   const handleEditSystemPO = (systemPO) => { setEditingSystemPO(systemPO); setActiveTab('SystemPOForm'); };
//   const handleTnaSaved = () => { setEditingTna(null); setActiveTab('TnaList'); };
//   const handleEditTna = (tna) => { setEditingTna(tna); setActiveTab('TnaForm'); };
//   const handleVendorPOSaved = () => {setEditingVendorPO(null);setActiveTab('VendorPOList');};
//   const handleEditVendorPO = (vendorPO) => {setEditingVendorPO(vendorPO);setActiveTab('VendorPOForm');};
//   const handleDailyProductionReportSaved = () => {setEditingDailyProductionReport(null);setActiveTab('DailyProductionReportList');};
//   const handleEditDailyProductionReport = (report) => {setEditingDailyProductionReport(report);setActiveTab('DailyProductionReportForm');};

//   // --- Dropdowns Handlers (All remain here) ---
//   const openCustomerDropdown = () => { clearTimeout(customerCloseTimeoutRef.current); setIsCustomerDropdownOpen(true); };
//   const closeCustomerDropdownWithDelay = () => { clearTimeout(customerCloseTimeoutRef.current); customerCloseTimeoutRef.current = setTimeout(() => setIsCustomerDropdownOpen(false), 150); };
//   const openVendorDropdown = () => { clearTimeout(vendorCloseTimeoutRef.current); setIsVendorDropdownOpen(true); };
//   const closeVendorDropdownWithDelay = () => { clearTimeout(vendorCloseTimeoutRef.current); vendorCloseTimeoutRef.current = setTimeout(() => setIsVendorDropdownOpen(false), 150); };
//   const openEmployeeDropdown = () => { clearTimeout(employeeCloseTimeoutRef.current); setIsEmployeeDropdownOpen(true); };
//   const closeEmployeeDropdownWithDelay = () => { clearTimeout(employeeCloseTimeoutRef.current); employeeCloseTimeoutRef.current = setTimeout(() => setIsEmployeeDropdownOpen(false), 150); };
//   const openItemDropdown = () => { clearTimeout(itemCloseTimeoutRef.current); setIsItemMasterDropdownOpen(true); };
//   const closeItemDropdownWithDelay = () => { clearTimeout(itemCloseTimeoutRef.current); itemCloseTimeoutRef.current = setTimeout(() => setIsItemMasterDropdownOpen(false), 150); };
//   const openUserManagementDropdown = () => { clearTimeout(userManagementCloseTimeoutRef.current); setIsUserManagementDropdownOpen(true); };
//   const closeUserManagementDropdownWithDelay = () => { clearTimeout(userManagementCloseTimeoutRef.current); userManagementCloseTimeoutRef.current = setTimeout(() => setIsUserManagementDropdownOpen(false), 150); };
//   const openCostSheetDropdown = () => { clearTimeout(costSheetCloseTimeoutRef.current); setIsCostSheetDropdownOpen(true);};
//   const closeCostSheetDropdownWithDelay = () => {clearTimeout(costSheetCloseTimeoutRef.current);costSheetCloseTimeoutRef.current = setTimeout(() => setIsCostSheetDropdownOpen(false), 150);};
//   const openSystemPODropdown = () => { clearTimeout(systemPOCloseTimeoutRef.current); setIsSystemPODropdownOpen(true); };
//   const closeSystemPODropdownWithDelay = () => { clearTimeout(systemPOCloseTimeoutRef.current); systemPOCloseTimeoutRef.current = setTimeout(() => setIsSystemPODropdownOpen(false), 150); };
//   const openTnaDropdown = () => { clearTimeout(tnaCloseTimeoutRef.current); setIsTnaDropdownOpen(true); };
//   const closeTnaDropdownWithDelay = () => { clearTimeout(tnaCloseTimeoutRef.current); tnaCloseTimeoutRef.current = setTimeout(() => setIsTnaDropdownOpen(false), 150); };
//   const openVendorPODropdown = () => {clearTimeout(vendorPOCloseTimeoutRef.current);setIsVendorPODropdownOpen(true);};
//   const closeVendorPODropdownWithDelay = () => {clearTimeout(vendorPOCloseTimeoutRef.current);vendorPOCloseTimeoutRef.current = setTimeout(() => setIsVendorPODropdownOpen(false), 150);};
//   const openDailyProductionReportDropdown = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);setIsDailyProductionReportDropdownOpen(true);};
//   const closeDailyProductionReportDropdownWithDelay = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);dailyProductionReportCloseTimeoutRef.current = setTimeout(() => setIsDailyProductionReportDropdownOpen(false),150);};
//   // ----------------------------------------------------------------------------------

//   // --- RENDER LOGIC (Simplified) ---

//   if (!isLoggedIn) {
//     // 1. RENDER LOGIN SCREEN
//     return (
//       <LoginScreen 
//         username={username}
//         setUsername={setUsername}
//         password={password}
//         setPassword={setPassword}
//         handleLogin={handleLogin}
//         loginError={loginError}
//         isLoading={isLoading}
//       />
//     );	
//   }

//   return (
//     <div className="flex min-h-screen font-sans bg-gray-100">
      
//       {/* 2. RENDER SIDEBAR */}
//       <Sidebar 
//         user={user}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         handleLogout={handleLogout}

//         // Editing State Setters (for menu navigation)
//         setEditingCustomer={setEditingCustomer}
//         setEditingVendor={setEditingVendor}
//         setEditingEmployee={setEditingEmployee}
//         setEditingItem={setEditingItem}
//         setEditingCostSheet={setEditingCostSheet}
//         setEditingSystemPO={setEditingSystemPO}
//         setEditingTna={setEditingTna}
//         setEditingVendorPO={setEditingVendorPO}
//         setEditingDailyProductionReport={setEditingDailyProductionReport}

//         // Dropdown States and Handlers (passed directly)
//         isCustomerDropdownOpen={isCustomerDropdownOpen} openCustomerDropdown={openCustomerDropdown} closeCustomerDropdownWithDelay={closeCustomerDropdownWithDelay}
//         isVendorDropdownOpen={isVendorDropdownOpen} openVendorDropdown={openVendorDropdown} closeVendorDropdownWithDelay={closeVendorDropdownWithDelay}
//         isEmployeeDropdownOpen={isEmployeeDropdownOpen} openEmployeeDropdown={openEmployeeDropdown} closeEmployeeDropdownWithDelay={closeEmployeeDropdownWithDelay}
//         isItemMasterDropdownOpen={isItemMasterDropdownOpen} openItemDropdown={openItemDropdown} closeItemDropdownWithDelay={closeItemDropdownWithDelay}
//         isUserManagementDropdownOpen={isUserManagementDropdownOpen} openUserManagementDropdown={openUserManagementDropdown} closeUserManagementDropdownWithDelay={closeUserManagementDropdownWithDelay}
//         isCostSheetDropdownOpen={isCostSheetDropdownOpen} openCostSheetDropdown={openCostSheetDropdown} closeCostSheetDropdownWithDelay={closeCostSheetDropdownWithDelay}
//         isSystemPODropdownOpen={isSystemPODropdownOpen} openSystemPODropdown={openSystemPODropdown} closeSystemPODropdownWithDelay={closeSystemPODropdownWithDelay}
//         isTnaDropdownOpen={isTnaDropdownOpen} openTnaDropdown={openTnaDropdown} closeTnaDropdownWithDelay={closeTnaDropdownWithDelay}
//         isVendorPODropdownOpen={isVendorPODropdownOpen} openVendorPODropdown={openVendorPODropdown} closeVendorPODropdownWithDelay={closeVendorPODropdownWithDelay}
//         isDailyProductionReportDropdownOpen={isDailyProductionReportDropdownOpen} openDailyProductionReportDropdown={openDailyProductionReportDropdown} closeDailyProductionReportDropdownWithDelay={closeDailyProductionReportDropdownWithDelay}
//       />

//       {/* 3. RENDER MAIN CONTENT ROUTER */}
//       <AppRouter
//         user={user}
//         activeTab={activeTab}
        
//         // Editing Objects (Data)
//         editingCustomer={editingCustomer} editingVendor={editingVendor} editingEmployee={editingEmployee} editingItem={editingItem} 
//         editingCostSheet={editingCostSheet} editingSystemPO={editingSystemPO} editingTna={editingTna} editingVendorPO={editingVendorPO} 
//         editingDailyProductionReport={editingDailyProductionReport}
        
//         // Save Handlers
//         handleCustomerSaved={handleCustomerSaved} handleVendorSaved={handleVendorSaved} handleEmployeeSaved={handleEmployeeSaved} handleItemSaved={handleItemSaved} 
//         handleCostSheetSaved={handleCostSheetSaved} handleSystemPOSaved={handleSystemPOSaved} handleTnaSaved={handleTnaSaved} handleVendorPOSaved={handleVendorPOSaved} 
//         handleDailyProductionReportSaved={handleDailyProductionReportSaved}
        
//         // Edit Handlers
//         handleEditCustomer={handleEditCustomer} handleEditVendor={handleEditVendor} handleEditEmployee={handleEditEmployee} handleEditItem={handleEditItem} 
//         handleEditCostSheet={handleEditCostSheet} handleEditSystemPO={handleEditSystemPO} handleEditTna={handleEditTna} handleEditVendorPO={handleEditVendorPO} 
//         handleEditDailyProductionReport={handleEditDailyProductionReport}
//       />
//     </div>
//   );
// };

// export default App;

//////////////

// src/App.js - The CLEANED UP Code

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- Imports ---
import LoginScreen from './components/LoginScreen'; 
import Sidebar from './components/Sidebar';         
import AppRouter from './components/AppRouter';     

const App = () => {
  const API_BASE_URL = 'http://localhost:4000';

  // --- State Variables (KEEP) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // DELETED CODE BLOCK: All Editing States are now managed inside the *Master.js components.
  // The following lines MUST be DELETED:
  /*
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null); 
  const [editingCostSheet, setEditingCostSheet] = useState(null);
  const [editingSystemPO, setEditingSystemPO] = useState(null);
  const [editingTna, setEditingTna] = useState(null);
  const [editingVendorPO, setEditingVendorPO] = useState(null);
  const [editingDailyProductionReport, setEditingDailyProductionReport] = useState(null);
  */

  // Dropdown States (KEEP - as they are specific to the Sidebar UI)
  const [isItemMasterDropdownOpen, setIsItemMasterDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false); 
  const [isUserManagementDropdownOpen, setIsUserManagementDropdownOpen] = useState(false);
  const [isCostSheetDropdownOpen, setIsCostSheetDropdownOpen] = useState(false);
  const [isSystemPODropdownOpen, setIsSystemPODropdownOpen] = useState(false);
  const [isTnaDropdownOpen, setIsTnaDropdownOpen] = useState(false);
  const [isVendorPODropdownOpen, setIsVendorPODropdownOpen] = useState(false);
  const [isDailyProductionReportDropdownOpen, setIsDailyProductionReportDropdownOpen] = useState(false);

  // Timeout Refs for Dropdowns (KEEP - specific to the Sidebar UI)
  const customerCloseTimeoutRef = useRef(null);
  const vendorCloseTimeoutRef = useRef(null);
  const employeeCloseTimeoutRef = useRef(null);
  const itemCloseTimeoutRef = useRef(null);
  const userManagementCloseTimeoutRef = useRef(null);
  const costSheetCloseTimeoutRef = useRef(null);
  const systemPOCloseTimeoutRef = useRef(null);
  const tnaCloseTimeoutRef = useRef(null);
  const vendorPOCloseTimeoutRef = useRef(null);
  const dailyProductionReportCloseTimeoutRef = useRef(null);

  
  // --- useEffect (Session Check & Cleanup) ---
  useEffect(() => {
    const checkSession = async () => {
      // ... (Your session check logic remains here)
      try {
        const response = await fetch(`${API_BASE_URL}/session`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkSession();

    return () => {
      // Keep all clearTimeout calls
      clearTimeout(customerCloseTimeoutRef.current);
      clearTimeout(vendorCloseTimeoutRef.current);
      clearTimeout(employeeCloseTimeoutRef.current);
      clearTimeout(itemCloseTimeoutRef.current);
      clearTimeout(userManagementCloseTimeoutRef.current);
      clearTimeout(costSheetCloseTimeoutRef.current);
      clearTimeout(systemPOCloseTimeoutRef.current);
      clearTimeout(tnaCloseTimeoutRef.current);
      clearTimeout(vendorPOCloseTimeoutRef.current);
      clearTimeout(dailyProductionReportCloseTimeoutRef.current);
    };
  }, []);

  // --- Login/Logout Handlers (KEEP) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    // ... (rest of handleLogin logic)
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
        setLoginError('');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setIsLoggedIn(false);
    setUser(null);
    setUsername('');
    setPassword('');
    setActiveTab('Home');
  };

  // DELETED CODE BLOCK: All Handlers for saving and editing are now inside *Master.js
  // The following lines MUST be DELETED:
  /*
  const handleEmployeeSaved = () => { setEditingEmployee(null); setActiveTab('EmployeeList'); };
  const handleEditEmployee = (employee) => { setEditingEmployee({ ...employee }); setActiveTab('EmployeeForm'); };
  const handleCustomerSaved = () => { setEditingCustomer(null); setActiveTab('CustomerList'); };
  const handleEditCustomer = (customer) => { setEditingCustomer(customer); setActiveTab('CustomerForm'); };
  const handleItemSaved = () => { setEditingItem(null); setActiveTab('ItemList'); };
  const handleEditItem = (item) => { setEditingItem(item); setActiveTab('ItemForm'); };
  const handleVendorSaved = () => { setEditingVendor(null); setActiveTab('VendorList'); }; 
  const handleEditVendor = (vendor) => { setEditingVendor(vendor); setActiveTab('VendorForm'); }; 
  const handleCostSheetSaved = () => { setEditingCostSheet(null); setActiveTab('CostSheetList'); };
  const handleEditCostSheet = (costSheet) => { setEditingCostSheet(costSheet);  setActiveTab('CostSheetForm'); };
  const handleSystemPOSaved = () => { setEditingSystemPO(null);  setActiveTab('SystemPOList'); };
  const handleEditSystemPO = (systemPO) => { setEditingSystemPO(systemPO); setActiveTab('SystemPOForm'); };
  const handleTnaSaved = () => { setEditingTna(null); setActiveTab('TnaList'); };
  const handleEditTna = (tna) => { setEditingTna(tna); setActiveTab('TnaForm'); };
  const handleVendorPOSaved = () => {setEditingVendorPO(null);setActiveTab('VendorPOList');};
  const handleEditVendorPO = (vendorPO) => {setEditingVendorPO(vendorPO);setActiveTab('VendorPOForm');};
  const handleDailyProductionReportSaved = () => {setEditingDailyProductionReport(null);setActiveTab('DailyProductionReportList');};
  const handleEditDailyProductionReport = (report) => {setEditingDailyProductionReport(report);setActiveTab('DailyProductionReportForm');};
  */

  // --- Dropdowns Handlers (KEEP - as they are used by the Sidebar) ---
  const openCustomerDropdown = () => { clearTimeout(customerCloseTimeoutRef.current); setIsCustomerDropdownOpen(true); };
  const closeCustomerDropdownWithDelay = () => { clearTimeout(customerCloseTimeoutRef.current); customerCloseTimeoutRef.current = setTimeout(() => setIsCustomerDropdownOpen(false), 150); };
  const openVendorDropdown = () => { clearTimeout(vendorCloseTimeoutRef.current); setIsVendorDropdownOpen(true); };
  const closeVendorDropdownWithDelay = () => { clearTimeout(vendorCloseTimeoutRef.current); vendorCloseTimeoutRef.current = setTimeout(() => setIsVendorDropdownOpen(false), 150); };
  const openEmployeeDropdown = () => { clearTimeout(employeeCloseTimeoutRef.current); setIsEmployeeDropdownOpen(true); };
  const closeEmployeeDropdownWithDelay = () => { clearTimeout(employeeCloseTimeoutRef.current); employeeCloseTimeoutRef.current = setTimeout(() => setIsEmployeeDropdownOpen(false), 150); };
  const openItemDropdown = () => { clearTimeout(itemCloseTimeoutRef.current); setIsItemMasterDropdownOpen(true); };
  const closeItemDropdownWithDelay = () => { clearTimeout(itemCloseTimeoutRef.current); itemCloseTimeoutRef.current = setTimeout(() => setIsItemMasterDropdownOpen(false), 150); };
  const openUserManagementDropdown = () => { clearTimeout(userManagementCloseTimeoutRef.current); setIsUserManagementDropdownOpen(true); };
  const closeUserManagementDropdownWithDelay = () => { clearTimeout(userManagementCloseTimeoutRef.current); userManagementCloseTimeoutRef.current = setTimeout(() => setIsUserManagementDropdownOpen(false), 150); };
  const openCostSheetDropdown = () => { clearTimeout(costSheetCloseTimeoutRef.current); setIsCostSheetDropdownOpen(true);};
  const closeCostSheetDropdownWithDelay = () => {clearTimeout(costSheetCloseTimeoutRef.current);costSheetCloseTimeoutRef.current = setTimeout(() => setIsCostSheetDropdownOpen(false), 150);};
  const openSystemPODropdown = () => { clearTimeout(systemPOCloseTimeoutRef.current); setIsSystemPODropdownOpen(true); };
  const closeSystemPODropdownWithDelay = () => { clearTimeout(systemPOCloseTimeoutRef.current); systemPOCloseTimeoutRef.current = setTimeout(() => setIsSystemPODropdownOpen(false), 150); };
  const openTnaDropdown = () => { clearTimeout(tnaCloseTimeoutRef.current); setIsTnaDropdownOpen(true); };
  const closeTnaDropdownWithDelay = () => { clearTimeout(tnaCloseTimeoutRef.current); tnaCloseTimeoutRef.current = setTimeout(() => setIsTnaDropdownOpen(false), 150); };
  const openVendorPODropdown = () => {clearTimeout(vendorPOCloseTimeoutRef.current);setIsVendorPODropdownOpen(true);};
  const closeVendorPODropdownWithDelay = () => {clearTimeout(vendorPOCloseTimeoutRef.current);vendorPOCloseTimeoutRef.current = setTimeout(() => setIsVendorPODropdownOpen(false), 150);};
  const openDailyProductionReportDropdown = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);setIsDailyProductionReportDropdownOpen(true);};
  const closeDailyProductionReportDropdownWithDelay = () => {clearTimeout(dailyProductionReportCloseTimeoutRef.current);dailyProductionReportCloseTimeoutRef.current = setTimeout(() => setIsDailyProductionReportDropdownOpen(false),150);};

  // --- RENDER LOGIC ---

  if (!isLoggedIn) {
    return (
      <LoginScreen 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
        isLoading={isLoading}
      />
    );  
  }

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      
      {/* 2. RENDER SIDEBAR: CLEAN UP Props */}
      <Sidebar 
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}

        // DELETED: All setEditingXxx props are REMOVED (The Master components handle this now)
        /*
        setEditingCustomer={setEditingCustomer}
        setEditingVendor={setEditingVendor}
        setEditingEmployee={setEditingEmployee}
        setEditingItem={setEditingItem}
        setEditingCostSheet={setEditingCostSheet}
        setEditingSystemPO={setEditingSystemPO}
        setEditingTna={setEditingTna}
        setEditingVendorPO={setEditingVendorPO}
        setEditingDailyProductionReport={setEditingDailyProductionReport}
        */

        // Dropdown States and Handlers (KEEP)
        isCustomerDropdownOpen={isCustomerDropdownOpen} openCustomerDropdown={openCustomerDropdown} closeCustomerDropdownWithDelay={closeCustomerDropdownWithDelay}
        isVendorDropdownOpen={isVendorDropdownOpen} openVendorDropdown={openVendorDropdown} closeVendorDropdownWithDelay={closeVendorDropdownWithDelay}
        isEmployeeDropdownOpen={isEmployeeDropdownOpen} openEmployeeDropdown={openEmployeeDropdown} closeEmployeeDropdownWithDelay={closeEmployeeDropdownWithDelay}
        isItemMasterDropdownOpen={isItemMasterDropdownOpen} openItemDropdown={openItemDropdown} closeItemDropdownWithDelay={closeItemDropdownWithDelay}
        isUserManagementDropdownOpen={isUserManagementDropdownOpen} openUserManagementDropdown={openUserManagementDropdown} closeUserManagementDropdownWithDelay={closeUserManagementDropdownWithDelay}
        isCostSheetDropdownOpen={isCostSheetDropdownOpen} openCostSheetDropdown={openCostSheetDropdown} closeCostSheetDropdownWithDelay={closeCostSheetDropdownWithDelay}
        isSystemPODropdownOpen={isSystemPODropdownOpen} openSystemPODropdown={openSystemPODropdown} closeSystemPODropdownWithDelay={closeSystemPODropdownWithDelay}
        isTnaDropdownOpen={isTnaDropdownOpen} openTnaDropdown={openTnaDropdown} closeTnaDropdownWithDelay={closeTnaDropdownWithDelay}
        isVendorPODropdownOpen={isVendorPODropdownOpen} openVendorPODropdown={openVendorPODropdown} closeVendorPODropdownWithDelay={closeVendorPODropdownWithDelay}
        isDailyProductionReportDropdownOpen={isDailyProductionReportDropdownOpen} openDailyProductionReportDropdown={openDailyProductionReportDropdown} closeDailyProductionReportDropdownWithDelay={closeDailyProductionReportDropdownWithDelay}
      />

      {/* 3. RENDER MAIN CONTENT ROUTER: CLEAN UP Props */}
      <main className="flex-1 p-6">
          <AppRouter
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab} // CRITICAL: Must pass the setter to the Master components!
            
            // DELETED: All editing objects, save handlers, and edit handlers are REMOVED!
            /*
            editingCustomer={editingCustomer} editingVendor={editingVendor} editingEmployee={editingEmployee} editingItem={editingItem} 
            editingCostSheet={editingCostSheet} editingSystemPO={editingSystemPO} editingTna={editingTna} editingVendorPO={editingVendorPO} 
            editingDailyProductionReport={editingDailyProductionReport}
            
            handleCustomerSaved={handleCustomerSaved} handleVendorSaved={handleVendorSaved} handleEmployeeSaved={handleEmployeeSaved} handleItemSaved={handleItemSaved} 
            handleCostSheetSaved={handleCostSheetSaved} handleSystemPOSaved={handleSystemPOSaved} handleTnaSaved={handleTnaSaved} handleVendorPOSaved={handleVendorPOSaved} 
            handleDailyProductionReportSaved={handleDailyProductionReportSaved}
            
            handleEditCustomer={handleEditCustomer} handleEditVendor={handleEditVendor} handleEditEmployee={handleEditEmployee} handleEditItem={handleEditItem} 
            handleEditCostSheet={handleEditCostSheet} handleEditSystemPO={handleEditSystemPO} handleEditTna={handleEditTna} handleEditVendorPO={handleEditVendorPO} 
            handleEditDailyProductionReport={handleEditDailyProductionReport}
            */
          />
      </main>
    </div>
  );
};

export default App;