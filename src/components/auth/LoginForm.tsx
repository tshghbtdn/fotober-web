// file:src/components/auth/LoginForm.tsx
'use client';

import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authFunctions';
import { IUser } from '@/models/interfaces';
import { useUserInfor } from '@/contexts/UserInforContext';
import { use } from 'react';

type Props = {
    onSwitch: () => void;
    loginSuccessful: () => void;
    loginError: (error: any) => void;
};

export const LoginForm = ({ onSwitch, loginSuccessful, loginError }: Props) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { user } = useUserInfor();

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const res: IUser = await login({
                username: values.username,
                password: values.password,
            });

            loginSuccessful();


            user.id = res.id;
            user.name = res.name;
            user.role = res.role;
            
            router.replace('/');
        } catch (error) {
            console.error('Login failed:', error);
            loginError(error);
        }
    };

    return (
        <div className="space-y-6">
            <Typography.Title level={3} className="!mb-4 text-center">
                Login
            </Typography.Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password className="py-2" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="mt-2">
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <Button
                type="link"
                block
                className="text-center text-blue-600 hover:underline"
                onClick={onSwitch}
            >
                Create a new account
            </Button>
        </div>
    );
};
