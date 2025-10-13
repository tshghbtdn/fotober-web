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
            // Trả về lỗi chi tiết từ server
            throw new Error(data.message || "Login failed");
        }

        // Lưu token vào localStorage
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role || ""); 
            localStorage.setItem("name", data.name);
            if (data.cscode)    localStorage.setItem("cscode", data.cscode);
        } else {
            throw new Error("Token not found in login response");
        }

        // Trả về role hoặc bất cứ thông tin nào bạn cần
        return {
            message: data.message,
            // data
        };
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};