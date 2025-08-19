export interface Job {
  job_code: string;
  customer_name: string;
  create_date: string;
  job_type: number;
  volume: number;
  sub_type: number;
  input: string;
  output: string;
  instruction: string;
  deadline: string | null;
  user_id: number[];
  cs_code: string;
  new_job_check: boolean;
}

export async function createJob(job: Job, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/createJob`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-client-role': localStorage.getItem('role') || ' ',
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to create job (${response.status})`);
  }

  return response.json() as Promise<Job>;
}
