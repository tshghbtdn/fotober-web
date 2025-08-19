// File: src/components/auth/AuthForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

export const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const pathname = usePathname(); // Sử dụng usePathname để lấy đường dẫn hiện tại


    const registerSuccessful = () => {
        messageApi.open({
            type: 'success',
            content: 'Registration successful!',
        });
    };

    const registerError = (error: any) => {
        messageApi.open({
            type: 'error',
            duration: 3,
            content: `Registration failed: ${error.message}`,
        });
    };

    const loginSuccessful = () => {
        messageApi.open({
            type: 'success',
            content: 'Login successful!',
        });
    };

    const loginError = (error: any) => {
        messageApi.open({
            type: 'error',
            duration: 3,
            content: `Login failed: ${error.message}`,
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-lg">
            {contextHolder}
            {isRegistering ? (
                <RegisterForm
                    onSwitch={() => setIsRegistering(false)}
                    registerSuccessful={registerSuccessful}
                    registerError={registerError}
                />
            ) : (
                <LoginForm
                    onSwitch={() => setIsRegistering(true)}
                    loginSuccessful={loginSuccessful}
                    loginError={loginError}
                />
            )}
        </div>
    );
};
