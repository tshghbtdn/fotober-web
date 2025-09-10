// file: src/services/authFunctions/logout.ts
export const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("cscode");
}