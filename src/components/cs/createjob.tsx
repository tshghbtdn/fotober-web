'use client';

import { useState, useEffect } from 'react';
import { Layout, Tabs, Form, Input, DatePicker, Button, Table, Select, Checkbox, InputNumber, message } from 'antd';
import { createJob} from '@/services/jobs/createJob';
import { countTodayJob } from '@/services/jobs/countTodayJob';
import { IJob } from "@/models/interfaces";
import { getJobByCSCode } from "@/services/jobs/getJobByCSCode";

const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

const tasktype_info = [
	{
	id: 1,
	taskname: 'Chỉnh sửa hình ảnh',
	taskcompound: [
		{ name: 'Tăng cường hình ảnh', description: 'Làm sáng, chỉnh nét, cân bằng màu, loại phản xạ' },
		{ name: 'Chuyển ngày – đêm', description: 'Hiệu ứng chuyển đổi ảnh theo thời gian' },
		{ name: 'Xóa vật thể', description: 'Loại bỏ chi tiết không cần thiết (logo, người, xe...)' },
		{ name: 'Nâng cấp ảnh 360°', description: 'Tăng độ phân giải, chỉnh sửa góc nhìn 360°' },
		{ name: 'Kiểm tra & Phản hồi', description: 'Khách hàng hoặc quản lý kiểm tra và gửi phản hồi (qua comment, note)' },
	],
	},
	{
	id: 2,
	taskname: 'Chỉnh sửa video',
	taskcompound: [
		{ name: 'Video bất động sản', description: 'Tạo video mượt, phối cảnh, nhạc nền chuyên nghiệp' },
		{ name: 'Video ô tô', description: 'Chèn hiệu ứng, cảnh quay, dựng nhạc đặc trưng' },
		{ name: 'Xây dựng thương hiệu cá nhân', description: 'Video giới thiệu doanh nghiệp, đội ngũ hoặc sản phẩm' },
		{ name: 'Tổng hợp sự kiện', description: 'Cắt ghép khoảnh khắc, thêm nhạc và hiệu ứng nhẹ' },
		{ name: 'Phê duyệt video', description: 'Kiểm tra – duyệt – export bản hoàn chỉnh' },
	],
	},
	{
	id: 3,
	taskname: 'Thiết kế & Ảo hóa kiến trúc',
	taskcompound: [
		{ name: 'Dàn dựng ảo', description: 'Thiết kế nội thất trên mô hình 3D từ phòng trống' },
		{ name: 'Cải tạo ảo', description: 'Dựng mô phỏng cải tạo – nâng cấp không gian hiện trạng' },
		{ name: 'Thiết kế mặt bằng', description: 'Cung cấp sơ đồ bố trí 2D/3D chi tiết, đẹp mắt' },
		{ name: 'Dựng hình 3D ý tưởng', description: 'Dựng ảnh/phim 3D minh họa không gian chưa thi công từ ý tưởng' },
		{ name: 'Giao nộp mô hình', description: 'Xuất bản thiết kế / render / bản trình chiếu và gửi khách hàng' },
	],
	},
];

export default function CSPage() {
	const [jobs, setJobs] = useState<any[]>([]);
	const [selectedCompounds, setSelectedCompounds] = useState<string[]>([]);
	const [selectedTask, setSelectedTask] = useState<number | null>(null);
	const [csCode, setCsCode] = useState<string | null>(null);
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage(); // popup

	// Lấy csCode từ localStorage
	useEffect(() => {
		const cscode = localStorage.getItem('cscode');
		setCsCode(cscode);
	}, []);

	// Gọi API lấy danh sách jobs theo csCode
	useEffect(() => {
		const fetchJobs = async () => {
			if (!csCode) return;
			try {
				const data = await getJobByCSCode();
				setJobs(data);
			} catch (err) {
				console.error(err);
				messageApi.error('Không thể tải danh sách công việc');
			}
		};
		fetchJobs();
	}, [csCode]);

	const calculateSubType = (taskId: number, selected: string[]) => {
	const task = tasktype_info.find(t => t.id === taskId);
	if (!task) return 0;
	return task.taskcompound.reduce((acc, c, index) => {
		return selected.includes(c.name) ? acc + Math.pow(2, index + 1) : acc;
	}, 0);
	};

	const onFinish = async (values: any) => {
	if (!selectedTask) return;

	const sub_type_value = calculateSubType(selectedTask, selectedCompounds);

	const generateJobCode = async (): Promise<string> => {
		if (!csCode) return ``;
		const now = new Date();
		const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // FEB
		const day = String(now.getDate()).padStart(2, '0');
		const dayCode = `${month}${day}`;
		const todayJobsCount = await countTodayJob();
		const stt = String(todayJobsCount + 1).padStart(3, '0');
		return `${csCode}${dayCode}${stt}`;
	};

	const newJob: IJob = {
		job_code: await generateJobCode(),
		customer_name: values.customer_name || '',
		create_date: new Date().toISOString().split('T')[0],
		job_type: selectedTask,
		volume: values.volume || 0,
		sub_type: sub_type_value,
		input: values.input_file || '',
		output: '',
		instruction: values.instruction || '',
		deadline: values.deadline?.format('YYYY-MM-DD') || null,
		user_id: [],
		cs_code: csCode || '',
		new_job_check: true,
	};

	try {
		await createJob(newJob);
		setJobs([...jobs, newJob]);

		messageApi.success('Tạo công việc thành công!'); // popup
		form.resetFields(); // reset form
		setSelectedTask(null); // reset state
		setSelectedCompounds([]);
	} catch (err) {
		console.error(err);
		messageApi.error('Tạo công việc thất bại!');
	}
	};

	const columns = [
	{ title: 'Tên khách hàng', dataIndex: 'customer_name', key: 'customer_name' },
	{ 
		title: 'Thời hạn', 
		dataIndex: 'deadline', 
		key: 'deadline',
		render: (date: string) => date ? new Date(date).toISOString().split('T')[0] : '',
	},
	{ 
		title: 'Loại công việc', 
		dataIndex: 'job_type', 
		key: 'job_type',
		render: (id: number) => tasktype_info.find(t => t.id === id)?.taskname || '',
	},
	{ 
		title: 'Yêu cầu công việc', 
		dataIndex: 'sub_type', 
		key: 'sub_type',
		render: (subTypeValue: number, record: IJob) => {
		const task = tasktype_info.find(t => t.id === record.job_type);
		if (!task) return '';
		return task.taskcompound
			.filter((c, index) => (subTypeValue & Math.pow(2, index + 1)) !== 0)
			.map(c => c.name)
			.join(', ');
		},
	},
	{ title: 'Đường dẫn file gốc', dataIndex: 'input', key: 'input' },
	{ title: 'Khối lượng (số file)', dataIndex: 'volume', key: 'volume' },
	{ title: 'Chi tiết', dataIndex: 'instruction', key: 'instruction' },
	];

	return (
	<>
		{contextHolder} {/* popup phải render ở đây */}
		<Layout style={{ minHeight: '100vh', background: '#f5faff' }}>
		<Content style={{ margin: '16px' }}>
			<div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
			<Tabs defaultActiveKey="1">
				<TabPane tab="Tạo công việc" key="1">
				<Form layout="vertical" form={form} onFinish={onFinish} style={{ maxWidth: 600 }}>
					<Form.Item
					label="Tên khách hàng"
					name="customer_name"
					rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
					>
					<Input />
					</Form.Item>

					<Form.Item
					label="Thời hạn"
					name="deadline"
					rules={[{ required: true, message: 'Vui lòng chọn thời hạn' }]}
					>
					<DatePicker style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
					label="Loại công việc"
					name="job_type"
					rules={[{ required: true, message: 'Vui lòng chọn loại công việc' }]}
					>
					<Select
						placeholder="Chọn loại công việc"
						onChange={(value) => {
						setSelectedTask(value);
						setSelectedCompounds([]);
						}}
					>
						{tasktype_info.map(task => (
						<Select.Option key={task.id} value={task.id}>
							{task.taskname}
						</Select.Option>
						))}
					</Select>
					</Form.Item>

					{selectedTask && (
					<Form.Item
						label="Yêu cầu công việc"
						name="sub_type"
						rules={[
						{
							validator: () =>
							selectedCompounds.length > 0
								? Promise.resolve()
								: Promise.reject(new Error('Vui lòng chọn ít nhất 1 yêu cầu công việc')),
						},
						]}
					>
						<Checkbox.Group
						options={
							tasktype_info.find(t => t.id === selectedTask)?.taskcompound.map(c => ({
							label: `${c.name} (${c.description})`,
							value: c.name,
							})) || []
						}
						value={selectedCompounds}
						onChange={(checkedValues) => setSelectedCompounds(checkedValues as string[])}
						/>
					</Form.Item>
					)}

					<Form.Item
					label="Đường dẫn file gốc"
					name="input_file"
					rules={[{ required: true, message: 'Vui lòng nhập đường dẫn file gốc' }]}
					>
					<Input placeholder="Nhập file đầu vào" />
					</Form.Item>

					<Form.Item
					label="Khối lượng công việc (số file)"
					name="volume"
					rules={[{ required: true, message: 'Vui lòng nhập số file' }]}
					>
					<InputNumber min={1} style={{ width: '100%' }} placeholder="Nhập số file cần chỉnh sửa" />
					</Form.Item>

					<Form.Item label="Chi tiết" name="instruction">
					<TextArea rows={4} />
					</Form.Item>

					<Form.Item>
					<Button type="primary" htmlType="submit">
						Tạo công việc
					</Button>
					</Form.Item>
				</Form>
				</TabPane>
                    <TabPane tab="Danh sách công việc đã tạo" key="2">
                    <Table columns={columns} dataSource={jobs} rowKey="id" />
                </TabPane>
			</Tabs>
			</div>
		</Content>
		</Layout>
	</>
	);
}
