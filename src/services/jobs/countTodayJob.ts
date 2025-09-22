export async function countTodayJob(): Promise<number> {
	const token=localStorage.getItem('token');
	
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/countToday`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'x-client-role': localStorage.getItem('role') || ' ',
		},
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to count today jobs (${response.status}): ${errorText}`);
	}

	const data = await response.json();
	return data.count as number; // server trả về { count: 5 }
}
	