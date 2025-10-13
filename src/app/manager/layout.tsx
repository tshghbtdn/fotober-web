// app/manager/page.tsx
'use client';

import { useState } from 'react';
import { Layout, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DrawerSidebar from '@/components/DrawerSidebar';
import { MenuItemType } from 'antd/es/menu/interface';
import Link from 'next/link';

import { DashboardOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const MenuItems: MenuItemType[] = [{
        key: 0,
        icon: <DashboardOutlined />,
        label: <Link href="/manager">
            Tổng quan
        </Link>,
    }, {
        key: 1,
        icon: <TeamOutlined />,
        label: <Link href="/manager/employees">
            Nhân viên
        </Link>,
    }, {
        key: 2,
        icon: <FileTextOutlined />,
        label: <Link href="/manager/jobs">
            Công việc
        </Link>,
    }
]

export default function ManagerLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

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

            <Layout>
                <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={setCollapsed}
                        className="bg-white border-r border-gray-200"
                        width={220}
                        >
                        <Menu
                            mode="inline"
                            items={MenuItems}
                            className="h-full border-none"
                        />
                    </Sider>

                {/* Nội dung chính */}
                <Content className="p-4 flex-col gap-4 w-full">
                    {children}
                </Content>

                <DrawerSidebar onClose={() => setDrawerOpen(false)} isOpen={drawerOpen} />
            </Layout>
        </Layout>
    );
}
