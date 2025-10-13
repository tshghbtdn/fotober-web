import { IJob } from "@/models/interfaces";

export async function fetchJobs(): Promise<IJob[]> {
	try {
		if (!process.env.SERVER_URL) {
            throw new Error("SERVER_URL is not defined in the environment variables.");
        }

		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role') || '';

		if (!token || !role) {
			throw new Error('Authentication token or role is missing');
		}
		
		const response = await fetch(`${process.env.SERVER_URL}/job`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-client-role': role,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch jobs (${response.status}): ${errorText}`);
		}

		const data = await response.json();
		return data;
	}
	catch (error) {
		console.error('Error fetching jobs:', error);
		throw error;
	}
}
