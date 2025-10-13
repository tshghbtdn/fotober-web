// app/editor/page.tsx
'use client';

import { useState } from 'react';
import ListJob from '@/components/editor/listjob';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DrawerSidebar from '@/components/DrawerSidebar';

const { Header, Content } = Layout;

export default function EditorPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Layout className="min-h-screen bg-[#f5faff]">
            <Header className="flex justify-between items-center bg-[#0D3B66] px-4 shadow">
                <Button
                    type="text"
                    onClick={() => setDrawerOpen(true)}
                    className="text-white hover:text-gray-200"
                >
                    <MenuOutlined style={{ fontSize: 20, color: '#fff' }} />
                </Button>
                <h1 className="text-white text-lg font-semibold tracking-wide">
                    Editor Dashboard
                </h1>
                <div className="w-8" />
            </Header>
            <Content className="p-0">
                <ListJob />
            </Content>

            <DrawerSidebar onClose={() => setDrawerOpen(false)} isOpen={drawerOpen} />
        </Layout>
    );
}
