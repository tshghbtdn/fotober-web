export interface IUser {
    id: string;
    name: string;
    role: 'editor' | 'manager' | 'admin';
    email?: string;
    dateJoined?: string; // Định dạng "YYYY-MM-DD"
}