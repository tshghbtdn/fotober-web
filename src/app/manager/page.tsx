// app/manager/page.tsx
'use client';

import { useState } from 'react';
import { Layout, Button, Drawer, Tabs } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DrawerSidebar from '@/components/DrawerSidebar';
import Overview from '@/components/manager/OverView';
import Employees from '@/components/manager/Employees';
import Jobs from '@/components/manager/Jobs';

const { Header, Content } = Layout;

export default function ManagerPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout className="!min-h-screen bg-[#f5faff]">
            {/* Header */}
            <Header className="flex justify-between items-center bg-[#0D3B66] px-4 shadow">
                <Button
                    type="text"
                    onClick={() => setDrawerOpen(true)}
                    className="text-white hover:text-gray-200"
                >
                    <MenuOutlined style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <h1 className="text-white text-lg font-semibold tracking-wide">
                    Manager Dashboard
                </h1>
                <div className="w-8" />
            </Header>

            {/* Nội dung chính */}
            <Content className="p-4">
                <Tabs
                    defaultActiveKey="overview"
                    className="bg-white !rounded-2xl !shadow !p-4"
                    items={[
                        {
                            key: 'overview',
                            label: 'Tổng quan',
                            children: <Overview />,
                        },
                        {
                            key: 'employees',
                            label: 'Nhân viên',
                            children: <Employees />,
                        },
                        {
                            key: 'jobs',
                            label: 'Công việc',
                            children: <Jobs />,
                        },
                    ]}
                />
            </Content>

            {/* Sidebar Drawer */}
            <Drawer
                placement="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                closable={false}
                width={280}
                styles={{ body: { padding: 0 } }}
            >
                <DrawerSidebar onClose={() => setDrawerOpen(false)} />
            </Drawer>
        </Layout>
    );
}
