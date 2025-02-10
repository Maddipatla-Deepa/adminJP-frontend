// // src/pages/CompanyPage.tsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import CompanyTable from '../components/CompanyTable';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// interface Company {
//   company: string;
//   email: string;
//   phoneNumber: string;
// }

// const CompanyPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [currentCompany, setCurrentCompany] = useState<Company>({
//     company: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const [originalCompany, setOriginalCompany] = useState<Company>({
//     company: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const { user } = useAuth();

//   // Fetch companies
//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get('/companies');
//       setCompanies(response.data);
//     } catch (error) {
//       console.error('Failed to fetch companies', error);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleAddEditCompany = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         // Update existing company
//         const response = await api.put(
//           `/companies/${originalCompany.email}`,
//           currentCompany
//         );

//         // Update companies state
//         setCompanies(prevCompanies =>
//           prevCompanies.map(company =>
//             company.email === originalCompany.email
//               ? response.data
//               : company
//           )
//         );
//       } else {
//         // Create new company
//         const response = await api.post('/companies', currentCompany);

//         // Add new company to state
//         setCompanies(prevCompanies => [...prevCompanies, response.data]);
//       }

//       // Reset form and close modal
//       setIsModalOpen(false);
//       setCurrentCompany({
//         company: '',
//         email: '',
//         phoneNumber: ''
//       });
//       setOriginalCompany({
//         company: '',
//         email: '',
//         phoneNumber: ''
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to add/edit company', error);
//       // Optional: Add user-friendly error handling
//     }
//   };

//   const handleEdit = (company: Company) => {
//     // Store the original values separately
//     setOriginalCompany({ ...company });

//     // Set current company with the values to be edited
//     setCurrentCompany({ ...company });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (email: string) => {
//     try {
//       await api.delete(`/companies/${email}`);

//       // Remove deleted company from state
//       setCompanies(prevCompanies =>
//         prevCompanies.filter(company => company.email !== email)
//       );
//     } catch (error) {
//       console.error('Failed to delete company', error);
//     }
//   };

//   const canEdit = user?.role === 'admin' || user?.role === 'editor';

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Companies</h1>
//           {canEdit && (
//             <button
//               onClick={() => {
//                 setCurrentCompany({
//                   company: '',
//                   email: '',
//                   phoneNumber: ''
//                 });
//                 setIsEditing(false);
//                 setIsModalOpen(true);
//               }}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Add Company
//             </button>
//           )}
//         </div>
//         <CompanyTable
//           companies={companies}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />

//         {/* Modal for Add/Edit Company */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Company' : 'Add Company'}
//               </h2>
//               <form onSubmit={handleAddEditCompany}>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Company Name</label>
//                     <input
//                       type="text"
//                       value={currentCompany.company}
//                       onChange={(e) =>
//                         setCurrentCompany((prev) => ({
//                           ...prev,
//                           company: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       pattern="^[a-zA-Z\s]+$"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input
//                       type="email"
//                       value={currentCompany.email}
//                       onChange={(e) =>
//                         setCurrentCompany((prev) => ({
//                           ...prev,
//                           email: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       disabled={isEditing}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       value={currentCompany.phoneNumber}
//                       onChange={(e) =>
//                         setCurrentCompany((prev) => ({
//                           ...prev,
//                           phoneNumber: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       pattern="[0-9]{10}"
//                       maxLength={10}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2 mt-4">
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

// export default CompanyPage;


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import CompanyTable from '../components/CompanyTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// interface Company {
//   company: string;
//   email: string;
//   phoneNumber: string;
// }

// const CompanyPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [currentCompany, setCurrentCompany] = useState<Company>({
//     company: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const [originalCompany, setOriginalCompany] = useState<Company>({
//     company: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   // Check if user has access to companies page
//   const hasAccess = user?.allowedPages.includes('companies');

//   // Fetch companies only if user has access
//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get('/companies');
//       setCompanies(response.data);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have access to this page");
//       } else {
//         console.error('Failed to fetch companies', error);
//         setError('Failed to load companies');
//       }
//     }
//   };

//   useEffect(() => {
//     if (hasAccess) {
//       fetchCompanies();
//     }
//   }, [hasAccess]);

//   const handleAddEditCompany = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/companies/${originalCompany.email}`,
//           currentCompany
//         );
//         setCompanies(prevCompanies =>
//           prevCompanies.map(company =>
//             company.email === originalCompany.email ? response.data : company
//           )
//         );
//       } else {
//         const response = await api.post('/companies', currentCompany);
//         setCompanies(prevCompanies => [...prevCompanies, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//       setOriginalCompany({ company: '', email: '', phoneNumber: '' });
//       setIsEditing(false);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to perform this action");
//       } else {
//         setError('Failed to save company');
//       }
//     }
//   };

//   const handleEdit = (company: Company) => {
//     setOriginalCompany({ ...company });
//     setCurrentCompany({ ...company });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (email: string) => {
//     try {
//       await api.delete(`/companies/${email}`);
//       setCompanies(prevCompanies =>
//         prevCompanies.filter(company => company.email !== email)
//       );
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to delete companies");
//       } else {
//         setError('Failed to delete company');
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
//               <h1 className="text-2xl font-bold">Companies</h1>
//               {canEdit && (
//                 <button
//                   onClick={() => {
//                     setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//                     setIsEditing(false);
//                     setIsModalOpen(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Add Company
//                 </button>
//               )}
//             </div>
//             <CompanyTable
//               companies={companies}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//             {isModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white p-6 rounded-lg w-[500px]">
//                   <h2 className="text-xl mb-4">
//                     {isEditing ? 'Edit Company' : 'Add Company'}
//                   </h2>
//                   <form onSubmit={handleAddEditCompany}>
//                     <div className="grid grid-cols-1 gap-4">
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Company Name</label>
//                         <input
//                           type="text"
//                           value={currentCompany.company}
//                           onChange={(e) =>
//                             setCurrentCompany((prev) => ({
//                               ...prev,
//                               company: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                           pattern="^[a-zA-Z\s]+$"
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Email</label>
//                         <input
//                           type="email"
//                           value={currentCompany.email}
//                           onChange={(e) =>
//                             setCurrentCompany((prev) => ({
//                               ...prev,
//                               email: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                           disabled={isEditing}
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Phone Number</label>
//                         <input
//                           type="tel"
//                           value={currentCompany.phoneNumber}
//                           onChange={(e) =>
//                             setCurrentCompany((prev) => ({
//                               ...prev,
//                               phoneNumber: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                           pattern="[0-9]{10}"
//                           maxLength={10}
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-end space-x-2 mt-4">
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

// export default CompanyPage;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import CompanyTable from '../components/CompanyTable';
// import api from '../services/api';

// interface Company {
//   company: string;
//   email: string;
//   phoneNumber: string;
// }

// const CompanyPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [currentCompany, setCurrentCompany] = useState<Company>({ company: '', email: '', phoneNumber: '' });
//   const [originalCompany, setOriginalCompany] = useState<Company>({ company: '', email: '', phoneNumber: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch companies
//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get('/companies');
//       setCompanies(response.data);
//     } catch (error) {
//       console.error('Failed to fetch companies', error);
//       setError('Failed to load companies');
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleAddEditCompany = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/companies/${originalCompany.email}`, 
//           currentCompany
//         );
//         setCompanies(prevCompanies => 
//           prevCompanies.map(company => 
//             company.email === originalCompany.email ? response.data : company
//           )
//         );
//       } else {
//         const response = await api.post('/companies', currentCompany);
//         setCompanies(prevCompanies => [...prevCompanies, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//       setOriginalCompany({ company: '', email: '', phoneNumber: '' });
//       setIsEditing(false);
//     } catch (error) {
//       setError('Failed to save company');
//     }
//   };

//   const handleEdit = (company: Company) => {
//     setOriginalCompany({ ...company });
//     setCurrentCompany({ ...company });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (email: string) => {
//     try {
//       await api.delete(`/companies/${email}`);
//       setCompanies(prevCompanies => 
//         prevCompanies.filter(company => company.email !== email)
//       );
//     } catch (error) {
//       setError('Failed to delete company');
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
//           <h1 className="text-2xl font-bold">Companies</h1>
//           <button 
//             onClick={() => {
//               setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }} 
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Company
//           </button>
//         </div>

//         <CompanyTable 
//           companies={companies} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Company' : 'Add Company'}
//               </h2>
//               <form onSubmit={handleAddEditCompany}>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Company Name</label>
//                     <input 
//                       type="text"
//                       value={currentCompany.company}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, 
//                         company: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       pattern="^[a-zA-Z\s]+$"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input 
//                       type="email"
//                       value={currentCompany.email}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, 
//                         email: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       disabled={isEditing}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input 
//                       type="tel"
//                       value={currentCompany.phoneNumber}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, 
//                         phoneNumber: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       pattern="[0-9]{10}"
//                       maxLength={10}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2 mt-4">
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

// export default CompanyPage;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import CompanyTable from '../components/CompanyTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';

// interface Company {
//   company: string;
//   email: string;
//   phoneNumber: string;
// }

// const CompanyPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [currentCompany, setCurrentCompany] = useState<Company>({ 
//     company: '', email: '', phoneNumber: '' 
//   });
//   const [originalCompany, setOriginalCompany] = useState<Company>({ 
//     company: '', email: '', phoneNumber: '' 
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isUnauthorized, setIsUnauthorized] = useState(false);

//   // Fetch companies
//   const fetchCompanies = async () => {
//     try {
//       const response = await api.get('/companies');
//       setCompanies(response.data);
//     } catch (error: any) {
//       console.error('Failed to fetch companies', error);
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to load companies');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleAddEditCompany = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/companies/${originalCompany.email}`, 
//           currentCompany
//         );
//         setCompanies(prevCompanies => 
//           prevCompanies.map(company => 
//             company.email === originalCompany.email ? response.data : company
//           )
//         );
//       } else {
//         const response = await api.post('/companies', currentCompany);
//         setCompanies(prevCompanies => [...prevCompanies, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//       setOriginalCompany({ company: '', email: '', phoneNumber: '' });
//       setIsEditing(false);
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to save company');
//       }
//     }
//   };

//   const handleEdit = (company: Company) => {
//     setOriginalCompany({ ...company });
//     setCurrentCompany({ ...company });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (email: string) => {
//     try {
//       await api.delete(`/companies/${email}`);
//       setCompanies(prevCompanies => 
//         prevCompanies.filter(company => company.email !== email)
//       );
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to delete company');
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
//           <h1 className="text-2xl font-bold">Companies</h1>
//           <button 
//             onClick={() => {
//               setCurrentCompany({ company: '', email: '', phoneNumber: '' });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Company
//           </button>
//         </div>
//         <CompanyTable 
//           companies={companies} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Company' : 'Add Company'}
//               </h2>
//               <form onSubmit={handleAddEditCompany}>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Company Name</label>
//                     <input 
//                       type="text" 
//                       value={currentCompany.company}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, company: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                       pattern="^[a-zA-Z\s]+$" 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input 
//                       type="email" 
//                       value={currentCompany.email}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, email: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                       disabled={isEditing} 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input 
//                       type="tel" 
//                       value={currentCompany.phoneNumber}
//                       onChange={(e) => setCurrentCompany((prev) => ({ 
//                         ...prev, phoneNumber: e.target.value 
//                       }))}
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                       pattern="[0-9]{10}" 
//                       maxLength={10} 
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-2 mt-4">
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

// export default CompanyPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CompanyTable from '../components/CompanyTable';
import UnauthorizedAccess from '../components/UnauthorizedAccess';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Define Action enum to match backend enum
enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

interface Company {
  company: string;
  email: string;
  phoneNumber: string;
}

const CompanyPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company>({ 
    company: '', 
    email: '', 
    phoneNumber: '' 
  });
  const [originalCompany, setOriginalCompany] = useState<Company>({ 
    company: '', 
    email: '', 
    phoneNumber: '' 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const { user } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate();

  // Check if user has a specific permission for companies
  const hasPermission = (action: Action): boolean => {
    // If user has 'manage' permission, they have all permissions
    if (user?.permissions?.includes(Action.Manage)) return true;
    // Check for specific action permission
    return user?.permissions?.includes(action) || false;
  };

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to load companies');
      }
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddEditCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    // Additional permission check before adding/editing
    if (!hasPermission(isEditing ? Action.Update : Action.Create)) {
      setError('You do not have permission to perform this action');
      return;
    }

    try {
      if (isEditing) {
        const response = await api.put(
          `/companies/${originalCompany.email}`, 
          currentCompany
        );
        setCompanies(prevCompanies => 
          prevCompanies.map(company => 
            company.email === originalCompany.email ? response.data : company
          )
        );
      } else {
        const response = await api.post('/companies', currentCompany);
        setCompanies(prevCompanies => [...prevCompanies, response.data]);
      }

      setIsModalOpen(false);
      setCurrentCompany({ company: '', email: '', phoneNumber: '' });
      setOriginalCompany({ company: '', email: '', phoneNumber: '' });
      setIsEditing(false);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to save company');
      }
    }
  };

  const handleEdit = (company: Company) => {
    // Additional permission check before editing
    if (!hasPermission(Action.Update)) {
      setError('You do not have permission to edit');
      return;
    }

    setOriginalCompany({ ...company });
    setCurrentCompany({ ...company });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (email: string) => {
    // Additional permission check before deleting
    if (!hasPermission(Action.Delete)) {
      setError('You do not have permission to delete');
      return;
    }

    try {
      await api.delete(`/companies/${email}`);
      setCompanies(prevCompanies => 
        prevCompanies.filter(company => company.email !== email)
      );
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setIsUnauthorized(true);
      } else {
        setError('Failed to delete company');
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
          <h1 className="text-2xl font-bold">Companies</h1>
          
          {/* Conditionally render Add Company button */}
          {hasPermission(Action.Create) && (
            <button
              onClick={() => {
                setCurrentCompany({ company: '', email: '', phoneNumber: '' });
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Company
            </button>
          )}
        </div>

        <CompanyTable 
          companies={companies} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          canEdit={hasPermission(Action.Update)}
          canDelete={hasPermission(Action.Delete)}
        />

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[500px]">
              <h2 className="text-xl mb-4">
                {isEditing ? 'Edit Company' : 'Add Company'}
              </h2>
              <form onSubmit={handleAddEditCompany}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={currentCompany.company}
                      onChange={(e) => setCurrentCompany((prev) => ({ 
                        ...prev, 
                        company: e.target.value 
                      }))}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                      pattern="^[a-zA-Z\s]+$"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={currentCompany.email}
                      onChange={(e) => setCurrentCompany((prev) => ({ 
                        ...prev, 
                        email: e.target.value 
                      }))}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                      disabled={isEditing}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={currentCompany.phoneNumber}
                      onChange={(e) => setCurrentCompany((prev) => ({ 
                        ...prev, 
                        phoneNumber: e.target.value 
                      }))}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
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

export default CompanyPage;