// // src/components/Sidebar.tsx
// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   Building2, 
//   GraduationCap, 
//   Briefcase, 
//   LogOut,
//   LayoutDashboard
// } from 'lucide-react';

// const Sidebar: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const canAccessPage = (page: string) => 
//     user?.role === 'admin' || 
//     user?.role === 'editor' || 
//     user?.role === 'viewer' || 
//     user?.allowedPages.includes(page);

//   const menuItems = [
//     {
//       path: '/dashboard',
//       name: 'Dashboard',
//       icon: LayoutDashboard,
//       access: true
//     },
//     {
//       path: '/departments',
//       name: 'Departments',
//       icon: Building2,
//       access: canAccessPage('departments')
//     },
//     {
//       path: '/students',
//       name: 'Students',
//       icon: GraduationCap,
//       access: canAccessPage('students')
//     },
//     {
//       path: '/companies',
//       name: 'Companies',
//       icon: Briefcase,
//       access: canAccessPage('companies')
//     }
//   ];

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
//       </div>
      
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           {menuItems.map((item) => 
//             item.access && (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
//                     ${location.pathname === item.path 
//                       ? 'bg-blue-50 text-blue-600' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                 >
//                   <item.icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             )
//           )}
//         </ul>
//       </nav>

//       <div className="p-4 border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           <LogOut className="w-5 h-5" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Building2,
  GraduationCap,
  Briefcase,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: '/departments',
      name: 'Departments',
      icon: Building2,
    },
    {
      path: '/students',
      name: 'Students',
      icon: GraduationCap,
    },
    {
      path: '/companies',
      name: 'Companies',
      icon: Briefcase,
    },
  ];

  return (
    <div
      className="w-64 h-screen flex flex-col"
      style={{
        background: 'linear-gradient(to bottom, #7DE2FC, #B9FBC0)', // Light blue to light green gradient
      }}
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(
            (item) =>
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors 
                      ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;