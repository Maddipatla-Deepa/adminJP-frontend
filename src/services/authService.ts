// // src/services/authService.ts
// import axios from 'axios';

// const API_URL = 'http://localhost:3000/auth';

// export interface LoginCredentials {
//   username: string;
//   password: string;
// }

// export interface User {
//   username: string;
//   role: 'admin' | 'editor' | 'viewer';
//   allowedPages: string[];
// }

// export const authService = {
//   async login(credentials: LoginCredentials) {
//     try {
//       const response = await axios.post(`${API_URL}/login`, credentials);
//       const { access_token } = response.data;
      
//       // Store token and user info
//       localStorage.setItem('token', access_token);
      
//       // Decode token to get user info
//       const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
//       const user: User = {
//         username: tokenPayload.username,
//         role: tokenPayload.role,
//         allowedPages: tokenPayload.allowedPages || []
//       };
      
//       localStorage.setItem('user', JSON.stringify(user));
      
//       return user;
//     } catch (error) {
//       console.error('Login failed', error);
//       throw error;
//     }
//   },

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },

//   getCurrentUser(): User | null {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   },

//   getToken() {
//     return localStorage.getItem('token');
//   },

//   isAuthenticated() {
//     return !!localStorage.getItem('token');
//   }
// };

// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role:string;
  allowedPages: string[];
  permissions: string[];
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { access_token } = response.data;
      
      // Decode token to get user info
      const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
      
      const user: User = {
        username: tokenPayload.username,
        role: tokenPayload.role,
        allowedPages: tokenPayload.allowedPages || [],
        permissions: tokenPayload.permissions || []
      };
      
      // Store token and user info
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};