export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    VIEWER = 'viewer'
    // Add other roles as needed
  }

  
export interface Role {
  roleName: string;
  permissions: string[];
  allowedPages: string[];
}