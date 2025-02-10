// import React, { useState, useEffect, useRef } from 'react';
// import { UserService } from '../services/UserService';
// import { RoleService, Role } from '../services/RoleService';
// import { ChevronDown, Plus, Edit, Trash, Trash2 } from 'lucide-react';

// // Predefined lists for permissions and pages
// const PERMISSIONS = ['create', 'read', 'update', 'delete', 'manage'];
// const ALLOWED_PAGES = ['students', 'company', 'departments'];

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
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="mb-4 relative" ref={dropdownRef}>
//       <label className="block mb-2">{label}</label>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full border rounded px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
//       >
//         <span className="truncate">
//           {selectedItems.length 
//             ? `${selectedItems.length} selected`
//             : 'Select options'}
//         </span>
//         <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </div>
//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
//           <div className="p-2 max-h-48 overflow-y-auto">
//             {options.map((option) => (
//               <label key={option} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(option)}
//                   onChange={() => onToggle(option)}
//                   className="mr-2"
//                   onClick={(e) => e.stopPropagation()}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//       {selectedItems.length > 0 && (
//         <div className="mt-2 flex flex-wrap gap-1">
//           {selectedItems.map((item) => (
//             <span
//               key={item}
//               className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const RoleManagement: React.FC = () => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [users, setUsers] = useState<any[]>([]);
//   const [showAddRoleModal, setShowAddRoleModal] = useState(false);
//   const [showEditRoleModal, setShowEditRoleModal] = useState(false);
//   const [currentEditRole, setCurrentEditRole] = useState<Role | null>(null);
//   const [newRole, setNewRole] = useState<Role>({
//     roleName: '',
//     permissions: [],
//     allowedPages: []
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedRoles = await RoleService.getAllRoles();
//         const fetchedUsers = await UserService.getAllUsers();
//         setRoles(fetchedRoles);
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error('Failed to fetch roles or users', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCreateRole = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const createdRole = await RoleService.createRole(newRole);
//       setRoles([...roles, createdRole]);
//       setShowAddRoleModal(false);
//       setNewRole({ roleName: '', permissions: [], allowedPages: [] });
//     } catch (error) {
//       console.error('Failed to create role', error);
//     }
//   };

//   const handleUpdateRole = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentEditRole) return;
//     try {
//       const updatedRole = await RoleService.updateRole(currentEditRole.roleName, currentEditRole);
//       setRoles(roles.map(role => 
//         role.roleName === currentEditRole.roleName ? updatedRole : role
//       ));
//       setShowEditRoleModal(false);
//       setCurrentEditRole(null);
//     } catch (error) {
//       console.error('Failed to update role', error);
//     }
//   };

//   const handleDeleteRole = async (roleName: string) => {
//     try {
//       await RoleService.deleteRole(roleName);
//       setRoles(roles.filter(role => role.roleName !== roleName));
//     } catch (error) {
//       console.error('Failed to delete role', error);
//     }
//   };

//   const getUsersForRole = (roleName: string) => {
//     return users.filter(user => user.role === roleName.toLowerCase());
//   };

//   const togglePermission = (permission: string, isForEdit: boolean = false) => {
//     if (isForEdit && currentEditRole) {
//       setCurrentEditRole(prev => ({
//         ...prev!,
//         permissions: prev!.permissions.includes(permission)
//           ? prev!.permissions.filter(p => p !== permission)
//           : [...prev!.permissions, permission]
//       }));
//     } else {
//       setNewRole(prev => ({
//         ...prev,
//         permissions: prev.permissions.includes(permission)
//           ? prev.permissions.filter(p => p !== permission)
//           : [...prev.permissions, permission]
//       }));
//     }
//   };

//   const toggleAllowedPage = (page: string, isForEdit: boolean = false) => {
//     if (isForEdit && currentEditRole) {
//       setCurrentEditRole(prev => ({
//         ...prev!,
//         allowedPages: prev!.allowedPages.includes(page)
//           ? prev!.allowedPages.filter(p => p !== page)
//           : [...prev!.allowedPages, page]
//       }));
//     } else {
//       setNewRole(prev => ({
//         ...prev,
//         allowedPages: prev.allowedPages.includes(page)
//           ? prev.allowedPages.filter(p => p !== page)
//           : [...prev.allowedPages, page]
//       }));
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Role Management</h2>
//         <button
//           onClick={() => setShowAddRoleModal(true)}
//           className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           <Plus className="mr-2" /> Add Role
//         </button>
//       </div>

//       {/* Role List */}
//       <div className="space-y-4">
//         {roles.map((role) => (
//           <div key={role.roleName} className="border rounded-lg p-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">{role.roleName}</h3>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => {
//                     setCurrentEditRole(role);
//                     setShowEditRoleModal(true);
//                   }}
//                   className="text-blue-500 hover:text-blue-600 p-1 rounded hover:bg-blue-50"
//                 >
//                   <Edit size={19} />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteRole(role.roleName)}
//                   className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
//                 >
//                   <Trash2 size={19} />
//                 </button>
//               </div>
//             </div>
//             <div className="mt-2">
//               <p><strong>Permissions:</strong> {role.permissions.join(', ')}</p>
//               <p><strong>Allowed Pages:</strong> {role.allowedPages.join(', ')}</p>
//               <div className="mt-2">
//                 <strong>Users:</strong> {getUsersForRole(role.roleName).length > 0
//                   ? getUsersForRole(role.roleName).map(user => user.username).join(', ')
//                   : 'No users assigned'}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Role Modal */}
//       {showAddRoleModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Add New Role</h2>
//             <form onSubmit={handleCreateRole}>
//               <div className="mb-4">
//                 <label className="block mb-2">Role Name</label>
//                 <input
//                   type="text"
//                   value={newRole.roleName}
//                   onChange={(e) => setNewRole({...newRole, roleName: e.target.value})}
//                   className="w-full border rounded px-3 py-2"
//                   required
//                 />
//               </div>
              
//               <MultiSelectDropdown
//                 options={PERMISSIONS}
//                 selectedItems={newRole.permissions}
//                 onToggle={(perm) => togglePermission(perm)}
//                 label="Permissions"
//               />

//               <MultiSelectDropdown
//                 options={ALLOWED_PAGES}
//                 selectedItems={newRole.allowedPages}
//                 onToggle={(page) => toggleAllowedPage(page)}
//                 label="Allowed Pages"
//               />

//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddRoleModal(false)}
//                   className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Create Role
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Role Modal */}
//       {showEditRoleModal && currentEditRole && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Edit Role</h2>
//             <form onSubmit={handleUpdateRole}>
//               <div className="mb-4">
//                 <label className="block mb-2">Role Name</label>
//                 <input
//                   type="text"
//                   value={currentEditRole.roleName}
//                   onChange={(e) => setCurrentEditRole({...currentEditRole, roleName: e.target.value})}
//                   className="w-full border rounded px-3 py-2"
//                   required
//                   disabled
//                 />
//               </div>

//               <MultiSelectDropdown
//                 options={PERMISSIONS}
//                 selectedItems={currentEditRole.permissions}
//                 onToggle={(perm) => togglePermission(perm, true)}
//                 label="Permissions"
//               />

//               <MultiSelectDropdown
//                 options={ALLOWED_PAGES}
//                 selectedItems={currentEditRole.allowedPages}
//                 onToggle={(page) => toggleAllowedPage(page, true)}
//                 label="Allowed Pages"
//               />

//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditRoleModal(false)}
//                   className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Update Role
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleManagement;


import React, { useState, useEffect, useRef } from 'react';
import { UserService } from '../services/UserService';
import { RoleService, Role } from '../services/RoleService';
import { ChevronDown, Plus, Edit, Trash } from 'lucide-react';

// Predefined lists for permissions, pages, and departments
const PERMISSIONS = ['create', 'read', 'update', 'delete', 'manage'];
const ALLOWED_PAGES = ['students', 'companies', 'departments'];
const DEPARTMENTS = ['qwe', 'ECE', 'Mechanical', 'Civil', 'IT'];

const MultiSelectDropdown = ({ 
  options, 
  selectedItems, 
  onToggle, 
  label, 
  disabled = false 
}: { 
  options: string[]; 
  selectedItems: string[]; 
  onToggle: (item: string) => void; 
  label: string; 
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`mb-4 relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} ref={dropdownRef}>
      <label className="block mb-2">{label}</label>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)} 
        className={`w-full border rounded px-3 py-2 flex justify-between items-center cursor-pointer bg-white ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        <span className="truncate">
          {selectedItems.length ? `${selectedItems.length} selected` : 'Select options'}
        </span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {!disabled && isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div className="p-2 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label key={option} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(option)}
                  onChange={() => onToggle(option)}
                  className="mr-2" 
                  onClick={(e) => e.stopPropagation()} 
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
      {selectedItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedItems.map((item) => (
            <span 
              key={item} 
              className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [currentEditRole, setCurrentEditRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Role>({ 
    roleName: '', 
    permissions: [], 
    allowedPages: [],
    departments: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRoles = await RoleService.getAllRoles();
        const fetchedUsers = await UserService.getAllUsers();
        setRoles(fetchedRoles);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch roles or users', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdRole = await RoleService.createRole(newRole);
      setRoles([...roles, createdRole]);
      setShowAddRoleModal(false);
      setNewRole({ roleName: '', permissions: [], allowedPages: [], departments: [] });
    } catch (error) {
      console.error('Failed to create role', error);
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditRole) return;
    try {
      const updatedRole = await RoleService.updateRole(currentEditRole.roleName, currentEditRole);
      setRoles(roles.map(role => 
        role.roleName === currentEditRole.roleName ? updatedRole : role
      ));
      setShowEditRoleModal(false);
      setCurrentEditRole(null);
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };

  const handleDeleteRole = async (roleName: string) => {
    try {
      await RoleService.deleteRole(roleName);
      setRoles(roles.filter(role => role.roleName !== roleName));
    } catch (error) {
      console.error('Failed to delete role', error);
    }
  };

  const togglePermission = (permission: string, isForEdit: boolean = false) => {
    if (isForEdit && currentEditRole) {
      setCurrentEditRole(prev => ({
        ...prev!,
        permissions: prev!.permissions.includes(permission) 
          ? prev!.permissions.filter(p => p !== permission) 
          : [...prev!.permissions, permission]
      }));
    } else {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission]
      }));
    }
  };

  const toggleAllowedPage = (page: string, isForEdit: boolean = false) => {
    if (isForEdit && currentEditRole) {
      setCurrentEditRole(prev => ({
        ...prev!,
        allowedPages: prev!.allowedPages.includes(page)
          ? prev!.allowedPages.filter(p => p !== page)
          : [...prev!.allowedPages, page],
        // Reset departments when pages change
        departments: prev!.allowedPages.includes(page) 
          ? prev!.departments 
          : (page === 'students' ? [] : prev!.departments)
      }));
    } else {
      setNewRole(prev => ({
        ...prev,
        allowedPages: prev.allowedPages.includes(page)
          ? prev.allowedPages.filter(p => p !== page)
          : [...prev.allowedPages, page],
        // Reset departments when pages change
        departments: prev.allowedPages.includes(page)
          ? prev.departments
          : (page === 'students' ? [] : prev.departments)
      }));
    }
  };

  const toggleDepartment = (department: string, isForEdit: boolean = false) => {
    const isDepartmentSelectable = isForEdit 
      ? currentEditRole?.allowedPages.includes('students') 
      : newRole.allowedPages.includes('students');

    if (!isDepartmentSelectable) return;

    if (isForEdit && currentEditRole) {
      setCurrentEditRole(prev => ({
        ...prev!,
        departments: prev!.departments.includes(department)
          ? prev!.departments.filter(d => d !== department)
          : [...prev!.departments, department]
      }));
    } else {
      setNewRole(prev => ({
        ...prev,
        departments: prev.departments.includes(department)
          ? prev.departments.filter(d => d !== department)
          : [...prev.departments, department]
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button 
          onClick={() => setShowAddRoleModal(true)} 
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="mr-2" /> Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Allowed Pages
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departments
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.roleName} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium">{role.roleName}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span 
                        key={permission} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.allowedPages.map((page) => (
                      <span 
                        key={page} 
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {role.departments.map((dept) => (
                      <span 
                        key={dept} 
                        className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => {
                        setCurrentEditRole(role);
                        setShowEditRoleModal(true);
                      }} 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteRole(role.roleName)}
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

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Role</h2>
            <form onSubmit={handleCreateRole}>
              <div className="mb-4">
                <label className="block mb-2">Role Name</label>
                <input 
                  type="text" 
                  value={newRole.roleName} 
                  onChange={(e) => setNewRole({...newRole, roleName: e.target.value})}
                  className="w-full border rounded px-3 py-2" 
                  required 
                />
              </div>
              <MultiSelectDropdown 
                options={PERMISSIONS} 
                selectedItems={newRole.permissions} 
                onToggle={(perm) => togglePermission(perm)} 
                label="Permissions" 
              />
              <MultiSelectDropdown 
                options={ALLOWED_PAGES} 
                selectedItems={newRole.allowedPages} 
                onToggle={(page) => toggleAllowedPage(page)} 
                label="Allowed Pages" 
              />
              <MultiSelectDropdown 
                options={DEPARTMENTS} 
                selectedItems={newRole.departments} 
                onToggle={(dept) => toggleDepartment(dept)} 
                label="Departments" 
                disabled={!newRole.allowedPages.includes('students')}
              />
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddRoleModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && currentEditRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <form onSubmit={handleUpdateRole}>
              <div className="mb-4">
                <label className="block mb-2">Role Name</label>
                <input
                  type="text"
                  value={currentEditRole.roleName}
                  onChange={(e) => setCurrentEditRole({...currentEditRole, roleName: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  required
                  disabled
                />
              </div>

              <MultiSelectDropdown
                options={PERMISSIONS}
                selectedItems={currentEditRole.permissions}
                onToggle={(perm) => togglePermission(perm, true)}
                label="Permissions"
              />

              <MultiSelectDropdown
                options={ALLOWED_PAGES}
                selectedItems={currentEditRole.allowedPages}
                onToggle={(page) => toggleAllowedPage(page, true)}
                label="Allowed Pages"
              />
              <MultiSelectDropdown 
                options={DEPARTMENTS} 
                selectedItems={currentEditRole.departments} 
                onToggle={(dept) => toggleDepartment(dept, true)} 
                label="Departments" 
                disabled={!currentEditRole.allowedPages.includes('students')}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditRoleModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;