// file: src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { login } from "@/services/authFunctions/login";
import { cookies } from "next/headers";
import { createJob } from "@/services";
import { message } from "antd";

export async function POST(req: Request) {
  try {
    const { job } = await req.json();
    const token = (await cookies()).get("token")?.value;

    if (!token){
        return NextResponse.json({ message: "Unauthenticated" });
    }

    await createJob(token, job);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
        { success: false, message: error.message || "Login failed" },
        { status: 401 }
    );
  }
}
