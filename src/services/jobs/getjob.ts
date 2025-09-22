export interface Job {
	job_code: string;
	customer_name: string;
	create_date: string;
	job_type: number;
	volume: number;
	sub_type: number;
	input: string;
	instruction: string;
	deadline: string;
	output: string;
}

export async function fetchJobs(token: string): Promise<Job[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-client-role': localStorage.getItem('role') || ' ',
		},
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to fetch jobs (${response.status}): ${errorText}`);
	}

	const data = await response.json();
	return data as Job[];
}
