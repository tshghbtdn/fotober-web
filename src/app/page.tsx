// src/app/page.tsx
'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { useUserInfor } from '@/contexts/UserInforContext';
import { useRouter } from 'next/navigation';

export default function Home() {
	const { user } = useUserInfor();
	const router = useRouter();

	if (user?.role) {
		if (user.role === 'manager') {
			router.replace('/manager');
			return;
		}

		if (user.role === 'editor') {
			router.replace('/editor');
			return;
		}

		if (user.role === 'saler') {
			router.replace('/cs');
			return;
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<h1 className="text-4xl font-bold text-gray-800 p-8">Welcome to Fotober</h1>
			<AuthForm />
		</div>
	);
}
