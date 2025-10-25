import { IUser } from '@/models/interfaces/IUser';

export async function getEmployees(): Promise<IUser[]> {
    try {
		const response = await fetch("api/manager/employees", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

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

		return data.employees;
	}
	catch (error) {
		console.error('Error counting today jobs:', error);
		throw error;
	}
}