// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra token và role trong localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 p-8">Welcome to Fotober</h1>
      <AuthForm />
    </div>
  );
}
