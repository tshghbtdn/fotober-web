import { NextRequest, NextResponse } from "next/server";
import path from "path";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("token");
    const role = request.cookies.get("role")?.value;
	const { pathname } = request.nextUrl;

    if (pathname.startsWith("/login") || pathname.startsWith("/"))
        return NextResponse.next();

	if (!accessToken){
		request.cookies.delete("token");
        request.cookies.delete("role");
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (pathname.startsWith("/manager") && role !== "manager") {
		return NextResponse.redirect(new URL("/error?msg=Bạn%20không%20có%20quyền%20truy%20ccập", request.url));
	}

	if (pathname.startsWith("/editor") && role !== "editor") {
		return NextResponse.redirect(new URL("/error?msg=Bạn%20không%20có%20quyền%20truy%20ccập", request.url));
	}

	if (pathname.startsWith("/cs") && role !== "saler") {
		return NextResponse.redirect(new URL("/error?msg=Bạn%20không%20có%20quyền%20truy%20ccập", request.url));
	}
	return NextResponse.next();
}

export const config = {

}