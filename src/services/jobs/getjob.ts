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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }) // gửi token trong body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch jobs (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data as Job[];
}
