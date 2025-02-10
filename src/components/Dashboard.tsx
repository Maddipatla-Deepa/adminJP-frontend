// src/components/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import DepartmentTable from './DepartmentTable';
import { Routes, Route } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
            <Route path="/departments" element={<DepartmentTable />} />
            {/* Add more routes for other pages */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;