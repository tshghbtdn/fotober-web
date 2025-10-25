// file: src/services/authFunctions/logout.ts

export const logout = async () => {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
    }
    catch (error) {
        console.error("Logout failed:", error);
    }
}