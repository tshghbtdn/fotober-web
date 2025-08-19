// components/DrawerSidebar.tsx
'use client';

import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function DrawerSidebar({ onClose }: { onClose: () => void }) {
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("cscode");
        router.replace("/");
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex justify-between items-center px-4 pt-4">
                <h2 className="text-lg font-bold">Account Info</h2>
                <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
                    <CloseOutlined size={20} className='hover:cursor-pointer' />
                </button>
            </div>

            <div className="px-4 py-3 text-sm">
                <p className="mb-1">Name: <span className="font-medium">{localStorage.getItem("name") || "Unknown"}</span></p>
                <p>Role: <span className="text-blue-600 font-semibold">{localStorage.getItem("role") || "N/A"}</span></p>
            </div>

            <div className="mt-auto p-4">
                <Button danger block onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}