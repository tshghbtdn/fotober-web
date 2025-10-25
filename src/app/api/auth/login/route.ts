// file: src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		if (!process.env.SERVER_URL) {
			throw new Error("SERVER_URL is not defined in the environment variables.");
		}
		const SERVER_URL = process.env.SERVER_URL;		
		const { username, password } = await req.json();

		const result = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

		const data = await result.json();

		if (!result.ok) {
			throw new Error(data.message || "Login failed");
		}

		if (!data)
			throw Error("Something went wrong");

		const response = NextResponse.json({ success: true, data: { name: data.name, role: data.role, cscode: data.cscode } });

		response.cookies.set("token", data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		response.cookies.set("role", data.role, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message || "Login failed" },
			{ status: 401 }
		);
	}
}
