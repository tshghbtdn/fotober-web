export async function countTodayJob(): Promise<number> {
	try {
		if (!process.env.SERVER_URL) {
            throw new Error("SERVER_URL is not defined in the environment variables.");
        }
		
		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role') || '';

		if (!token || !role) {
			throw new Error('Authentication token or role is missing');
		}
		
		const response = await fetch(`${process.env.SERVER_URL}/job/countToday`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-client-role': role,
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to count today jobs (${response.status}): ${errorText}`);
		}

		const data = await response.json();
		if (typeof data.count !== 'number') {
			throw new Error('Invalid response format: count is not a number');
		}

		return data.count;
	}
	catch (error) {
		console.error('Error counting today jobs:', error);
		throw error;
	}
}
	