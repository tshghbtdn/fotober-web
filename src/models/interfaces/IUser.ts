export interface IUser {
    id?: string;
    name: string;
    role: 'editor' | 'manager' | 'admin'| 'saler';
    email?: string;
    cscode?: string;
}

export function isUser(obj: any): obj is IUser {
    return (
        obj &&
        typeof obj === 'object' &&
        'name' in obj &&
        typeof obj.name === 'string' &&
        'role' in obj &&
        (obj.role === 'editor' || obj.role === 'manager' || obj.role === 'admin' || obj.role === 'saler')
    );
}