// app/cs/page.tsx
'use client';

import { useState } from 'react';
import CSPage from '@/components/cs/createjob';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DrawerSidebar from '@/components/DrawerSidebar';

const { Header, Content } = Layout;

export default function CustomerSupportPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout className="min-h-screen bg-[#f5faff]">
      {/* Header */}
      <Header className="flex justify-between items-center bg-[#006D77] px-6 shadow-md">
        <Button
          type="text"
          onClick={() => setDrawerOpen(true)}
          className="text-white hover:text-gray-200"
        >
          <MenuOutlined style={{ fontSize: 22, color: '#fff' }} />
        </Button>
        <h1 className="text-white text-xl font-semibold tracking-wide">
          CS Dashboard
        </h1>
        <div className="w-8" />
      </Header>

      {/* Main content */}
      <Content className="p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <CSPage />
        </div>
      </Content>

      {/* Drawer sidebar */}
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
