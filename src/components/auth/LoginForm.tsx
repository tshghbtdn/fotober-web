'use client';

import { Form, Input, Button, Typography } from 'antd';
import { login } from '../../services/authFunctions/login';
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
            const result = await login(values.username, values.password);
            loginSuccessful();

            if (result.role === 'editor') {
                router.replace('/editor');
            } 
            else 
            if (result.role==='saler'){
                router.replace('/cs');
            }
            else if (result.role === 'manager'){
                router.replace('/manager');
            }
            else{
                router.replace('/');32
            }
        } catch (error) {
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
