// //for user management
// import axios from 'axios';
// import { UserRole } from '../components/types';// You'll need to define this type

// // Base URL for your backend API
// const API_BASE_URL = 'http://localhost:3000/auth';

// // Encode credentials for basic auth
// const getBasicAuthHeader = () => {
//   const credentials = btoa('root:*Root!@#123$%');
//   return { 
//     headers: { 
//       'Authorization': `Basic ${credentials}`,
//       'Content-Type': 'application/json'
//     } 
//   };
// };

// export interface User {
//   _id?: string;
//   username: string;
//   role: UserRole;
//   allowedPages: string[];
// }

// export interface CreateUserInput {
//   username: string;
//   password: string;
//   role: UserRole;
//   allowedPages: string[];
// }

// export const UserService = {
//   async getAllUsers(): Promise<User[]> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users`, getBasicAuthHeader());
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw error;
//     }
//   },

//   async createUser(userData: CreateUserInput): Promise<User> {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/register`, userData, getBasicAuthHeader());
//       return response.data;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw error;
//     }
//   },

//   async updateUser(userId: string, userData: Partial<CreateUserInput>): Promise<User> {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData, getBasicAuthHeader());
//       return response.data;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   },

//   async deleteUser(userId: string): Promise<void> {
//     try {
//       await axios.delete(`${API_BASE_URL}/users/${userId}`, getBasicAuthHeader());
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       throw error;
//     }
//   }
// };

import axios from 'axios';

export interface User {
  _id: string;
  username: string;
  roles: string[];
  permissions: string[];
  allowedPages: string[];
}

export const UserService = {
  async createUser(userData: { username: string; password: string; roles: string[] }): Promise<User> {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get('http://localhost:3000/auth/users', {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async updateUser(userId: string, userData: { roles?: string[]; password?: string }): Promise<User> {
    try {
      const response = await axios.put(`http://localhost:3000/auth/users/${userId}`, userData, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser(userId: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/auth/users/${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};