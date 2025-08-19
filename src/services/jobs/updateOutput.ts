export async function updateOutput({
  token,
  job_code,
  output,
}: {
  token: string;
  job_code: string;
  output: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/output`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-client-role': localStorage.getItem('role')||' '
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

  return response.json();
}
