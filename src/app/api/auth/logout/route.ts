// file: src/app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  	try {
		const response = NextResponse.json({ success: true });

		response.cookies.delete("token");

		return response;
  	} catch (error: any) {
	return NextResponse.json(
			{ success: false, message: error.message || "Logout failed" },
			{ status: 401 }
		);
  	}
}