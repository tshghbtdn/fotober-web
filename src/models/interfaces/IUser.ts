export interface IUser {
    id?: string;
    name: string;
    role: 'editor' | 'manager' | 'admin'| 'saler';
    email?: string;
    cscode?: string;
}