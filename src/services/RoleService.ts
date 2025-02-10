import axios from 'axios';

export interface Role {
  //departments: any;
  roleName: string;
  permissions: string[];
  allowedPages: string[];
  departments: string[];
}

export const RoleService = {
  async getAllRoles(): Promise<Role[]> {
    try {
      const response = await axios.get('http://localhost:3000/roles', {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  async createRole(roleData: Role): Promise<Role> {
    try {
      const response = await axios.post('http://localhost:3000/roles', roleData, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  },

  async updateRole(roleName: string, roleData: Partial<Role>): Promise<Role> {
    try {
      const response = await axios.put(`http://localhost:3000/roles/${roleName}`, roleData, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  },

  async deleteRole(roleName: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/roles/${roleName}`, {
        headers: {
          'Authorization': `Basic ${btoa('root:*Root!@#123$%')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
};