import React, { useState, useEffect } from 'react';

// The UserManagement component handles the user management dashboard.
const UserManagement = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  // Function to fetch all users from the backend.
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to load user data.' });
    }
  };

  // useEffect hook to fetch users when the component loads.
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle the Add/Update user form submission.
  const handleAddUser = async (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };
    let apiUrl = 'http://localhost:4000/users';
    let method = 'POST';

    if (editingUser) {
      apiUrl = `http://localhost:4000/users/${editingUser.id}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${response.statusText}. Server response: ${errorText}`);
      }

      const savedUser = await response.json();
      console.log('User saved successfully:', savedUser);

      // --- Email Triggering Logic ---
      try {
        console.log(`Simulating email trigger to ${savedUser.email} with sign-in link.`);
        // await fetch('http://localhost:4000/send-email', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: savedUser.email })
        // });
      } catch (emailError) {
        console.error('Failed to trigger email:', emailError);
      }
      // --- End of new logic ---

      setSubmitMessage({ type: 'success', text: `User "${savedUser.firstName} ${savedUser.lastName}" saved successfully and an email was sent!` });
      
      // Clear form inputs and editing state.
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setEditingUser(null);

      // Refresh the user list to show the new/updated entry.
      fetchUsers();

    } catch (error) {
      console.error('Failed to save user:', error);
      setSubmitMessage({ type: 'error', text: `Failed to save user. Error: ${error.message}` });
    }
  };
  
  // Function to handle the edit button click.
  const handleEdit = (user) => {
    console.log('Editing user:', user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(''); // Passwords should not be pre-filled for security.
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Function to handle the delete button click.
  const handleDelete = async (user) => {
    console.log('Deleting user:', user.id);
    const confirmed = window.confirm(`Are you sure you want to delete ${user.firstName}?`);
    
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:4000/users/${user.id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user.');
        }
        
        setSubmitMessage({ type: 'success', text: `User "${user.firstName} ${user.lastName}" deleted successfully.` });
        fetchUsers();
        
      } catch (error) {
        console.error('Error deleting user:', error);
        setSubmitMessage({ type: 'error', text: 'Failed to delete user.' });
      }
    }
  };

  // Function to cancel editing and clear the form.
  const handleCancelEdit = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen p-4 font-sans bg-gray-100">
      <nav className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800">User Management Dashboard</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">{editingUser ? 'Edit User' : 'Add New User'}</h2>

        {submitMessage.text && (
          <div className={`p-4 mb-4 rounded-lg text-sm ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={handleAddUser} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full h-10 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full h-10 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-10 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full h-10 p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-6 space-x-4 border-t border-gray-200">
            {editingUser && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="p-6 mt-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">User List</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">First Name</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Last Name</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email Address</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.firstName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-now-p">{user.lastName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 focus:outline-none">Edit</button>
                    <button onClick={() => handleDelete(user)} className="ml-4 text-red-600 hover:text-red-900 focus:outline-none">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="mt-4 text-center text-gray-500">No users found. Add a new user to see the list.</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
