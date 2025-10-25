// file: src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  	try {
		if (!process.env.SERVER_URL) {
			throw new Error("SERVER_URL is not defined in the environment variables.");
		}

		const SERVER_URL = process.env.SERVER_URL;
		const { username, email, password, name, role } = await req.json();
		
    	await fetch(SERVER_URL+"/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				name,
				role,
			}),
      	});

		return NextResponse.json({ success: true });
  	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message || "Register failed" },
			{ status: 400 }
		);
	}
}
