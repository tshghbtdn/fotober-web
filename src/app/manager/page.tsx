// components/manager/Overview.tsx
'use client';

import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Tháng 1', chất_lượng: 90 },
  { name: 'Tháng 2', chất_lượng: 85 },
  { name: 'Tháng 3', chất_lượng: 95 },
];

export default function ManagerPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {/* Thông số công ty */}
            <Card className="rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">Tổng quan công ty</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#e6f0ff] rounded-xl p-4 text-center">
                        <p className="text-gray-500">Doanh thu</p>
                        <p className="text-xl font-bold">₫120M</p>
                    </div>
                    <div className="bg-[#e6f0ff] rounded-xl p-4 text-center">
                        <p className="text-gray-500">Sản phẩm nhận</p>
                        <p className="text-xl font-bold">450</p>
                    </div>
                    <div className="bg-[#e6f0ff] rounded-xl p-4 text-center">
                        <p className="text-gray-500">Hoàn thành</p>
                        <p className="text-xl font-bold">420</p>
                    </div>
                    <div className="bg-[#e6f0ff] rounded-xl p-4 text-center">
                        <p className="text-gray-500">Đang xử lý</p>
                        <p className="text-xl font-bold">30</p>
                    </div>
                </div>
            </Card>

            {/* Biểu đồ */}
            <Card className="rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">Đánh giá chất lượng</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="chất_lượng" fill="#0D3B66" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
