// file: src/services/authFunctions/login.ts

import { IUser } from "@/models/interfaces";

export const login = async ({
    username,
    password,
}: {
    username: string,
    password: string,
}): Promise<{
    userInfor?: IUser;
    message?: string;
    token: string;
}> => {
    try {
        if (!process.env.SERVER_URL) {
            throw new Error("SERVER_URL is not defined in the environment variables.");
        }
        
        const SERVER_URL = process.env.SERVER_URL;
        const res = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }
        return {
            message: data.message,
            userInfor: {
                name: data.name,
                role: data.role,
                cscode: data.cscode
            },
            token: data.token
        };
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};