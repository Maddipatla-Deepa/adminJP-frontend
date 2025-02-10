// // src/pages/LoginPage.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl mb-6 text-center"> Normal Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  // Normal User Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Root Login State
  const [rootUsername, setRootUsername] = useState('');
  const [rootPassword, setRootPassword] = useState('');
  const [rootError, setRootError] = useState('');

  const navigate = useNavigate();
  const { login, rootLogin } = useAuth();

  const handleNormalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleRootLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = rootLogin(rootUsername, rootPassword);
    if (!success) {
      setRootError('Invalid root credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex space-x-8">
        {/* Root Login Card */}
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl mb-6 text-center">Root Login</h2>
          {rootError && <div className="text-red-500 mb-4">{rootError}</div>}
          <form onSubmit={handleRootLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Root Username</label>
              <input 
                type="text" 
                value={rootUsername} 
                onChange={(e) => setRootUsername(e.target.value)} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Root Password</label>
              <input 
                type="password" 
                value={rootPassword} 
                onChange={(e) => setRootPassword(e.target.value)} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Root Login
            </button>
          </form>
        </div>
        
        {/* Normal Login Card */}
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl mb-6 text-center">User Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleNormalLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-3 py-2 border rounded-md" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, rootLogin } = useAuth();
//   const navigate = useNavigate();

//   const handleNormalLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const user = await login(username, password);
      
//       // Redirect based on user's allowed pages
//       if (user.allowedPages.includes('dashboard')) {
//         navigate('/dashboard');
//       } else if (user.allowedPages.length > 0) {
//         // If dashboard is not allowed, find the first allowed page
//         const firstAllowedPage = user.allowedPages.find(page => 
//           ['departments', 'students', 'companies'].includes(page)
//         );
        
//         if (firstAllowedPage) {
//           navigate(`/${firstAllowedPage}`);
//         } else {
//           // If no specific page is allowed, redirect to a default or show error
//           setError('No access to any pages. Contact administrator.');
//         }
//       } else {
//         setError('No pages assigned to this user. Contact administrator.');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   const handleRootLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (rootLogin(username, password)) {
//       navigate('/rootdashboard');
//     } else {
//       setError('Invalid root credentials');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//        <div className="flex space-x-8">
//         {/* Root Login Card (Existing Implementation) */}
//         <div className="bg-white p-8 rounded-lg shadow-md w-96">
//             <h2 className="text-center text-2xl font-bold mb-6">Root Login</h2>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleRootLogin} className="space-y-4">
//               <div>
//                 <label htmlFor="root-username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   id="root-username"
//                   type="text"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="root-password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="root-password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
//               >
//                 Root Sign in
//               </button>
//             </form>
//           </div>

//           {/* Normal User Login Card */}
//           <div className="bg-white p-8 rounded-lg shadow-md w-96">
//             <h2 className="text-center text-2xl font-bold mb-6">User Login</h2>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleNormalLogin} className="space-y-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   type="text"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default LoginPage;