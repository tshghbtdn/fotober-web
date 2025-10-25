export const register = async (username: string, email: string, password: string, name: string, role: string): Promise<void> => {
	try {
		if (!process.env.SERVER_URL) {
			throw new Error("SERVER_URL is not defined in the environment variables.");
		}

		const SERVER_URL = process.env.SERVER_URL;
    	const res = await fetch(SERVER_URL+"/auth/register", {
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
  
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message || "Registration fa1iled");
		}
    } catch (error) {
		console.error("Error registering:", error);
		throw error;
    }
};