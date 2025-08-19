// components/manager/Jobs.tsx
'use client';

import { List, Card } from 'antd';

const data = [
  { title: 'Job #1', description: 'Xử lý sản phẩm lô 01' },
  { title: 'Job #2', description: 'Đánh giá chất lượng lô 02' },
];

export default function Jobs() {
    return (
        <Card className="rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Danh sách công việc</h2>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}
