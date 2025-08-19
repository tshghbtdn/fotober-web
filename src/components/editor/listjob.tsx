//File: src/editor/listjob.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { fetchJobs, Job } from '@/services/jobs/getjob';
import { updateOutput } from '@/services/jobs/updateOutput';

export default function ListJob() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string>('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const loadJobs = async () => {
    if (!token) {
      setError('Token not found');
      return;
    }

    try {
      const data = await fetchJobs(token);
      setJobs(data);

      // Nếu đang mở 1 job, cập nhật lại nó từ danh sách mới
      if (selectedJob) {
        const updated = data.find((job) => job.job_code === selectedJob.job_code);
        if (updated) {
          setSelectedJob(updated);
          setOutput(updated.output || '');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSelectJob = (job: Job) => {
    setIsDetailVisible(true);
    setTimeout(() => {
      setSelectedJob(job);
      setOutput(job.output || '');
    }, 300);
  };

  const handleCloseDetail = () => {
    setSelectedJob(null);
    setTimeout(() => {
      setIsDetailVisible(false);
    }, 300);
  };

  const handleSaveOutput = async () => {
    if (!selectedJob || !token) return;

    try {
      await updateOutput({ job_code: selectedJob.job_code, output, token });
      message.success('Output updated successfully');
      await loadJobs(); // load lại job sau khi lưu
    } catch (err: any) {
      message.error(err.message || 'Failed to update output');
    }
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] transition-all duration-700 ease-in-out">
      <div
        className={`transition-[width] duration-700 ease-in-out ${isDetailVisible ? 'w-3/5' : 'w-full'} flex justify-center p-6`}
        style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        <div className="w-full max-w-xl space-y-4">
          {error && <div className="text-red-500 text-center">Error: {error}</div>}
          {jobs.map((job) => (
            <div
              key={job.job_code}
              onClick={() => handleSelectJob(job)}
              className="transition-all rounded-lg border px-4 py-3 shadow-sm cursor-pointer bg-white border-gray-200 hover:shadow-md"
            >
              <h3 className="font-semibold text-base text-gray-800 text-center">
                {job.job_code}
              </h3>
              <p className="text-xs text-gray-500 text-center">
                Customer: {job.customer_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-[width] duration-700 ease-in-out bg-white border-l ${isDetailVisible ? 'w-2/5' : 'w-0'} flex flex-col`}
        style={{ maxHeight: 'calc(100vh - 64px)' }}
      >
        {selectedJob && (
          <div className="flex flex-col h-full py-6 px-13">
            <div className="flex-1 overflow-y-auto w-full max-w-xl mx-auto space-y-4">
              <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  Job Code: {selectedJob.job_code}
                </h2>
                <Button size="small" onClick={handleCloseDetail}>
                  Close
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <Item label="Customer" icon="👤" value={selectedJob.customer_name} />
                <Item label="Create Date" icon="📅" value={selectedJob.create_date} />
                <Item label="Deadline" icon="⏰" value={selectedJob.deadline} />
                <Item label="Job Type" icon="🛠️" value={selectedJob.job_type} />
                <Item label="Sub Type" icon="🔖" value={selectedJob.sub_type} />
                <Item label="Volume" icon="📦" value={selectedJob.volume} />
                <Item label="Input" icon="📥" value={selectedJob.input} />
                <Item
                  label="Output"
                  icon="📤"
                  value={
                    <div className="w-full">
                      <Input.TextArea
                        value={output}
                        onChange={(e) => setOutput(e.target.value.trimEnd())}
                        rows={2}
                        style={{
                          width: '100%',
                          resize: 'none',
                          overflow: 'hidden',
                          lineHeight: '1.5',
                        }}
                      />
                    </div>
                  }
                />
                <Item label="Instruction" icon="📝" value={selectedJob.instruction} />
              </div>
            </div>

            <div className="px-4 py-2 border-t border-gray-200">
              <Button type="primary" onClick={handleSaveOutput} block>
                Save Output
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Item({
  label,
  icon,
  value,
}: {
  label: string;
  icon: string;
  value: string | number | React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-2 w-full">
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span className="font-semibold w-28">{label}:</span>
      <div className="flex-1">{value}</div>
    </div>
  );
}
