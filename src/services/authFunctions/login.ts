// file: src/services/authFunctions/login.ts

import { IUser, isUser } from "@/models/interfaces";

export const login = async ({
    username,
    password
}: {
    username: string;
    password: string;
}): Promise<IUser> => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.message);

        const data = result.data;
        if (!isUser(data)) {
            throw new Error('Invalid data');
        }

        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
  };