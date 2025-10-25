'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserInforContext = createContext<{
	loading: boolean;
	user: {
		id?: string;
		name?: string;
		role?: string;
	}
}>({
	loading: false,
	user: {}
});

export function UserInforProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<{
		id?: string;
		name?: string;
		role?: string;
}>({});
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// setLoading(false);
	}, []);

	return (
		<UserInforContext.Provider value={{ user, loading }}>
			{children}
		</UserInforContext.Provider>
	);
}

export function useUserInfor() {
	const context = useContext(UserInforContext);
	if (!context) {
		throw new Error("use must be used within AuthProvider");
	}
	return context;
}