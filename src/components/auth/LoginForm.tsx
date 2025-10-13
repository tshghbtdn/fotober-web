// file:src/components/auth/LoginForm.tsx
'use client';

import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';

type Props = {
    onSwitch: () => void;
    loginSuccessful: () => void;
    loginError: (error: any) => void;
};

export const LoginForm = ({ onSwitch, loginSuccessful, loginError }: Props) => {
    const [form] = Form.useForm();
    const router = useRouter();

  const onFinish = async (values: any) => {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        const result = await res.json();
        if (!result.success) throw new Error(result.message);

        const data = result.data;

        loginSuccessful();

        const role = data.role;
        if (role === 'editor') router.replace('/editor');
        else if (role === 'saler') router.replace('/cs');
        else if (role === 'manager') router.replace('/manager');
        else router.replace('/');
    } catch (error) {
      console.error('Login failed:', error);
      loginError('Wrong username or password');
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
