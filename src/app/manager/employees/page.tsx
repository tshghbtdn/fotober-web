// components/manager/Employees.tsx
'use client';

import TimeSheet from '@/components/manager/TimeSheet';
import { Table, Segmented, Space } from 'antd';
import { useState } from 'react';

const columns = [
	{ title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
	{ title: 'Ngày vắng', dataIndex: 'absent', key: 'absent' },
	{ title: 'SP nhận', dataIndex: 'received', key: 'received' },
	{ title: 'SP hoàn thành', dataIndex: 'completed', key: 'completed' },
	{ title: 'Chất lượng TB', dataIndex: 'quality', key: 'quality' },
];

const data = [
	{ key: '1', name: 'Nguyễn Văn A', absent: 2, received: 120, completed: 115, quality: '92%' },
	{ key: '2', name: 'Trần Thị B', absent: 1, received: 90, completed: 88, quality: '95%' },
];

export default function Employees() {
	const [currentPage, setCurrentPage] = useState<"TimeSheet" | "Statistic">("Statistic");

	return (
		<>
			<Space direction="horizontal" size={16} className="mb-4">
				<Segmented<string>
					options={[
						{value: 'Statistic', label: 'Thống kê'},
						{value: 'TimeSheet', label: 'Chấm công'}
					]}
					onChange={(e) => {
						if (e === "TimeSheet" || e === "Statistic")
							setCurrentPage(e)
						else setCurrentPage("Statistic")
					}}
				/>
			</Space>

			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				bordered
				className="rounded-2xl shadow"
			/>

			<TimeSheet />
		</>
	);
}
