// src/models/interfaces/IJobStatus.ts
// IJob interface: cấu trúc dữ liệu của một công việc, bao gồm các thông tin trạng thái

export interface IJobStatus {
    job_code: string;
    output: string;
    status?: string;
    feedback?: string;
    next_act: string;
}