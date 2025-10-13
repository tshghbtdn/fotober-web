import { NextResponse } from "next/server";
import { login } from "@/services/authFunctions/login";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    try {
        const data = await login({ username, password });
        
    }
}