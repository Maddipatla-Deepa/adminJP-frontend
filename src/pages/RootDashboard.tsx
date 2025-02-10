
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings 
} from 'lucide-react';

const NavItem: React.FC<{ 
  to: string, 
  icon: React.ReactNode, 
  label: string 
}> = ({ to, icon, label }) => (
  <li className="mb-2">
    <Link 
      to={to} 
      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200 group"
      aria-label={label}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: "mr-3 text-gray-400 group-hover:text-white"
      })}
      <span className="flex-1">{label}</span>
    </Link>
  </li>
);

const RootDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { rootUser, rootLogout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!rootUser) {
      navigate('/');
    }
  }, [rootUser, navigate]);

  const handleLogout = () => {
    rootLogout();
    navigate('/');
  };

  if (!rootUser) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`
          ${isSidebarOpen ? 'w-55' : 'w-15'} 
          bg-gray-800 text-white transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold">Admin Panel</h2>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-gray-700 p-2 rounded"
            aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {/* Hamburger or menu icon can be added here */}
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="mt-6">
          <ul>
            <NavItem 
              to="/rootdashboard/modules" 
              icon={<LayoutDashboard />} 
              label={isSidebarOpen ? "Modules" : ""} 
            />
            <NavItem 
              to="/rootdashboard/roles" 
              icon={<Shield />} 
              label={isSidebarOpen ? "Roles" : ""} 
            />
            <NavItem 
              to="/rootdashboard/permissions" 
              icon={<Settings />} 
              label={isSidebarOpen ? "Permissions" : ""} 
            />
            <NavItem 
              to="/rootdashboard/users" 
              icon={<Users />} 
              label={isSidebarOpen ? "Users" : ""} 
            />
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Root Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {rootUser.name || 'Root User'}</span>
            <button 
              onClick={handleLogout}
              className="
                flex items-center gap-2 
                bg-red-500 text-white 
                px-3 py-1 rounded-md 
                hover:bg-red-600 
                transition-colors duration-200
              "
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-150 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootDashboard;
