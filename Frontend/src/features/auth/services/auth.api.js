import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
});

/**
 * Registers a new user account with the provided credentials.
 */
export async function register({username, email, password}){
    try {
        const response = await api.post("/api/auth/register", {
            username, email, password
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
};

/**
 * Authenticates a user and creates a new login session.
 */
export async function login({email, password}){

    try {
        const response = await api.post("/api/auth/login",{
            email,password
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
    
};

/**
 * Logs out the currently authenticated user and terminates their session.
 */
export async function logout(){

    try {
        const response = await api.get("/api/auth/logout")

        return response.data
    } catch (error) {
        console.log(error)
    }
    
};

/**
 * Retrieves the profile information of the currently authenticated user.
 */
export async function getMe(){

    try {
        const response = await api.get("/api/auth/get-me")

        return response.data
    } catch (error) {
        console.log(error)
    }
    
};