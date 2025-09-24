import { IJob } from "@/models/interfaces";

export async function getJobByCSCode(): Promise<IJob[]> {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error("SERVER_URL is not defined in the environment variables.");
    }

	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role') || '';

    if (!token || !role) {
        throw new Error('Authentication token or role is missing');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/cs  `, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-client-role': role,
        },
    });
    const data = await response.json();
    return data;
}
    