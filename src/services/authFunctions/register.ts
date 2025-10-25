export const register = async (username: string, email: string, password: string, name: string, role: string): Promise<void> => {
	try {
    	await fetch("api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				name,
				role,
			}),
      	});
  
    } catch (error) {
		console.error("Error registering:", error);
		throw error;
    }
};