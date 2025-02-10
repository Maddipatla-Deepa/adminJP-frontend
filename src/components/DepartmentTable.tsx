// // src/components/DepartmentTable.tsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// interface DepartmentTableProps {
//   departments: Department[];
//   onEdit: (department: Department) => void;
//   onDelete: (department: string, section: string) => void;
// }

// const DepartmentTable: React.FC<DepartmentTableProps> = ({ 
//   departments, 
//   onEdit, 
//   onDelete 
// }) => {
//   const { user } = useAuth();
//   const canEdit = user?.role === 'admin' || user?.role === 'editor';
//   const canDelete = user?.role === 'admin';

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Department</th>
//             <th className="py-2 px-4 border-b text-left">Section</th>
//             {(canEdit || canDelete) && (
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((department, index) => (
//             <tr key={`${department.department}-${department.section}-${index}`}>
//               <td className="py-2 px-4 border-b">{department.department}</td>
//               <td className="py-2 px-4 border-b">{department.section}</td>
//               {(canEdit || canDelete) && (
//                 <td className="py-2 px-4 border-b">
//                   {canEdit && (
//                     <button
//                       onClick={() => onEdit(department)}
//                       className="mr-2 text-blue-500 hover:text-blue-700"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   {canDelete && (
//                     <button
//                       onClick={() => onDelete(department.department, department.section)}
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

// export default DepartmentTable;

// import React from 'react';

// interface Department {
//   id?: string;
//   department: string;
//   section: string;
// }

// interface DepartmentTableProps {
//   departments: Department[];
//   onEdit: (department: Department) => void;
//   onDelete: (department: string, section: string) => void;
// }

// const DepartmentTable: React.FC<DepartmentTableProps> = ({ 
//   departments, 
//   onEdit, 
//   onDelete 
// }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Department</th>
//             <th className="py-2 px-4 border-b text-left">Section</th>
//             <th className="py-2 px-4 border-b text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((department, index) => (
//             <tr key={`${department.department}-${department.section}-${index}`}>
//               <td className="py-2 px-4 border-b">{department.department}</td>
//               <td className="py-2 px-4 border-b">{department.section}</td>
//               <td className="py-2 px-4 border-b">
//                 <button 
//                   onClick={() => onEdit(department)}
//                   className="mr-2 text-blue-500 hover:text-blue-700"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => onDelete(department.department, department.section)}
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

// export default DepartmentTable;

import React from 'react';

interface Department {
  id?: string;
  department: string;
  section: string;
}

interface DepartmentTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (department: string, section: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ 
  departments, 
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
            <th className="py-2 px-4 border-b text-left">Department</th>
            <th className="py-2 px-4 border-b text-left">Section</th>
            {/* Only show Actions column if user has edit or delete permissions */}
            {(canEdit || canDelete) && (
              <th className="py-2 px-4 border-b text-left">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={`${department.department}-${department.section}-${index}`}>
              <td className="py-2 px-4 border-b">{department.department}</td>
              <td className="py-2 px-4 border-b">{department.section}</td>
              {(canEdit || canDelete) && (
                <td className="py-2 px-4 border-b">
                  {canEdit && (
                    <button 
                      onClick={() => onEdit(department)}
                      className="mr-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button 
                      onClick={() => onDelete(department.department, department.section)}
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

export default DepartmentTable;