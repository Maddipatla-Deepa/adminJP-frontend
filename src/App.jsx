// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import LoginPage from './pages/LoginPage';
// import DepartmentPage from './pages/DepartmentPage';
// import StudentPage from './pages/StudentPage';
// import CompanyPage from './pages/CompanyPage';
// import PrivateRoute from './components/PrivateRoute';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route 
//             path="/departments" 
//             element={
//               <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <DepartmentPage />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/students" 
//             element={
//               <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <StudentPage />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/companies" 
//             element={
//               <PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <CompanyPage />
//               </PrivateRoute>
//             } 
//           />
//           <Route path="/" element={<Navigate to="/departments" replace />} />
//           <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import LoginPage from './pages/LoginPage';
// import DepartmentPage from './pages/DepartmentPage';
// import StudentPage from './pages/StudentPage';
// import CompanyPage from './pages/CompanyPage';
// import PrivateRoute from './components/PrivateRoute'
// import DashboardPage from './pages/Dashboard';
// import RootDashboard from './pages/RootDashboard';
// import UsersPage from './pages/UsersPage';
// import RoleManagement from './pages/RoleManagement';
// import PermissionsManagement from './pages/PermissionManagement';

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           {/* <Route 
//             path="/rootdashboard" 
//             element={<RootDashboard />} 
//           /> */}
//           <Route path="/rootdashboard" element={<RootDashboard />}>
//             <Route path="users" element={<UsersPage />} />
//             <Route path="modules" element={<div>Modules Page</div>} />
//             <Route path="roles" element={<RoleManagement />} />
//             <Route path="permissions" element={<PermissionsManagement />} />
//           </Route>
//           <Route
//             path="/departments"
//             element={
//               //<PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <DepartmentPage />
//               //</PrivateRoute>
//             }
//           />
//           <Route
//             path="/students"
//             element={
//               //<PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <StudentPage />
//               //</PrivateRoute>
//             }
//           />
//           <Route
//             path="/companies"
//             element={
//               //<PrivateRoute allowedRoles={['admin', 'editor', 'viewer']}>
//                 <CompanyPage />
//               //</PrivateRoute>
//             }
//           />
//           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DepartmentPage from './pages/DepartmentPage';
import StudentPage from './pages/StudentPage';
import CompanyPage from './pages/CompanyPage';
import PrivateRoute from './components/PrivateRoute'
import DashboardPage from './pages/Dashboard';
import RootDashboard from './pages/RootDashboard';
import UsersPage from './pages/UsersPage';
import RoleManagement from './pages/RoleManagement';
import PermissionsManagement from './pages/PermissionManagement';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rootdashboard" element={<RootDashboard />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="modules" element={<div>Modules Page</div>} />
            <Route path="roles" element={<RoleManagement />} />
            <Route path="permissions" element={<PermissionsManagement />} />
          </Route>
          <Route
            path="/departments"
            element={
                <DepartmentPage />
            }
          />
          <Route
            path="/students"
            element={
                <StudentPage />
            }
          />
          <Route
            path="/companies"
            element={             
                <CompanyPage />
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;