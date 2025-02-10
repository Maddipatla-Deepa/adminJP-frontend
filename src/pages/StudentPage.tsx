// // src/pages/StudentPage.tsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import StudentTable from '../components/StudentTable';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// interface Student {
//   rollNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   department: string;
//   course: string;
//   program: string;
//   batch: string;
//   section: string;
// }

// const StudentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [currentStudent, setCurrentStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [originalStudent, setOriginalStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const { user } = useAuth();

//   // Fetch students
//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Failed to fetch students', error);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAddEditStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         // Update existing student
//         const response = await api.put(
//           `/students/${originalStudent.rollNumber}`,
//           {
//             ...currentStudent,
//             rollNumber: currentStudent.rollNumber
//           }
//         );

//         // Update students state
//         setStudents(prevStudents =>
//           prevStudents.map(student =>
//             student.rollNumber === originalStudent.rollNumber
//               ? response.data
//               : student
//           )
//         );
//       } else {
//         // Create new student
//         const response = await api.post('/students', currentStudent);

//         // Add new student to state
//         setStudents(prevStudents => [...prevStudents, response.data]);
//       }

//       // Reset form and close modal
//       setIsModalOpen(false);
//       setCurrentStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setOriginalStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to add/edit student', error);
//       // Optional: Add user-friendly error handling
//     }
//   };

//   const handleEdit = (student: Student) => {
//     // Store the original values separately
//     setOriginalStudent({ ...student });

//     // Set current student with the values to be edited
//     setCurrentStudent({ ...student });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (rollNumber: string) => {
//     try {
//       await api.delete(`/students/${rollNumber}`);

//       // Remove deleted student from state
//       setStudents(prevStudents =>
//         prevStudents.filter(student => student.rollNumber !== rollNumber)
//       );
//     } catch (error) {
//       console.error('Failed to delete student', error);
//     }
//   };

//   const canEdit = user?.role === 'admin' || user?.role === 'editor';

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Students</h1>
//           {canEdit && (
//             <button
//               onClick={() => {
//                 setCurrentStudent({
//                   rollNumber: '',
//                   firstName: '',
//                   lastName: '',
//                   email: '',
//                   phoneNumber: '',
//                   department: '',
//                   course: '',
//                   program: '',
//                   batch: '',
//                   section: ''
//                 });
//                 setIsEditing(false);
//                 setIsModalOpen(true);
//               }}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Add Student
//             </button>
//           )}
//         </div>
//         <StudentTable
//           students={students}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />

//         {/* Modal for Add/Edit Student */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Student' : 'Add Student'}
//               </h2>
//               <form onSubmit={handleAddEditStudent}>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Roll Number</label>
//                     <input
//                       type="text"
//                       value={currentStudent.rollNumber}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           rollNumber: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                       disabled={isEditing}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">First Name</label>
//                     <input
//                       type="text"
//                       value={currentStudent.firstName}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           firstName: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Last Name</label>
//                     <input
//                       type="text"
//                       value={currentStudent.lastName}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           lastName: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input
//                       type="email"
//                       value={currentStudent.email}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           email: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input
//                       type="tel"
//                       value={currentStudent.phoneNumber}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
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
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Department</label>
//                     <input
//                       type="text"
//                       value={currentStudent.department}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           department: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Course</label>
//                     <input
//                       type="text"
//                       value={currentStudent.course}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           course: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Program</label>
//                     <input
//                       type="text"
//                       value={currentStudent.program}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           program: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Batch</label>
//                     <input
//                       type="text"
//                       value={currentStudent.batch}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           batch: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Section</label>
//                     <input
//                       type="text"
//                       value={currentStudent.section}
//                       onChange={(e) =>
//                         setCurrentStudent((prev) => ({
//                           ...prev,
//                           section: e.target.value
//                         }))
//                       }
//                       className="w-full px-3 py-2 border rounded-md"
//                       required
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

// export default StudentPage;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import StudentTable from '../components/StudentTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// interface Student {
//   rollNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   department: string;
//   course: string;
//   program: string;
//   batch: string;
//   section: string;
// }

// const StudentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [currentStudent, setCurrentStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [originalStudent, setOriginalStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   // Check if user has access to students page
//   const hasAccess = user?.allowedPages.includes('students');

//   // Fetch students only if user has access
//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/students');
//       setStudents(response.data);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have access to this page");
//       } else {
//         console.error('Failed to fetch students', error);
//         setError('Failed to load students');
//       }
//     }
//   };

//   useEffect(() => {
//     if (hasAccess) {
//       fetchStudents();
//     }
//   }, [hasAccess]);

//   const handleAddEditStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/students/${originalStudent.rollNumber}`,
//           { ...currentStudent, rollNumber: currentStudent.rollNumber }
//         );
//         setStudents(prevStudents =>
//           prevStudents.map(student =>
//             student.rollNumber === originalStudent.rollNumber ? response.data : student
//           )
//         );
//       } else {
//         const response = await api.post('/students', currentStudent);
//         setStudents(prevStudents => [...prevStudents, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setOriginalStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setIsEditing(false);
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to perform this action");
//       } else {
//         setError('Failed to save student');
//       }
//     }
//   };

//   const handleEdit = (student: Student) => {
//     setOriginalStudent({ ...student });
//     setCurrentStudent({ ...student });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (rollNumber: string) => {
//     try {
//       await api.delete(`/students/${rollNumber}`);
//       setStudents(prevStudents =>
//         prevStudents.filter(student => student.rollNumber !== rollNumber)
//       );
//     } catch (error) {
//       if (error.response?.status === 403) {
//         setError("You don't have permission to delete students");
//       } else {
//         setError('Failed to delete student');
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
//               <h1 className="text-2xl font-bold">Students</h1>
//               {canEdit && (
//                 <button
//                   onClick={() => {
//                     setCurrentStudent({
//                       rollNumber: '',
//                       firstName: '',
//                       lastName: '',
//                       email: '',
//                       phoneNumber: '',
//                       department: '',
//                       course: '',
//                       program: '',
//                       batch: '',
//                       section: ''
//                     });
//                     setIsEditing(false);
//                     setIsModalOpen(true);
//                   }}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Add Student
//                 </button>
//               )}
//             </div>
//             <StudentTable
//               students={students}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//             {isModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white p-6 rounded-lg w-[500px]">
//                   <h2 className="text-xl mb-4">
//                     {isEditing ? 'Edit Student' : 'Add Student'}
//                   </h2>
//                   <form onSubmit={handleAddEditStudent}>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Roll Number</label>
//                         <input
//                           type="text"
//                           value={currentStudent.rollNumber}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               rollNumber: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                           disabled={isEditing}
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">First Name</label>
//                         <input
//                           type="text"
//                           value={currentStudent.firstName}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               firstName: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           value={currentStudent.lastName}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               lastName: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Email</label>
//                         <input
//                           type="email"
//                           value={currentStudent.email}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               email: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Phone Number</label>
//                         <input
//                           type="tel"
//                           value={currentStudent.phoneNumber}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
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
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Department</label>
//                         <input
//                           type="text"
//                           value={currentStudent.department}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               department: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Course</label>
//                         <input
//                           type="text"
//                           value={currentStudent.course}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               course: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Program</label>
//                         <input
//                           type="text"
//                           value={currentStudent.program}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               program: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Batch</label>
//                         <input
//                           type="text"
//                           value={currentStudent.batch}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               batch: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
//                         />
//                       </div>
//                       <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Section</label>
//                         <input
//                           type="text"
//                           value={currentStudent.section}
//                           onChange={(e) =>
//                             setCurrentStudent((prev) => ({
//                               ...prev,
//                               section: e.target.value
//                             }))
//                           }
//                           className="w-full px-3 py-2 border rounded-md"
//                           required
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

// export default StudentPage;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import StudentTable from '../components/StudentTable';
// import api from '../services/api';

// interface Student {
//   rollNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   department: string;
//   course: string;
//   program: string;
//   batch: string;
//   section: string;
// }

// const StudentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [currentStudent, setCurrentStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [originalStudent, setOriginalStudent] = useState<Student>({
//     rollNumber: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     department: '',
//     course: '',
//     program: '',
//     batch: '',
//     section: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch students
//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/students');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Failed to fetch students', error);
//       setError('Failed to load students');
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAddEditStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/students/${originalStudent.rollNumber}`, 
//           { ...currentStudent, rollNumber: currentStudent.rollNumber }
//         );
//         setStudents(prevStudents => prevStudents.map(student => 
//           student.rollNumber === originalStudent.rollNumber ? response.data : student
//         ));
//       } else {
//         const response = await api.post('/students', currentStudent);
//         setStudents(prevStudents => [...prevStudents, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setOriginalStudent({
//         rollNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         department: '',
//         course: '',
//         program: '',
//         batch: '',
//         section: ''
//       });
//       setIsEditing(false);
//     } catch (error) {
//       setError('Failed to save student');
//     }
//   };

//   const handleEdit = (student: Student) => {
//     setOriginalStudent({ ...student });
//     setCurrentStudent({ ...student });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (rollNumber: string) => {
//     try {
//       await api.delete(`/students/${rollNumber}`);
//       setStudents(prevStudents => prevStudents.filter(student => student.rollNumber !== rollNumber));
//     } catch (error) {
//       setError('Failed to delete student');
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
//           <h1 className="text-2xl font-bold">Students</h1>
//           <button 
//             onClick={() => {
//               setCurrentStudent({
//                 rollNumber: '',
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 phoneNumber: '',
//                 department: '',
//                 course: '',
//                 program: '',
//                 batch: '',
//                 section: ''
//               });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }} 
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Student
//           </button>
//         </div>

//         <StudentTable 
//           students={students} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Student' : 'Add Student'}
//               </h2>
//               <form onSubmit={handleAddEditStudent}>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Roll Number</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.rollNumber} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         rollNumber: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                       disabled={isEditing}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">First Name</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.firstName} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         firstName: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Last Name</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.lastName} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         lastName: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input 
//                       type="email" 
//                       value={currentStudent.email} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         email: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input 
//                       type="tel" 
//                       value={currentStudent.phoneNumber} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         phoneNumber: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                       pattern="[0-9]{10}" 
//                       maxLength={10} 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Department</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.department} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         department: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Course</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.course} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         course: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Program</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.program} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         program: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Batch</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.batch} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         batch: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Section</label>
//                     <input 
//                       type="text" 
//                       value={currentStudent.section} 
//                       onChange={(e) => setCurrentStudent((prev) => ({ 
//                         ...prev, 
//                         section: e.target.value 
//                       }))} 
//                       className="w-full px-3 py-2 border rounded-md" 
//                       required 
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

// export default StudentPage;

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import StudentTable from '../components/StudentTable';
// import UnauthorizedAccess from '../components/UnauthorizedAccess';
// import api from '../services/api';

// interface Student {
//   rollNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   department: string;
//   course: string;
//   program: string;
//   batch: string;
//   section: string;
// }

// const StudentPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [currentStudent, setCurrentStudent] = useState<Student>({
//     rollNumber: '', firstName: '', lastName: '', email: '', 
//     phoneNumber: '', department: '', course: '', program: '', 
//     batch: '', section: ''
//   });
//   const [originalStudent, setOriginalStudent] = useState<Student>({
//     rollNumber: '', firstName: '', lastName: '', email: '', 
//     phoneNumber: '', department: '', course: '', program: '', 
//     batch: '', section: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isUnauthorized, setIsUnauthorized] = useState(false);

//   // Fetch students
//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/students');
//       setStudents(response.data);
//     } catch (error: any) {
//       console.error('Failed to fetch students', error);
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to load students');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleAddEditStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         const response = await api.put(
//           `/students/${originalStudent.rollNumber}`,
//           { ...currentStudent, rollNumber: currentStudent.rollNumber }
//         );
//         setStudents(prevStudents => 
//           prevStudents.map(student => 
//             student.rollNumber === originalStudent.rollNumber ? response.data : student
//           )
//         );
//       } else {
//         const response = await api.post('/students', currentStudent);
//         setStudents(prevStudents => [...prevStudents, response.data]);
//       }
//       setIsModalOpen(false);
//       setCurrentStudent({
//         rollNumber: '', firstName: '', lastName: '', email: '', 
//         phoneNumber: '', department: '', course: '', program: '', 
//         batch: '', section: ''
//       });
//       setOriginalStudent({
//         rollNumber: '', firstName: '', lastName: '', email: '', 
//         phoneNumber: '', department: '', course: '', program: '', 
//         batch: '', section: ''
//       });
//       setIsEditing(false);
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to save student');
//       }
//     }
//   };

//   const handleEdit = (student: Student) => {
//     setOriginalStudent({ ...student });
//     setCurrentStudent({ ...student });
//     setIsEditing(true);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (rollNumber: string) => {
//     try {
//       await api.delete(`/students/${rollNumber}`);
//       setStudents(prevStudents => 
//         prevStudents.filter(student => student.rollNumber !== rollNumber)
//       );
//     } catch (error: any) {
//       if (error.response && error.response.status === 403) {
//         setIsUnauthorized(true);
//       } else {
//         setError('Failed to delete student');
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
//           <h1 className="text-2xl font-bold">Students</h1>
//           <button 
//             onClick={() => {
//               setCurrentStudent({
//                 rollNumber: '', firstName: '', lastName: '', email: '', 
//                 phoneNumber: '', department: '', course: '', program: '', 
//                 batch: '', section: ''
//               });
//               setIsEditing(false);
//               setIsModalOpen(true);
//             }}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add Student
//           </button>
//         </div>
//         <StudentTable 
//           students={students} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-[500px]">
//               <h2 className="text-xl mb-4">
//                 {isEditing ? 'Edit Student' : 'Add Student'}
//               </h2>
//               <form onSubmit={handleAddEditStudent}>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Roll Number</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.rollNumber}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, rollNumber: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                       disabled={isEditing}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">First Name</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.firstName}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, firstName: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Last Name</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.lastName}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, lastName: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input 
//                       type="email"
//                       value={currentStudent.email}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, email: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                     <input 
//                       type="tel"
//                       value={currentStudent.phoneNumber}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, phoneNumber: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                       pattern="[0-9]{10}"
//                       maxLength={10}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Department</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.department}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, department: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Course</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.course}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, course: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Program</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.program}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, program: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Batch</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.batch}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, batch: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Section</label>
//                     <input 
//                       type="text"
//                       value={currentStudent.section}
//                       onChange={(e) => setCurrentStudent((prev) => ({ ...prev, section: e.target.value }))}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required 
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

// export default StudentPage;

import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import StudentTable from '../components/StudentTable'; 
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

interface Student { 
  rollNumber: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  phoneNumber: string; 
  department: string; 
  course: string; 
  program: string; 
  batch: string; 
  section: string; 
}

const StudentPage: React.FC = () => { 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [students, setStudents] = useState<Student[]>([]); 
  const [currentStudent, setCurrentStudent] = useState<Student>({ 
    rollNumber: '', 
    firstName: '', 
    lastName: '', 
    email: '', 
    phoneNumber: '', 
    department: '', 
    course: '', 
    program: '', 
    batch: '', 
    section: '' 
  }); 
  const [originalStudent, setOriginalStudent] = useState<Student>({ 
    rollNumber: '', 
    firstName: '', 
    lastName: '', 
    email: '', 
    phoneNumber: '', 
    department: '', 
    course: '', 
    program: '', 
    batch: '', 
    section: '' 
  }); 
  const [isEditing, setIsEditing] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [isUnauthorized, setIsUnauthorized] = useState(false); 

  const { user } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate(); 

  // Check if user has a specific permission for students
  const hasPermission = (action: Action): boolean => { 
    // If user has 'manage' permission, they have all permissions
    if (user?.permissions?.includes(Action.Manage)) return true; 
    
    // Check for specific action permission
    return user?.permissions?.includes(action) || false; 
  }; 

  // Fetch students
  const fetchStudents = async () => { 
    try { 
      const response = await api.get('/students'); 
      setStudents(response.data); 
    } catch (error: any) { 
      if (error.response && error.response.status === 403) { 
        setIsUnauthorized(true); 
      } else { 
        setError('Failed to load students'); 
      } 
    } 
  }; 

  useEffect(() => { 
    fetchStudents(); 
  }, []); 

  const handleAddEditStudent = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    
    // Additional permission check before adding/editing
    if (!hasPermission(isEditing ? Action.Update : Action.Create)) { 
      setError('You do not have permission to perform this action'); 
      return; 
    } 

    try { 
      if (isEditing) { 
        const response = await api.put( 
          `/students/${originalStudent.rollNumber}`, 
          { 
            ...currentStudent, 
            rollNumber: currentStudent.rollNumber 
          } 
        ); 
        setStudents(prevStudents => prevStudents.map(student => 
          student.rollNumber === originalStudent.rollNumber ? response.data : student 
        )); 
      } else { 
        const response = await api.post('/students', currentStudent); 
        setStudents(prevStudents => [...prevStudents, response.data]); 
      } 
      
      setIsModalOpen(false); 
      setCurrentStudent({ 
        rollNumber: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phoneNumber: '', 
        department: '', 
        course: '', 
        program: '', 
        batch: '', 
        section: '' 
      }); 
      setOriginalStudent({ 
        rollNumber: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phoneNumber: '', 
        department: '', 
        course: '', 
        program: '', 
        batch: '', 
        section: '' 
      }); 
      setIsEditing(false); 
    } catch (error: any) { 
      if (error.response && error.response.status === 403) { 
        setIsUnauthorized(true); 
      } else { 
        setError('Failed to save student'); 
      } 
    } 
  }; 

  const handleEdit = (student: Student) => { 
    // Additional permission check before editing
    if (!hasPermission(Action.Update)) { 
      setError('You do not have permission to edit'); 
      return; 
    } 
    
    setOriginalStudent({ ...student }); 
    setCurrentStudent({ ...student }); 
    setIsEditing(true); 
    setIsModalOpen(true); 
  }; 

  const handleDelete = async (rollNumber: string) => { 
    // Additional permission check before deleting
    if (!hasPermission(Action.Delete)) { 
      setError('You do not have permission to delete'); 
      return; 
    } 

    try { 
      await api.delete(`/students/${rollNumber}`); 
      setStudents(prevStudents => prevStudents.filter(student => student.rollNumber !== rollNumber)); 
    } catch (error: any) { 
      if (error.response && error.response.status === 403) { 
        setIsUnauthorized(true); 
      } else { 
        setError('Failed to delete student'); 
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
          <h1 className="text-2xl font-bold">Students</h1> 
          {/* Conditionally render Add Student button */}
          {hasPermission(Action.Create) && (
            <button 
              onClick={() => { 
                setCurrentStudent({ 
                  rollNumber: '', 
                  firstName: '', 
                  lastName: '', 
                  email: '', 
                  phoneNumber: '', 
                  department: '', 
                  course: '', 
                  program: '', 
                  batch: '', 
                  section: '' 
                }); 
                setIsEditing(false); 
                setIsModalOpen(true); 
              }} 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" 
            > 
              Add Student 
            </button>
          )} 
        </div> 
        <StudentTable 
          students={students} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          canEdit={hasPermission(Action.Update)} 
          canDelete={hasPermission(Action.Delete)} 
        /> 
        {isModalOpen && ( 
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> 
            <div className="bg-white p-6 rounded-lg w-[500px]"> 
              <h2 className="text-xl mb-4"> 
                {isEditing ? 'Edit Student' : 'Add Student'} 
              </h2> 
              <form onSubmit={handleAddEditStudent}> 
                <div className="grid grid-cols-2 gap-4"> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Roll Number</label> 
                    <input 
                      type="text" 
                      value={currentStudent.rollNumber} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, rollNumber: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                      disabled={isEditing} 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">First Name</label> 
                    <input 
                      type="text" 
                      value={currentStudent.firstName} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, firstName: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Last Name</label> 
                    <input 
                      type="text" 
                      value={currentStudent.lastName} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, lastName: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Email</label> 
                    <input 
                      type="email" 
                      value={currentStudent.email} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, email: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Phone Number</label> 
                    <input 
                      type="tel" 
                      value={currentStudent.phoneNumber} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, phoneNumber: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                      pattern="[0-9]{10}" 
                      maxLength={10} 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Department</label> 
                    <input 
                      type="text" 
                      value={currentStudent.department} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, department: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Course</label> 
                    <input 
                      type="text" 
                      value={currentStudent.course} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, course: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Program</label> 
                    <input 
                      type="text" 
                      value={currentStudent.program} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, program: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Batch</label> 
                    <input 
                      type="text" 
                      value={currentStudent.batch} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, batch: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
                    /> 
                  </div> 
                  <div className="mb-4"> 
                    <label className="block text-gray-700 mb-2">Section</label> 
                    <input 
                      type="text" 
                      value={currentStudent.section} 
                      onChange={(e) => setCurrentStudent((prev) => ({ ...prev, section: e.target.value }))} 
                      className="w-full px-3 py-2 border rounded-md" 
                      required 
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

export default StudentPage;