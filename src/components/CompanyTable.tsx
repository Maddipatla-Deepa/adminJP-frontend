// // src/components/CompanyTable.tsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// interface Company {
//   company: string;
//   email: string;
//   phoneNumber: string;
// }

// interface CompanyTableProps {
//   companies: Company[];
//   onEdit: (company: Company) => void;
//   onDelete: (email: string) => void;
// }

// const CompanyTable: React.FC<CompanyTableProps> = ({ companies, onEdit, onDelete }) => {
//   const { user } = useAuth();
//   const canEdit = user?.role === 'admin' || user?.role === 'editor';
//   const canDelete = user?.role === 'admin';

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Company Name</th>
//             <th className="py-2 px-4 border-b text-left">Email</th>
//             <th className="py-2 px-4 border-b text-left">Phone Number</th>
//             {(canEdit || canDelete) && (
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map((company) => (
//             <tr key={company.email}>
//               <td className="py-2 px-4 border-b">{company.company}</td>
//               <td className="py-2 px-4 border-b">{company.email}</td>
//               <td className="py-2 px-4 border-b">{company.phoneNumber}</td>
//               {(canEdit || canDelete) && (
//                 <td className="py-2 px-4 border-b">
//                   {canEdit && (
//                     <button
//                       onClick={() => onEdit(company)}
//                       className="mr-2 text-blue-500 hover:text-blue-700"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   {canDelete && (
//                     <button
//                       onClick={() => onDelete(company.email)}
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

// export default CompanyTable;

import React from 'react';

interface Company {
  company: string;
  email: string;
  phoneNumber: string;
}

interface CompanyTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (email: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ 
  companies, 
  onEdit, 
  onDelete, 
  canEdit, 
  canDelete 
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Company Name</th>
          <th className="border p-2 text-left">Email</th>
          <th className="border p-2 text-left">Phone Number</th>
          {/* Only show Actions column if user has edit or delete permissions */}
          {(canEdit || canDelete) && (
            <th className="border p-2 text-left">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.email} className="hover:bg-gray-50">
            <td className="border p-2">{company.company}</td>
            <td className="border p-2">{company.email}</td>
            <td className="border p-2">{company.phoneNumber}</td>
            {(canEdit || canDelete) && (
              <td className="border p-2">
                {canEdit && (
                  <button
                    onClick={() => onEdit(company)}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => onDelete(company.email)}
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
  );
};

export default CompanyTable;