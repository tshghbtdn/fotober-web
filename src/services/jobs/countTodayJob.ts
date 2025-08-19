export async function countTodayJob(): Promise<number> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/countToday`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to count today jobs (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.count as number; // server trả về { count: 5 }
}
