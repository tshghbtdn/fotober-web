export interface IJob {
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
  user_id: string[];
  cs_code: string;
  new_job_check: boolean;

  status?: string;
  feedback?: string;
  next_act: string;
}