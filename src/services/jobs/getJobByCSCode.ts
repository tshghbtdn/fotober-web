import { IJob } from "@/models/interfaces";


export async function getJobByCSCode(): Promise<IJob[]> {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/cs  `, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-client-role': localStorage.getItem('role') || ' ',
        },
    });
    const data = await response.json();
    return data as IJob[];
}
    