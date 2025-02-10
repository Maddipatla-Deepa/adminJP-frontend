// import React, { useState, useEffect } from 'react';
// import { UserService, User, CreateUserInput } from '../services/UserService';
// import { UserRole } from '../components/types'; // Define this in your types file

// // Modal Component for Add/Edit User
// const UserModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (userData: CreateUserInput) => void;
//   initialData?: Partial<CreateUserInput>;
// }> = ({ isOpen, onClose, onSubmit, initialData }) => {
//   const [username, setUsername] = useState(''); // Always start empty
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.USER);
//   const [allowedPages, setAllowedPages] = useState<string[]>([]);

//   useEffect(() => {
//     if (isOpen) {
//       // Reset to defaults when modal opens
//       if (initialData) {
//         setUsername(initialData.username || '');
//         setPassword('********');
//         setRole(initialData.role || UserRole.USER);
//         setAllowedPages(initialData.allowedPages || []);
//       } else {
//         // Clear all fields for new user
//         setUsername('');
//         setPassword('');
//         setRole(UserRole.USER);
//         setAllowedPages([]);
//       }
//     }
//   }, [isOpen, initialData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Only send password if it's changed or a new user
//     const userData: CreateUserInput = {
//       username, 
//       ...(password !== '********' || !initialData ? { password } : {}),
//       role, 
//       allowedPages
//     };
//     onSubmit(userData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg w-96">
//         <h2 className="text-2xl mb-4">{initialData ? 'Edit User' : 'Add User'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Username</label>
//             <input 
//               type="text" 
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="off"
//               className="w-full px-3 py-2 border rounded"
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Password</label>
//             <input 
//               type="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="new-password"
//               className="w-full px-3 py-2 border rounded"
//               required={!initialData}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Role</label>
//             <select 
//               value={role}
//               onChange={(e) => setRole(e.target.value as UserRole)}
//               className="w-full px-3 py-2 border rounded"
//             >
//               {Object.values(UserRole).map(roleOption => (
//                 <option key={roleOption} value={roleOption}>
//                   {roleOption}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Allowed Pages</label>
//             <input 
//               type="text" 
//               value={allowedPages.join(', ')}
//               onChange={(e) => setAllowedPages(e.target.value.split(',').map(page => page.trim()))}
//               className="w-full px-3 py-2 border rounded"
//               placeholder="Enter pages separated by comma"
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button 
//               type="button" 
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               {initialData ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Users Page Component
// const UsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

//   // Fetch users on component mount
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const fetchedUsers = await UserService.getAllUsers();
//       setUsers(fetchedUsers);
//     } catch (error) {
//       console.error('Failed to fetch users', error);
//     }
//   };

//   const handleAddUser = async (userData: CreateUserInput) => {
//     try {
//       await UserService.createUser(userData);
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to add user', error);
//     }
//   };

//   const handleEditUser = async (userData: Partial<CreateUserInput>) => {
//     if (selectedUser?._id) {
//       try {
//         await UserService.updateUser(selectedUser._id, userData);
//         fetchUsers();
//         setSelectedUser(undefined);
//       } catch (error) {
//         console.error('Failed to update user', error);
//       }
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await UserService.deleteUser(userId);
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to delete user', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add User
//         </button>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow-md rounded">
//         <table className="w-full">
//           <thead className="bg-gray-800 text-white border-b">
//             <tr>
//               <th className="p-3 text-left">Username</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Allowed Pages</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{user.username}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{user.allowedPages.join(', ')}</td>
//                 <td className="p-3 text-center">
//                   <div className="flex justify-center space-x-2">
//                     <button 
//                       onClick={() => {
//                         setSelectedUser(user);
//                         setIsModalOpen(true);
//                       }}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteUser(user._id!)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit User Modal */}
//       <UserModal 
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedUser(undefined);
//         }}
//         onSubmit={selectedUser ? handleEditUser : handleAddUser}
//         initialData={selectedUser}
//       />
//     </div>
//   );
// };

// export default UsersPage;

// import React, { useState, useEffect } from 'react';
// import { Edit2, Trash2, PlusCircle, Edit, Plus } from 'lucide-react';
// import { UserService, User, CreateUserInput } from '../services/UserService';
// import { UserRole } from '../components/types';

// const UserModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (userData: CreateUserInput) => void; initialData?: Partial<CreateUserInput>; }> = ({ isOpen, onClose, onSubmit, initialData }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.USER);
//   const [allowedPages, setAllowedPages] = useState<string[]>([]);

//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         setUsername(initialData.username || '');
//         setPassword('********');
//         setRole(initialData.role || UserRole.USER);
//         setAllowedPages(initialData.allowedPages || []);
//       } else {
//         setUsername('');
//         setPassword('');
//         setRole(UserRole.USER);
//         setAllowedPages([]);
//       }
//     }
//   }, [isOpen, initialData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const userData: CreateUserInput = { 
//       username, 
//       ...(password !== '********' || !initialData ? { password } : {}), 
//       role, 
//       allowedPages 
//     };
//     onSubmit(userData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg w-96">
//         <h2 className="text-2xl mb-4">{initialData ? 'Edit User' : 'Add User'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Username</label>
//             <input 
//               type="text" 
//               value={username} 
//               onChange={(e) => setUsername(e.target.value)} 
//               autoComplete="off" 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Password</label>
//             <input 
//               type="password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               autoComplete="new-password" 
//               className="w-full px-3 py-2 border rounded" 
//               required={!initialData} 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Role</label>
//             <select 
//               value={role} 
//               onChange={(e) => setRole(e.target.value as UserRole)} 
//               className="w-full px-3 py-2 border rounded"
//             >
//               {Object.values(UserRole).map(roleOption => (
//                 <option key={roleOption} value={roleOption}>
//                   {roleOption}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Allowed Pages</label>
//             <input 
//               type="text" 
//               value={allowedPages.join(', ')} 
//               onChange={(e) => setAllowedPages(e.target.value.split(',').map(page => page.trim()))} 
//               className="w-full px-3 py-2 border rounded" 
//               placeholder="Enter pages separated by comma" 
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button 
//               type="button" 
//               onClick={onClose} 
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               {initialData ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const UsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const fetchedUsers = await UserService.getAllUsers();
//       setUsers(fetchedUsers);
//     } catch (error) {
//       console.error('Failed to fetch users', error);
//     }
//   };

//   const handleAddUser = async (userData: CreateUserInput) => {
//     try {
//       await UserService.createUser(userData);
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to add user', error);
//     }
//   };

//   const handleEditUser = async (userData: Partial<CreateUserInput>) => {
//     if (selectedUser?._id) {
//       try {
//         await UserService.updateUser(selectedUser._id, userData);
//         fetchUsers();
//         setSelectedUser(undefined);
//       } catch (error) {
//         console.error('Failed to update user', error);
//       }
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await UserService.deleteUser(userId);
//       fetchUsers();
//     } catch (error) {
//       console.error('Failed to delete user', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <button 
//           onClick={() => setIsModalOpen(true)} 
//           className="flex items-center text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600"
//         >
//           <Plus className="mr-2" size={17} />
//           Add User
//         </button>
//       </div>
//       <div className="bg-white shadow-md rounded">
//         <table className="w-full">
//           <thead className="bg-gray-800 text-white border-b">
//             <tr>
//               <th className="p-3 text-left">Username</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Allowed Pages</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{user.username}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{user.allowedPages.join(', ')}</td>
//                 <td className="p-3 text-center">
//                   <div className="flex justify-center space-x-2">
//                     <button 
//                       onClick={() => { 
//                         setSelectedUser(user); 
//                         setIsModalOpen(true); 
//                       }} 
//                       className="text-blue-500 hover:text-blue-600 p-1 rounded hover:bg-blue-50"
//                     >
//                       <Edit size={17} />
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteUser(user._id!)} 
//                       className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <UserModal 
//         isOpen={isModalOpen} 
//         onClose={() => { 
//           setIsModalOpen(false); 
//           setSelectedUser(undefined); 
//         }} 
//         onSubmit={selectedUser ? handleEditUser : handleAddUser} 
//         initialData={selectedUser} 
//       />
//     </div>
//   );
// };

// export default UsersPage;

// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, Plus } from 'lucide-react';
// import { UserService, User, CreateUserInput, Role } from '../services/UserService';
// import { RoleService } from '../services/RoleService';

// // Multi-select dropdown component
// const MultiSelectDropdown = ({ 
//   options, 
//   selectedItems, 
//   onToggle, 
//   label 
// }: { 
//   options: string[]; 
//   selectedItems: string[]; 
//   onToggle: (item: string) => void; 
//   label: string; 
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mb-4 relative">
//       <label className="block mb-2">{label}</label>
//       <div 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="w-full border rounded px-3 py-2 flex justify-between items-center cursor-pointer"
//       >
//         <span>
//           {selectedItems.length 
//             ? `${selectedItems.length} selected` 
//             : 'Select options'}
//         </span>
//       </div>
//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
//           {options.map((option) => (
//             <label 
//               key={option} 
//               className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedItems.includes(option)}
//                 onChange={() => onToggle(option)}
//                 className="mr-2"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // User Modal Component
// const UserModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (userData: CreateUserInput) => void;
//   initialData?: Partial<User>;
//   roles: Role[];
// }> = ({ 
//   isOpen, 
//   onClose, 
//   onSubmit, 
//   initialData, 
//   roles 
// }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [allowedPages, setAllowedPages] = useState<string[]>([]);

//   useEffect(() => {
//     if (isOpen) {
//       if (initialData) {
//         setUsername(initialData.username || '');
//         setPassword('');
//         setRole(initialData.role || '');
//         setAllowedPages(initialData.allowedPages || []);
//       } else {
//         // Reset form for new user
//         setUsername('');
//         setPassword('');
//         setRole('');
//         setAllowedPages([]);
//       }
//     }
//   }, [isOpen, initialData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const userData: CreateUserInput = {
//       username, 
//       password: password || '********', 
//       role, 
//       allowedPages
//     };
//     onSubmit(userData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg w-96">
//         <h2 className="text-2xl mb-4">
//           {initialData ? 'Edit User' : 'Add User'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required={!initialData}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select Role</option>
//               {roles.map((r) => (
//                 <option key={r.roleName} value={r.roleName}>
//                   {r.roleName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <MultiSelectDropdown
//             options={role 
//               ? roles.find(r => r.roleName === role)?.allowedPages || [] 
//               : []}
//             selectedItems={allowedPages}
//             onToggle={(page) => 
//               setAllowedPages(prev => 
//                 prev.includes(page) 
//                   ? prev.filter(p => p !== page)
//                   : [...prev, page]
//               )
//             }
//             label="Allowed Pages"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               {initialData ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Main Users Page Component
// const UsersPage: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | undefined>();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [fetchedUsers, fetchedRoles] = await Promise.all([
//           UserService.getAllUsers(),
//           RoleService.getAllRoles()
//         ]);
//         setUsers(fetchedUsers);
//         setRoles(fetchedRoles);
//       } catch (error) {
//         console.error('Failed to fetch data', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddUser = async (userData: CreateUserInput) => {
//     try {
//       const newUser = await UserService.createUser(userData);
//       setUsers([...users, newUser]);
//     } catch (error) {
//       console.error('Failed to add user', error);
//     }
//   };

//   const handleEditUser = async (userData: Partial<CreateUserInput>) => {
//     if (selectedUser?._id) {
//       try {
//         const updatedUser = await UserService.updateUser(
//           selectedUser._id, 
//           userData
//         );
//         setUsers(users.map(u => 
//           u._id === selectedUser._id ? updatedUser : u
//         ));
//       } catch (error) {
//         console.error('Failed to update user', error);
//       }
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await UserService.deleteUser(userId);
//       setUsers(users.filter(u => u._id !== userId));
//     } catch (error) {
//       console.error('Failed to delete user', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
//         >
//           <Plus className="mr-2" /> Add User
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="p-3 text-left">Username</th>
//               <th className="p-3 text-left">Role</th>
//               <th className="p-3 text-left">Allowed Pages</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{user.username}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">{user.allowedPages.join(', ')}</td>
//                 <td className="p-3 text-center">
//                   <div className="flex justify-center space-x-2">
//                     <button
//                       onClick={() => {
//                         setSelectedUser(user);
//                         setIsModalOpen(true);
//                       }}
//                       className="text-blue-500 hover:text-blue-600"
//                     >
//                       <Edit size={17} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteUser(user._id!)}
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <UserModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedUser(undefined);
//         }}
//         onSubmit={selectedUser ? handleEditUser : handleAddUser}
//         initialData={selectedUser}
//         roles={roles}
//       />
//     </div>
//   );
// };

// export default UsersPage;


// import React, { useState, useEffect } from 'react';
// import { UserService } from '../services/UserService';
// import { RoleService, Role } from '../services/RoleService';
// import { Edit, Trash, Plus } from 'lucide-react';

// export interface User {
//   _id: string;
//   username: string;
//   roles: string[];
//   permissions: string[];
//   allowedPages: string[];
// }

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [newUser, setNewUser] = useState({
//     username: '',
//     password: '',
//     roles: [] as string[]
//   });

//   // Reset new user state when modal opens/closes
//   const resetNewUserState = () => {
//     setNewUser({
//       username: '',
//       password: '',
//       roles: []
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedUsers = await UserService.getAllUsers();
//         const fetchedRoles = await RoleService.getAllRoles();
//         setUsers(fetchedUsers);
//         setRoles(fetchedRoles);
//       } catch (error) {
//         console.error('Failed to fetch data', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCreateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const createdUser = await UserService.createUser(newUser);
//       setUsers([...users, createdUser]);
//       setShowAddModal(false);
//       resetNewUserState();
//     } catch (error) {
//       console.error('Failed to create user', error);
//     }
//   };

//   const handleEditUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentUser) return;
    
//     try {
//       const updateData: any = { roles: currentUser.roles };
//       // Only add password if it's not empty
//       if (currentUser.password) {
//         updateData.password = currentUser.password;
//       }
      
//       const updatedUser = await UserService.updateUser(currentUser._id, updateData);
      
//       setUsers(users.map(user => 
//         user._id === updatedUser._id ? updatedUser : user
//       ));
      
//       setShowEditModal(false);
//       setCurrentUser(null);
//     } catch (error) {
//       console.error('Failed to update user', error);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await UserService.deleteUser(userId);
//       setUsers(users.filter(user => user._id !== userId));
//     } catch (error) {
//       console.error('Failed to delete user', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">User Management</h2>
//         <button 
//           onClick={() => {
//             resetNewUserState();
//             setShowAddModal(true);
//           }}
//           className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           <Plus className="mr-2" /> Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Username
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Roles
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Permissions
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Allowed Pages
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="font-medium">{user.username}</span>
//                 </td>
//                 <td className="px-6 py-4">
//                 <div className="flex flex-wrap gap-1">
//                   {user.roles.map((role) => (
//                     <span key={role} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                       {role}
//                     </span>
//                   ))}
//                 </div>
//               </td>
//                 <td className="px-6 py-4">
//                   <div className="flex flex-wrap gap-1">
//                     {user.permissions.map((permission) => (
//                       <span 
//                         key={permission} 
//                         className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
//                       >
//                         {permission}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex flex-wrap gap-1">
//                     {user.allowedPages.map((page) => (
//                       <span 
//                         key={page} 
//                         className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
//                       >
//                         {page}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center">
//                   <div className="flex justify-center space-x-2">
//                     <button 
//                       onClick={() => {
//                         setCurrentUser(user);
//                         setShowEditModal(true);
//                       }} 
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <Edit size={18} />
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteUser(user._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <Trash size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Add New User</h2>
//             <form onSubmit={handleCreateUser}>
//               <div className="mb-4">
//                 <label className="block mb-2">Username</label>
//                 <input 
//                   type="text" 
//                   value={newUser.username}
//                   onChange={(e) => setNewUser({...newUser, username: e.target.value})}
//                   className="w-full border rounded px-3 py-2" 
//                   autoComplete="off"
//                   required 
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Password</label>
//                 <input 
//                   type="password" 
//                   value={newUser.password}
//                   onChange={(e) => setNewUser({...newUser, password: e.target.value})}
//                   className="w-full border rounded px-3 py-2" 
//                   autoComplete="new-password"
//                   required 
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Roles</label>
//                 <div className="max-h-48 overflow-y-auto border rounded p-2">
//                   {roles.map((role) => (
//                     <label key={role.roleName} className="flex items-center space-x-2 p-1">
//                       <input
//                         type="checkbox"
//                         checked={newUser.roles.includes(role.roleName)}
//                         onChange={(e) => {
//                           const updatedRoles = e.target.checked
//                             ? [...newUser.roles, role.roleName]
//                             : newUser.roles.filter(r => r !== role.roleName);
//                           setNewUser({ ...newUser, roles: updatedRoles });
//                         }}
//                         className="rounded"
//                       />
//                       <span>{role.roleName}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     setShowAddModal(false);
//                     resetNewUserState();
//                   }}
//                   className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Create User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit User Modal */}
//       {showEditModal && currentUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Edit User</h2>
//             <form onSubmit={handleEditUser}>
//               <div className="mb-4">
//                 <label className="block mb-2">Username</label>
//                 <input 
//                   type="text" 
//                   value={currentUser.username} 
//                   className="w-full border rounded px-3 py-2" 
//                   disabled 
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Password (Optional)</label>
//                 <input 
//                   type="password" 
//                   value={currentUser.password || ''}
//                   onChange={(e) => setCurrentUser({
//                     ...currentUser, 
//                     password: e.target.value
//                   })}
//                   className="w-full border rounded px-3 py-2" 
//                   placeholder="Leave blank to keep current password"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Roles</label>
//                 <div className="max-h-48 overflow-y-auto border rounded p-2">
//                   {roles.map((role) => (
//                     <label key={role.roleName} className="flex items-center space-x-2 p-1">
//                       <input
//                         type="checkbox"
//                         checked={currentUser.roles.includes(role.roleName)}
//                         onChange={(e) => {
//                           const updatedRoles = e.target.checked
//                             ? [...currentUser.roles, role.roleName]
//                             : currentUser.roles.filter(r => r !== role.roleName);
//                           setCurrentUser({ ...currentUser, roles: updatedRoles });
//                         }}
//                         className="rounded"
//                       />
//                       <span>{role.roleName}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     setShowEditModal(false);
//                     setCurrentUser(null);
//                   }}
//                   className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Update User
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import { RoleService, Role } from '../services/RoleService';
import { Edit, Trash, Plus, ChevronDown } from 'lucide-react';

export interface User {
  _id: string;
  username: string;
  roles: string[];
  permissions: string[];
  allowedPages: string[];
}

const MultiSelect: React.FC<{
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="border rounded px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selected.length > 0 ? (
            selected.map(item => (
              <span key={item} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {item}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Select roles...</span>
          )}
        </div>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center p-2 hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => {
                  const updatedSelection = e.target.checked
                    ? [...selected, option]
                    : selected.filter(item => item !== option);
                  onChange(updatedSelection);
                }}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    roles: [] as string[]
  });

  const resetNewUserState = () => {
    setNewUser({ username: '', password: '', roles: [] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await UserService.getAllUsers();
        const fetchedRoles = await RoleService.getAllRoles();
        setUsers(fetchedUsers);
        setRoles(fetchedRoles);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdUser = await UserService.createUser(newUser);
      setUsers([...users, createdUser]);
      setShowAddModal(false);
      resetNewUserState();
    } catch (error) {
      console.error('Failed to create user', error);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const updateData: any = { roles: currentUser.roles };
      if (currentUser.password) {
        updateData.password = currentUser.password;
      }
      const updatedUser = await UserService.updateUser(currentUser._id, updateData);
      setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
      setShowEditModal(false);
      setCurrentUser(null);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => {
            resetNewUserState();
            setShowAddModal(true);
          }}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="mr-2" /> Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allowed Pages
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium">{user.username}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <span key={role} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission) => (
                      <span key={permission} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.allowedPages.map((page) => (
                      <span key={page} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {page}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setCurrentUser(user);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Roles</label>
                <MultiSelect
                  options={roles.map(role => role.roleName)}
                  selected={newUser.roles}
                  onChange={(selected) => setNewUser({ ...newUser, roles: selected })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewUserState();
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditUser}>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={currentUser.username}
                  className="w-full border rounded px-3 py-2"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password (Optional)</label>
                <input
                  type="password"
                  value={currentUser.password || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Roles</label>
                <MultiSelect
                  options={roles.map(role => role.roleName)}
                  selected={currentUser.roles}
                  onChange={(selected) => setCurrentUser({ ...currentUser, roles: selected })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setCurrentUser(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;