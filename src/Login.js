// // import React, { useState } from 'react';

// // // --- Main App Component ---
// // // This component manages the authentication state and renders the appropriate page.
// // const App = () => {
// //   // State to track if a user is logged in.
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   // State to store the user's role (e.g., 'admin' or 'user').
// //   const [userRole, setUserRole] = useState(null);

// //   // --- Login Component ---
// //   const Login = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [message, setMessage] = useState('');

// //     const handleLogin = async (e) => {
// //       e.preventDefault();
// //       setMessage('Logging in...');

// //       try {
// //         // In a real application, this would be a fetch call to your backend.
// //         // For this example, we'll simulate a login.
// //         if (username === 'admin' && password === 'admin') {
// //           setMessage('Login successful!');
// //           setIsLoggedIn(true);
// //           setUserRole('Admin');
// //         } else if (username === 'user' && password === 'user') {
// //           setMessage('Login successful!');
// //           setIsLoggedIn(true);
// //           setUserRole('User');
// //         } else {
// //           setMessage('Login failed. Invalid username or password.');
// //         }

// //       } catch (error) {
// //         console.error('Login error:', error);
// //         setMessage('Network error. Could not connect to the server.');
// //       }
// //     };

// //     return (
// //       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-100">
// //         <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl">
// //           <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h1>
// //           <form onSubmit={handleLogin} className="space-y-4">
// //             <div>
// //               <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
// //               <input
// //                 type="text"
// //                 id="username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter username"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter password"
// //                 required
// //               />
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full py-2 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
// //             >
// //               Log In
// //             </button>
// //             {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
// //           </form>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // --- Single Dashboard Component ---
// //   // This component renders the navigation bar and the conditional content.
// //   const Dashboard = ({ userRole, onLogout }) => {
// //     // State to manage the active module (e.g., 'home', 'customer-masters').
// //     const [activeModule, setActiveModule] = useState('home');

// //     // Navigation bar component.
// //     const TopNav = () => (
// //       <nav className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-xl">
// //         <ul className="flex flex-wrap space-x-4 text-sm font-semibold text-gray-600 sm:text-base">
// //           <li onClick={() => setActiveModule('home')} className="cursor-pointer hover:text-gray-900">Home</li>
// //           <li onClick={() => setActiveModule('customer-masters')} className="cursor-pointer hover:text-gray-900">Customer Masters</li>
// //           <li onClick={() => setActiveModule('vendor-masters')} className="cursor-pointer hover:text-gray-900">Vendor Masters</li>
// //           <li onClick={() => setActiveModule('item-masters')} className="cursor-pointer hover:text-gray-900">Item Masters</li>
// //           <li onClick={() => setActiveModule('system-po')} className="cursor-pointer hover:text-gray-900">System PO</li>
// //           <li onClick={() => setActiveModule('vendor-po')} className="cursor-pointer hover:text-gray-900">Vendor PO</li>
// //           <li onClick={() => setActiveModule('fabric-t&a')} className="cursor-pointer hover:text-gray-900">Fabric T&A</li>
// //         </ul>
// //         <button onClick={onLogout} className="text-sm text-gray-500 hover:text-red-500">Logout</button>
// //       </nav>
// //     );

// //     // Renders the specific content based on the active module and user role.
// //     const renderContent = () => {
// //       // Logic for the Home page, which differs by role.
// //       if (activeModule === 'home') {
// //         if (userRole === 'Admin') {
// //           return (
// //             <div className="p-4 md:p-8">
// //               <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
// //               <div className="p-6 bg-white shadow-lg rounded-xl">
// //                 <h2 className="mb-4 text-xl font-semibold text-gray-700">Production Team Activity Board</h2>
// //                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //                   <div className="p-4 text-center text-white bg-blue-500 rounded-xl">
// //                     <p className="mb-1 text-4xl font-extrabold">446</p>
// //                     <p className="text-sm font-light">Total Vendor POs</p>
// //                   </div>
// //                   <div className="p-4 text-center text-white bg-purple-500 rounded-xl">
// //                     <p className="mb-1 text-4xl font-extrabold">107</p>
// //                     <p className="text-sm font-light">Vendor POs for Garmenting</p>
// //                   </div>
// //                   <div className="p-4 text-center text-white bg-cyan-500 rounded-xl">
// //                     <p className="mb-1 text-4xl font-extrabold">42</p>
// //                     <p className="text-sm font-light">Vendor POs for Purchases</p>
// //                   </div>
// //                 </div>
// //                 <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
// //                   <div className="p-4 text-center text-white bg-orange-500 rounded-xl">
// //                     <p className="mb-1 text-4xl font-extrabold">389</p>
// //                     <p className="text-sm font-light">Pending Vendor POs</p>
// //                   </div>
// //                   <div className="p-4 text-center text-white bg-green-500 rounded-xl">
// //                     <p className="mb-1 text-4xl font-extrabold">38</p>
// //                     <p className="text-sm font-light">Completed Vendor POs</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         } else if (userRole === 'User') {
// //           return (
// //             <div className="p-4 md:p-8">
// //               <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">User Dashboard</h1>
// //               <div className="p-6 text-center bg-white shadow-lg rounded-xl">
// //                 <p className="text-xl text-gray-700">Welcome to your dashboard!</p>
// //                 <p className="mt-2 text-gray-500">You have limited access as a regular user.</p>
// //               </div>
// //             </div>
// //           );
// //         }
// //       }

// //       // Logic for all other modules. These can be the same for all roles.
// //       const moduleName = activeModule.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// //       return (
// //         <div className="p-4 md:p-8">
// //           <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">{moduleName}</h1>
// //           <div className="p-6 text-center bg-white shadow-lg rounded-xl">
// //             <p>Content for the {moduleName} module goes here.</p>
// //           </div>
// //         </div>
// //       );
// //     };

// //     return (
// //       <div className="min-h-screen font-sans bg-gray-100">
// //         <TopNav />
// //         {renderContent()}
// //       </div>
// //     );
// //   };

// //   // --- Main Render Logic ---
// //   // Conditionally render the login page or the dashboard based on state.
// //   if (!isLoggedIn) {
// //     return <Login />;
// //   }

// //   // Once logged in, render the single Dashboard component with the user's role.
// //   return <Dashboard userRole={userRole} onLogout={() => { setIsLoggedIn(false); setUserRole(null); }} />;
// // };

// // export default App;


// //..........................


// // src/App.js

// import React, { useState } from 'react';
// import axios from 'axios'; // You'll need to install axios: npm install axios

// // --- Main App Component ---
// // This component manages the authentication state and renders the appropriate page.
// const App = () => {
//   // State to track if a user is logged in.
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // State to store the user's role (e.g., 'admin' or 'user').
//   const [userRole, setUserRole] = useState(null);
//   // State to store the JWT token
//   const [authToken, setAuthToken] = useState(null);

//   // --- Login Component ---
//   const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const API_BASE_URL = 'http://localhost:4000'; // Ensure this matches your backend URL

//     const handleLogin = async (e) => {
//       e.preventDefault();
//       setMessage('Logging in...');

//       try {
//         const response = await axios.post(`${API_BASE_URL}/login`, {
//           username,
//           password
//         });
        
//         // On successful login, the backend will return the user and a token
//         if (response.status === 200) {
//           const { user, token } = response.data;
//           setMessage('Login successful!');
//           setIsLoggedIn(true);
//           setUserRole(user.role);
//           setAuthToken(token); // Store the token in state
//           localStorage.setItem('authToken', token); // Optional: Store token in local storage for persistence
//         }

//       } catch (error) {
//         console.error('Login error:', error);
//         // Handle different error responses from the server
//         if (error.response && error.response.status === 401) {
//             setMessage('Login failed. Invalid username or password.');
//         } else {
//             setMessage('Network error. Could not connect to the server.');
//         }
//       }
//     };

//     return (
//       <div className="flex items-center justify-center min-h-screen font-sans bg-gray-100">
//         <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl">
//           <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h1>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter username"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Log In
//             </button>
//             {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
//           </form>
//         </div>
//       </div>
//     );
//   };

//   // --- Single Dashboard Component ---
//   const Dashboard = ({ userRole, onLogout }) => {
//     // State to manage the active module.
//     const [activeModule, setActiveModule] = useState('home');

//     // Navigation bar component.
//     const TopNav = () => (
//       <nav className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-xl">
//         <ul className="flex flex-wrap space-x-4 text-sm font-semibold text-gray-600 sm:text-base">
//           <li onClick={() => setActiveModule('home')} className="cursor-pointer hover:text-gray-900">Home</li>
//           <li onClick={() => setActiveModule('customer-masters')} className="cursor-pointer hover:text-gray-900">Customer Masters</li>
//           <li onClick={() => setActiveModule('vendor-masters')} className="cursor-pointer hover:text-gray-900">Vendor Masters</li>
//           <li onClick={() => setActiveModule('item-masters')} className="cursor-pointer hover:text-gray-900">Item Masters</li>
//           <li onClick={() => setActiveModule('system-po')} className="cursor-pointer hover:text-gray-900">System PO</li>
//           <li onClick={() => setActiveModule('vendor-po')} className="cursor-pointer hover:text-gray-900">Vendor PO</li>
//           <li onClick={() => setActiveModule('fabric-t&a')} className="cursor-pointer hover:text-gray-900">Fabric T&A</li>
//         </ul>
//         <button onClick={onLogout} className="text-sm text-gray-500 hover:text-red-500">Logout</button>
//       </nav>
//     );

//     // Renders the specific content based on the active module and user role.
//     const renderContent = () => {
//       // ... (no changes here from your original code)
//       if (activeModule === 'home') {
//         if (userRole === 'Admin') {
//           return (
//             <div className="p-4 md:p-8">
//               <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>
//               <div className="p-6 bg-white shadow-lg rounded-xl">
//                 <h2 className="mb-4 text-xl font-semibold text-gray-700">Production Team Activity Board</h2>
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                   <div className="p-4 text-center text-white bg-blue-500 rounded-xl">
//                     <p className="mb-1 text-4xl font-extrabold">446</p>
//                     <p className="text-sm font-light">Total Vendor POs</p>
//                   </div>
//                   <div className="p-4 text-center text-white bg-purple-500 rounded-xl">
//                     <p className="mb-1 text-4xl font-extrabold">107</p>
//                     <p className="text-sm font-light">Vendor POs for Garmenting</p>
//                   </div>
//                   <div className="p-4 text-center text-white bg-cyan-500 rounded-xl">
//                     <p className="mb-1 text-4xl font-extrabold">42</p>
//                     <p className="text-sm font-light">Vendor POs for Purchases</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
//                   <div className="p-4 text-center text-white bg-orange-500 rounded-xl">
//                     <p className="mb-1 text-4xl font-extrabold">389</p>
//                     <p className="text-sm font-light">Pending Vendor POs</p>
//                   </div>
//                   <div className="p-4 text-center text-white bg-green-500 rounded-xl">
//                     <p className="mb-1 text-4xl font-extrabold">38</p>
//                     <p className="text-sm font-light">Completed Vendor POs</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         } else if (userRole === 'User') {
//           return (
//             <div className="p-4 md:p-8">
//               <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">User Dashboard</h1>
//               <div className="p-6 text-center bg-white shadow-lg rounded-xl">
//                 <p className="text-xl text-gray-700">Welcome to your dashboard!</p>
//                 <p className="mt-2 text-gray-500">You have limited access as a regular user.</p>
//               </div>
//             </div>
//           );
//         }
//       }

//       // Logic for all other modules. These can be the same for all roles.
//       const moduleName = activeModule.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//       return (
//         <div className="p-4 md:p-8">
//           <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">{moduleName}</h1>
//           <div className="p-6 text-center bg-white shadow-lg rounded-xl">
//             <p>Content for the {moduleName} module goes here.</p>
//           </div>
//         </div>
//       );
//     };

//     return (
//       <div className="min-h-screen font-sans bg-gray-100">
//         <TopNav />
//         {renderContent()}
//       </div>
//     );
//   };

//   // --- Main Render Logic ---
//   // Conditionally render the login page or the dashboard based on state.
//   if (!isLoggedIn) {
//     return <Login />;
//   }

//   // Once logged in, render the single Dashboard component with the user's role.
//   return <Dashboard userRole={userRole} onLogout={() => { setIsLoggedIn(false); setUserRole(null); }} />;
// };

// export default App;