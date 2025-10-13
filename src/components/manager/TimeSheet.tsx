import { IUser } from '@/models/interfaces/IUser';
import { getEmployees } from '@/services/managerFunctions/getEmployees';
import { useState, useEffect } from 'react';

export default function TimeSheet() {
    const [displayMode, setDisplayMode] = useState<'all' | 'personal'>('all');
    const [employees, setEmployees] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }

        fetchEmployees();
    }, []);

    return (
        <div>
            {employees.map(emp =>
                <div key={emp.id}>{emp.name}</div>
            )}
        </div>
    );
}