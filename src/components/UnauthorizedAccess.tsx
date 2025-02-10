// src/components/UnauthorizedAccess.tsx
import React from 'react';

const UnauthorizedAccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
