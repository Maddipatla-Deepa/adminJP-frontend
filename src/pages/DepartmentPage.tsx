// // src/pages/DepartmentPage.tsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import DepartmentTable from '../components/DepartmentTable';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// const DepartmentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [currentDepartment, setCurrentDepartment] = useState<Department>({ department: '', section: '' });
//   const [originalDepartment, setOriginalDepartment] = useState<Department>({ department: '', section: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   const hasAccess = user?.allowedPages.includes('departments');

//   // Fetch departments
//   // Fetch departments only if user has access
//   const fetchDepartments = async () => {
//     try {
//       const response = await api.get('/departments');
//       setDepartments(response.data);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have access to this page");
//       } else {
//         console.error('Failed to fetch departments', error);
//         setError('Failed to load departments');
//       }
//     }
//   };

//   useEffect(() => {
//     if (hasAccess) {
//       fetchDepartments();
//     }
//   }, [hasAccess]);

//   // Initial fetch
//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleAddEditDepartment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         // Update existing department
//         const response = await api.put(
//           `/departments/${originalDepartment.department}/${originalDepartment.section}`, 
//           {
//             department: currentDepartment.department,
//             section: currentDepartment.section
//           }
//         );
        
//         // Update departments state
//         setDepartments(prevDepartments => 
//           prevDepartments.map(dept => 
//             (dept.department === originalDepartment.department && 
//              dept.section === originalDepartment.section) 
//               ? response.data 
//               : dept
//           )
//         );
//       } else {
//         // Create new department
//         const response = await api.post('/departments', {
//           department: currentDepartment.department,
//           section: currentDepartment.section
//         });
        
//         // Add new department to state
//         setDepartments(prevDepartments => [...prevDepartments, response.data]);
//       }
      
//       // Reset form and close modal
//       setIsModalOpen(false);
//       setCurrentDepartment({ department: '', section: '' });
//       setOriginalDepartment({ department: '', section: '' });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to add/edit department', error);
//       // Optional: Add user-friendly error handling
//     }
//   };

//   const handleEdit = (department: Department) => {
//     // Store the original values separately
//     setOriginalDepartment({
//       department: department.department,
//       section: department.section
//     });
    
//     // Set current department with the values to be edited
//     setCurrentDepartment(department);
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (department: string, section: string) => {
//     try {
//       await api.delete(`/departments/${department}/${section}`);
      
//       // Remove deleted department from state
//       setDepartments(prevDepartments => 
//         prevDepartments.filter(dept => 
//           !(dept.department === department && dept.section === section)
//         )
//       );
//     } catch (error) {
//       console.error('Failed to delete department', error);
//     }
//   };

//   // If user doesn't have access, show unauthorized message
//   if (!hasAccess) {
//     return <UnauthorizedAccess />;
//   }


//   const canEdit = user?.role === 'admin' || user?.role === 'editor';

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         {error ? (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button
//               className="absolute top-0 right-0 px-4 py-3"
//               onClick={() => setError(null)}
//             >
//               ×
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-bold">Departments</h1>
//               {canEdit && (
//                 <button
//                   onClick={() => {
//                     setCurrentDepartment({ department: '', section: '' });
//                     setIsEditing(false);
//                     setIsModalOpen(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Add Department
//                 </button>
//               )}
//             </div>
//         <DepartmentTable 
//           departments={departments} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete}
//         />
//         {/* Modal code remains the same as in your previous implementation */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Department' : 'Add Department'}
//               </h2>
//               <form onSubmit={handleAddEditDepartment}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Department</label>
//                   <input
//                     type="text"
//                     value={currentDepartment.department}
//                     onChange={(e) => 
//                       setCurrentDepartment(prev => ({ 
//                         ...prev, 
//                         department: e.target.value 
//                       }))
//                     }
//                     className="w-full px-3 py-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Section</label>
//                   <input
//                     type="text"
//                     value={currentDepartment.section}
//                     onChange={(e) => 
//                       setCurrentDepartment(prev => ({ 
//                         ...prev, 
//                         section: e.target.value 
//                       }))
//                     }
//                     className="w-full px-3 py-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     {isEditing ? 'Update' : 'Add'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//          )}
//         </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentPage;

// // src/pages/DepartmentPage.tsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import DepartmentTable from '../components/DepartmentTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// const DepartmentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [currentDepartment, setCurrentDepartment] = useState<Department>({
//     department: '',
//     section: ''
//   });
//   const [originalDepartment, setOriginalDepartment] = useState<Department>({
//     department: '',
//     section: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   // Check if user has access to departments page
//   const hasAccess = user?.allowedPages.includes('departments');

//   // Fetch departments only if user has access
//   const fetchDepartments = async () => {
//     try {
//       const response = await api.get('/departments');
//       setDepartments(response.data);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have access to this page");
//       } else {
//         console.error('Failed to fetch departments', error);
//         setError('Failed to load departments');
//       }
//     }
//   };

//   useEffect(() => {
//     if (hasAccess) {
//       fetchDepartments();
//     }
//   }, [hasAccess]);

//   const handleAddEditDepartment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/departments/${originalDepartment.department}/${originalDepartment.section}`,
//           {
//             department: currentDepartment.department,
//             section: currentDepartment.section
//           }
//         );
//         setDepartments(prevDepartments =>
//           prevDepartments.map(dept =>
//             dept.department === originalDepartment.department &&
//             dept.section === originalDepartment.section
//               ? response.data
//               : dept
//           )
//         );
//       } else {
//         const response = await api.post('/departments', {
//           department: currentDepartment.department,
//           section: currentDepartment.section
//         });
//         setDepartments(prevDepartments => [...prevDepartments, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentDepartment({ department: '', section: '' });
//       setOriginalDepartment({ department: '', section: '' });
//       setIsEditing(false);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to perform this action");
//       } else {
//         setError('Failed to save department');
//       }
//     }
//   };

//   const handleEdit = (department: Department) => {
//     setOriginalDepartment({
//       department: department.department,
//       section: department.section
//     });
//     setCurrentDepartment(department);
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (department: string, section: string) => {
//     try {
//       await api.delete(`/departments/${department}/${section}`);
//       setDepartments(prevDepartments =>
//         prevDepartments.filter(
//           dept => !(dept.department === department && dept.section === section)
//         )
//       );
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to delete departments");
//       } else {
//         setError('Failed to delete department');
//       }
//     }
//   };

//   const canEdit = user?.role === 'admin' || user?.role === 'editor';

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         {!hasAccess ? (
//           <UnauthorizedAccess />
//         ) : error ? (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button
//               className="absolute top-0 right-0 px-4 py-3"
//               onClick={() => setError(null)}
//             >
//               ×
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-bold">Departments</h1>
//               {canEdit && (
//                 <button
//                   onClick={() => {
//                     setCurrentDepartment({ department: '', section: '' });
//                     setIsEditing(false);
//                     setIsModalOpen(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Add Department
//                 </button>
//               )}
//             </div>
//             <DepartmentTable
//               departments={departments}
//               // onEdit={canEdit ? handleEdit : undefined}
//               // onDelete={user?.role === 'admin' ? handleDelete : undefined}
//               onEdit={handleEdit} 
//               onDelete={handleDelete}
//             />
//             {isModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white p-6 rounded-lg w-96">
//                   <h2 className="text-xl mb-4">
//                     {isEditing ? 'Edit Department' : 'Add Department'}
//                   </h2>
//                   <form onSubmit={handleAddEditDepartment}>
//                     <div className="mb-4">
//                       <label className="block text-gray-700 mb-2">Department</label>
//                       <input
//                         type="text"
//                         value={currentDepartment.department}
//                         onChange={(e) =>
//                           setCurrentDepartment(prev => ({
//                             ...prev,
//                             department: e.target.value
//                           }))
//                         }
//                         className="w-full px-3 py-2 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label className="block text-gray-700 mb-2">Section</label>
//                       <input
//                         type="text"
//                         value={currentDepartment.section}
//                         onChange={(e) =>
//                           setCurrentDepartment(prev => ({
//                             ...prev,
//                             section: e.target.value
//                           }))
//                         }
//                         className="w-full px-3 py-2 border rounded-md"
//                         required
//                       />
//                     </div>
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         type="button"
//                         onClick={() => setIsModalOpen(false)}
//                         className="px-4 py-2 bg-gray-200 rounded"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         {isEditing ? 'Update' : 'Add'}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import DepartmentTable from '../components/DepartmentTable';
// import api from '../services/api';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// const DepartmentPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [currentDepartment, setCurrentDepartment] = useState<Department>({ department: '', section: '' });
//   const [originalDepartment, setOriginalDepartment] = useState<Department>({ department: '', section: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch departments
//   const fetchDepartments = async () => {
//     try {
//       const response = await api.get('/departments');
//       setDepartments(response.data);
//     } catch (error: any) {
//       // Check for unauthorized access
//       if (error.response && error.response.status === 403) {
//         navigate('/unauthorized');
//       } else {
//         console.error('Failed to fetch departments', error);
//         setError('Failed to load departments');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleAddEditDepartment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/departments/${originalDepartment.department}/${originalDepartment.section}`,
//           { 
//             department: currentDepartment.department, 
//             section: currentDepartment.section 
//           }
//         );
//         setDepartments(prevDepartments => 
//           prevDepartments.map(dept => 
//             dept.department === originalDepartment.department && dept.section === originalDepartment.section 
//               ? response.data 
//               : dept
//           )
//         );
//       } else {
//         const response = await api.post('/departments', {
//           department: currentDepartment.department,
//           section: currentDepartment.section
//         });
//         setDepartments(prevDepartments => [...prevDepartments, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentDepartment({ department: '', section: '' });
//       setOriginalDepartment({ department: '', section: '' });
//       setIsEditing(false);
//     } catch (error) {
//       setError('Failed to save department');
//     }
//   };

//   const handleEdit = (department: Department) => {
//     setOriginalDepartment({ 
//       department: department.department, 
//       section: department.section 
//     });
//     setCurrentDepartment(department);
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (department: string, section: string) => {
//     try {
//       await api.delete(`/departments/${department}/${section}`);
//       setDepartments(prevDepartments => 
//         prevDepartments.filter(
//           dept => !(dept.department === department && dept.section === section)
//         )
//       );
//     } catch (error) {
//       setError('Failed to delete department');
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button 
//               className="absolute top-0 right-0 px-4 py-3" 
//               onClick={() => setError(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}
        
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Departments</h1>
//           <button 
//             onClick={() => {
//               setCurrentDepartment({ department: '', section: '' });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }} 
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Department
//           </button>
//         </div>

//         <DepartmentTable 
//           departments={departments}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Department' : 'Add Department'}
//               </h2>
//               <form onSubmit={handleAddEditDepartment}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Department</label>
//                   <input 
//                     type="text"
//                     value={currentDepartment.department}
//                     onChange={(e) => setCurrentDepartment(prev => ({ ...prev, department: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-md"
//                     required 
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Section</label>
//                   <input 
//                     type="text"
//                     value={currentDepartment.section}
//                     onChange={(e) => setCurrentDepartment(prev => ({ ...prev, section: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-md"
//                     required 
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button 
//                     type="button" 
//                     onClick={() => setIsModalOpen(false)} 
//                     className="px-4 py-2 bg-gray-200 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     {isEditing ? 'Update' : 'Add'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import DepartmentTable from '../components/DepartmentTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// const DepartmentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [currentDepartment, setCurrentDepartment] = useState<Department>({ department: '', section: '' });
//   const [originalDepartment, setOriginalDepartment] = useState<Department>({ department: '', section: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isUnauthorized, setIsUnauthorized] = useState(false);
//   const navigate = useNavigate();

//   // Fetch departments
//   const fetchDepartments = async () => {
//     try {
//       const response = await api.get('/departments');
//       setDepartments(response.data);
//     } catch (error: any) {
//       console.error('Failed to fetch departments', error);
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to load departments');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleAddEditDepartment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/departments/${originalDepartment.department}/${originalDepartment.section}`,
//           { 
//             department: currentDepartment.department, 
//             section: currentDepartment.section 
//           }
//         );
//         setDepartments(prevDepartments => 
//           prevDepartments.map(dept => 
//             dept.department === originalDepartment.department && dept.section === originalDepartment.section 
//               ? response.data 
//               : dept
//           )
//         );
//       } else {
//         const response = await api.post('/departments', {
//           department: currentDepartment.department,
//           section: currentDepartment.section
//         });
//         setDepartments(prevDepartments => [...prevDepartments, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentDepartment({ department: '', section: '' });
//       setOriginalDepartment({ department: '', section: '' });
//       setIsEditing(false);
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to save department');
//       }
//     }
//   };

//   const handleEdit = (department: Department) => {
//     setOriginalDepartment({ 
//       department: department.department, 
//       section: department.section 
//     });
//     setCurrentDepartment(department);
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (department: string, section: string) => {
//     try {
//       await api.delete(`/departments/${department}/${section}`);
//       setDepartments(prevDepartments => 
//         prevDepartments.filter(
//           dept => !(dept.department === department && dept.section === section)
//         )
//       );
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to delete department');
//       }
//     }
//   };

//   // If unauthorized, render UnauthorizedAccess with Sidebar
//   if (isUnauthorized) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1">
//           <UnauthorizedAccess />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button 
//               className="absolute top-0 right-0 px-4 py-3" 
//               onClick={() => setError(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Departments</h1>
//           <button 
//             onClick={() => {
//               setCurrentDepartment({ department: '', section: '' });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Department
//           </button>
//         </div>
//         <DepartmentTable 
//           departments={departments} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-96">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Department' : 'Add Department'}
//               </h2>
//               <form onSubmit={handleAddEditDepartment}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Department</label>
//                   <input 
//                     type="text"
//                     value={currentDepartment.department}
//                     onChange={(e) => setCurrentDepartment(prev => ({ ...prev, department: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-md"
//                     required 
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Section</label>
//                   <input 
//                     type="text"
//                     value={currentDepartment.section}
//                     onChange={(e) => setCurrentDepartment(prev => ({ ...prev, section: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-md"
//                     required 
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button 
//                     type="button" 
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     {isEditing ? 'Update' : 'Add'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DepartmentTable from '../components/DepartmentTable';
import UnauthorizedAccess from '../components/UnauthorizedAccess';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Define Action enum to match backend
enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

interface Department {
  id?: string;
  department: string;
  section: string;
}

const DepartmentPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentDepartment, setCurrentDepartment] = useState<Department>({ department: '', section: '' });
  const [originalDepartment, setOriginalDepartment] = useState<Department>({ department: '', section: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  
  const { user } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate();

  // Check if user has a specific permission for departments
  const hasPermission = (action: Action): boolean => {
    // If user has 'manage' permission, they have all permissions
    if (user?.permissions?.includes(Action.Manage)) return true;

    // Check for specific action permission
    return user?.permissions?.includes(action) || false;
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to load departments');
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddEditDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Additional permission check before adding/editing
    if (!hasPermission(isEditing ? Action.Update : Action.Create)) {
      setError('You do not have permission to perform this action');
      return;
    }

    try {
      if (isEditing) {
        const response = await api.put(
          `/departments/${originalDepartment.department}/${originalDepartment.section}`,
          { 
            department: currentDepartment.department, 
            section: currentDepartment.section 
          }
        );
        setDepartments(prevDepartments => 
          prevDepartments.map(dept => 
            dept.department === originalDepartment.department && 
            dept.section === originalDepartment.section 
              ? response.data 
              : dept
          )
        );
      } else {
        const response = await api.post('/departments', {
          department: currentDepartment.department,
          section: currentDepartment.section
        });
        setDepartments(prevDepartments => [...prevDepartments, response.data]);
      }
      setIsModalOpen(false);
      setCurrentDepartment({ department: '', section: '' });
      setOriginalDepartment({ department: '', section: '' });
      setIsEditing(false);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to save department');
      }
    }
  };

  const handleEdit = (department: Department) => {
    // Additional permission check before editing
    if (!hasPermission(Action.Update)) {
      setError('You do not have permission to edit');
      return;
    }

    setOriginalDepartment({ 
      department: department.department, 
      section: department.section 
    });
    setCurrentDepartment(department);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (department: string, section: string) => {
    // Additional permission check before deleting
    if (!hasPermission(Action.Delete)) {
      setError('You do not have permission to delete');
      return;
    }

    try {
      await api.delete(`/departments/${department}/${section}`);
      setDepartments(prevDepartments => 
        prevDepartments.filter(
          dept => !(dept.department === department && dept.section === section)
        )
      );
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to delete department');
      }
    }
  };

  // If unauthorized, render UnauthorizedAccess with Sidebar
  if (isUnauthorized) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <UnauthorizedAccess />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
            <button 
              className="absolute top-0 right-0 px-4 py-3" 
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Departments</h1>
          {/* Conditionally render Add Department button */}
          {hasPermission(Action.Create) && (
            <button 
              onClick={() => {
                setCurrentDepartment({ department: '', section: '' });
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Department
            </button>
          )}
        </div>
        <DepartmentTable 
          departments={departments} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          canEdit={hasPermission(Action.Update)}
          canDelete={hasPermission(Action.Delete)}
        />
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">
                {isEditing ? 'Edit Department' : 'Add Department'}
              </h2>
              <form onSubmit={handleAddEditDepartment}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Department</label>
                  <input 
                    type="text"
                    value={currentDepartment.department}
                    onChange={(e) => setCurrentDepartment(prev => ({ 
                      ...prev, 
                      department: e.target.value 
                    }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Section</label>
                  <input 
                    type="text"
                    value={currentDepartment.section}
                    onChange={(e) => setCurrentDepartment(prev => ({ 
                      ...prev, 
                      section: e.target.value 
                    }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required 
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;