// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { User, authService } from '../services/authService';

// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(authService.getCurrentUser());

//   const login = async (username: string, password: string) => {
//     const loggedUser = await authService.login({ username, password });
//     setUser(loggedUser);
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       logout, 
//       isAuthenticated: !!user 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, authService } from '../services/authService';

// interface AuthContextType {
//   user: User | null;
//   rootUser: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   rootLogin: (username: string, password: string) => boolean;
//   logout: () => void;
//   rootLogout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(authService.getCurrentUser());
//   const [rootUser, setRootUser] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const login = async (username: string, password: string) => {
//         const loggedUser = await authService.login({ username, password });
//         setUser(loggedUser);
//       };

//   const rootLogin = (username: string, password: string): boolean => {
//     if (username === 'root' && password === '*Root!@#123$%') {
//       setRootUser(username);
//       navigate('/rootdashboard');
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//         authService.logout();
//         setUser(null);
//       };

//   const rootLogout = () => {
//     setRootUser(null);
//     navigate('/');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       rootUser, 
//       login, 
//       rootLogin, 
//       logout, 
//       rootLogout, 
//       isAuthenticated: !!user
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  rootUser: string | null;
  login: (username: string, password: string) => Promise<User>;
  rootLogin: (username: string, password: string) => boolean;
  logout: () => void;
  rootLogout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [rootUser, setRootUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<User> => {
    try {
      const loggedUser = await authService.login({ username, password });
      setUser(loggedUser);
      return loggedUser;
    } catch (error) {
      throw error;
    }
  };

  const rootLogin = (username: string, password: string): boolean => {
    if (username === 'root' && password === '*Root!@#123$%') {
      setRootUser(username);
      navigate('/rootdashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const rootLogout = () => {
    setRootUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        rootUser, 
        login, 
        rootLogin, 
        logout, 
        rootLogout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};