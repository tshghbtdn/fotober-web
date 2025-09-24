export async function updateOutput({
	job_code,
	output,
}: {
	job_code: string;
	output: string;
}) {
	try {
		if (!process.env.NEXT_PUBLIC_SERVER_URL) {
			throw new Error("SERVER_URL is not defined in the environment variables.");
		}

		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role') || '';

		if (!token || !role) {
			throw new Error('Authentication token or role is missing');
		}
		
		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/output`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				'x-client-role': role
			},
			body: JSON.stringify({
				job_code,
				output,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to update output');
		}
	}
	catch (error) {
		console.error('Error updating output:', error);
		throw error;
	}
}
