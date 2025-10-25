// file: src/app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { IUser } from '@/models/interfaces/IUser';

export async function POST(req: NextRequest) {
    try {
        if (!process.env.SERVER_URL) {
            throw new Error("SERVER_URL is not defined in the environment variables.");
        }
        const SERVER_URL = process.env.SERVER_URL;
        const token = req.cookies.get('token')?.value;
        const role = req.cookies.get('role')?.value;

        if (!token || !role) {
            throw new Error('Authentication token or role is missing');
        }
        
        const response = await fetch(`${SERVER_URL}/manager/employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-client-role': role,
            },
        });

        if (response.status === 401) {
            const res = NextResponse.json(
                { success: false, message: 'Unauthorized access. Please log in again.' },
                { status: 401 }
            );
            res.cookies.delete('token');
            res.cookies.delete('role');
            return res;
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to count today jobs (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        if (!data.employees || !Array.isArray(data.employees)) {
            throw new Error('Invalid response format: employees array is missing');
        }

        data.employees.forEach((employee: IUser) => {
            if (typeof employee.id !== 'string')
                throw new Error('Invalid employee data: id is not a string')
            if (typeof employee.name !== 'string')
                throw new Error('Invalid employee data: name is not a string');
            if (employee.role !== 'editor' && employee.role !== 'manager')
                throw new Error('Invalid employee data: role is not valid');
        });

        // console.log('Fetched employees:', data.employees);

        return NextResponse.json({ success: true, employees: data.employees });
    }
    catch (error) {
        console.error('Error counting today jobs:', error);
        return NextResponse.json(
            { success: false, message: (error as Error).message || "Failed to fetch employees" },
            { status: 500 }
        );
    }
}