import { IJob } from "@/models/interfaces";

export async function createJob(job: IJob): Promise<void> {
	try {
		if (!process.env.NEXT_PUBLIC_SERVER_URL) {
            throw new Error("SERVER_URL is not defined in the environment variables.");
        }
		
		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role') || '';

		if (!token || !role) {
			throw new Error('Authentication token or role is missing');
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-client-role': role,
			},
			body: JSON.stringify(job),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || `Failed to create job (${response.status})`);
		}
	}
	catch (error) {
		console.error('Error creating job:', error);
		throw error;
	}
}
