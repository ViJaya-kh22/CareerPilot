import api, { setAccessToken } from  "../../services/apiClient"

/**
 * Registers a new user account with the provided credentials.
 */
export async function register({ username, email, password }) {
    const response = await api.post("/api/auth/register", { username, email, password });
    setAccessToken(response.data.accessToken);
    return response.data;
}

/**
 * Authenticates a user and creates a new login session.
 */
export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", { email, password });
    setAccessToken(response.data.accessToken);
    return response.data;
}

/**
 * Logs out the currently authenticated user and terminates their session.
 */
export async function logout() {
    const response = await api.post("/api/auth/logout");
    setAccessToken(null);
    return response.data;
}

export async function logoutAll() {
    const response = await api.post("/api/auth/logout-all");
    setAccessToken(null);
    return response.data;
}

export async function refreshToken() {
    const response = await api.post("/api/auth/refresh-token");
    setAccessToken(response.data.accessToken);
    return response.data;
}

/**
 * Retrieves the profile information of the currently authenticated user.
 */
export async function getMe() {
    const response = await api.get("/api/auth/get-me");
    return response.data;
}