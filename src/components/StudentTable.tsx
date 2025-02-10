// // src/components/StudentTable.tsx
// import React from 'react';
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

// interface StudentTableProps {
//   students: Student[];
//   onEdit: (student: Student) => void;
//   onDelete: (rollNumber: string) => void;
// }

// const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
//   const { user } = useAuth();
//   const canEdit = user?.role === 'admin' || user?.role === 'editor';
//   const canDelete = user?.role === 'admin';

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Roll Number</th>
//             <th className="py-2 px-4 border-b text-left">Name</th>
//             <th className="py-2 px-4 border-b text-left">Department</th>
//             <th className="py-2 px-4 border-b text-left">Course</th>
//             <th className="py-2 px-4 border-b text-left">Email</th>
//             {(canEdit || canDelete) && (
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.rollNumber}>
//               <td className="py-2 px-4 border-b">{student.rollNumber}</td>
//               <td className="py-2 px-4 border-b">{`${student.firstName} ${student.lastName}`}</td>
//               <td className="py-2 px-4 border-b">{student.department}</td>
//               <td className="py-2 px-4 border-b">{student.course}</td>
//               <td className="py-2 px-4 border-b">{student.email}</td>
//               {(canEdit || canDelete) && (
//                 <td className="py-2 px-4 border-b">
//                   {canEdit && (
//                     <button
//                       onClick={() => onEdit(student)}
//                       className="mr-2 text-blue-500 hover:text-blue-700"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   {canDelete && (
//                     <button
//                       onClick={() => onDelete(student.rollNumber)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentTable;

// import React from 'react';

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

// interface StudentTableProps {
//   students: Student[];
//   onEdit: (student: Student) => void;
//   onDelete: (rollNumber: string) => void;
// }

// const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Roll Number</th>
//             <th className="py-2 px-4 border-b text-left">Name</th>
//             <th className="py-2 px-4 border-b text-left">Department</th>
//             <th className="py-2 px-4 border-b text-left">Course</th>
//             <th className="py-2 px-4 border-b text-left">Email</th>
//             <th className="py-2 px-4 border-b text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.rollNumber}>
//               <td className="py-2 px-4 border-b">{student.rollNumber}</td>
//               <td className="py-2 px-4 border-b">{`${student.firstName} ${student.lastName}`}</td>
//               <td className="py-2 px-4 border-b">{student.department}</td>
//               <td className="py-2 px-4 border-b">{student.course}</td>
//               <td className="py-2 px-4 border-b">{student.email}</td>
//               <td className="py-2 px-4 border-b">
//                 <button 
//                   onClick={() => onEdit(student)} 
//                   className="mr-2 text-blue-500 hover:text-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => onDelete(student.rollNumber)} 
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentTable;

import React from 'react';

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

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (rollNumber: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  onEdit, 
  onDelete, 
  canEdit, 
  canDelete 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Roll Number</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Department</th>
            <th className="py-2 px-4 border-b text-left">Course</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            {/* Only show Actions column if user has edit or delete permissions */}
            {(canEdit || canDelete) && (
              <th className="py-2 px-4 border-b text-left">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td className="py-2 px-4 border-b">{student.rollNumber}</td>
              <td className="py-2 px-4 border-b">{`${student.firstName} ${student.lastName}`}</td>
              <td className="py-2 px-4 border-b">{student.department}</td>
              <td className="py-2 px-4 border-b">{student.course}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              {(canEdit || canDelete) && (
                <td className="py-2 px-4 border-b">
                  {canEdit && (
                    <button
                      onClick={() => onEdit(student)}
                      className="mr-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => onDelete(student.rollNumber)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;