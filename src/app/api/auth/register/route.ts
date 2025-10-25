// file: src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { register } from "@/services/authFunctions";

export async function POST(req: Request) {
  	try {
		const { username, email, password, name, role } = await req.json();
		await register(username, email, password, name, role);

		return NextResponse.json({ success: true });
  	} catch (error: any) {
		return NextResponse.json(
			{ success: false, message: error.message || "Register failed" },
			{ status: 400 }
		);
	}
}
