// file: src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { login } from "@/services/authFunctions/login";

export async function POST(req: Request) {
	try {
		const { username, password } = await req.json();
		const result = await login({ username, password });

		if (!result || !result.userInfor)
			throw Error("Something went wrong");

		const response = NextResponse.json({ success: true, data: result.userInfor });

		response.cookies.set("token", result.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24,
		});

		response.cookies.set("role", result.userInfor.role, {
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
