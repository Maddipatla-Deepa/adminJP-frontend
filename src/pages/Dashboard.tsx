// src/pages/StudentPage.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        
        <p>Welcome to dashboard</p>
      </div>
    </div>
  );
};

export default DashboardPage;
