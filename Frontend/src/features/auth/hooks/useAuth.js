import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register,login, refreshToken,logout , logoutAll} from "../services/auth.api";
import toast from "react-hot-toast";

export const useAuth = () =>{

     const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider.");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({username,email,password}) => {
        setLoading(true)
        try {
            const data = await register({username,email,password})
            setUser(data.user)
            toast.success("Registered successfully.",  { id: "report-success" })
        } catch (error) {
              const message = error.response?.data?.message || "Failed to register user. Please try again.";
            toast.error(message ,  { id: "report-error" })
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogin = async ({email,password}) => {
        setLoading(true)
        try {
            const data = await login({email,password})
            setUser(data.user)
            toast.success("Logged in successfully." , { id: "report-success" })
        } catch (error) {
            const message = error.response?.data?.message || "Failed to login user. Please try again.";
            toast.error(message ,  { id: "report-error" })
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            toast.success("Logged out successfully.",  { id: "report-success" })
        } catch (error) {
            const message = error.response?.data?.message || "Failed to logged out. Please try again.";
            toast.error(message ,  { id: "report-error" })
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogoutAll = async () =>{
        setLoading(true)
        try {
            await logoutAll()
            setUser(null)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }


    useEffect(() => {

        const restoreSession = async () =>{
            setLoading(true)
            try {
             const data = await refreshToken();
             setUser(data.user)
            } catch (error) {
             console.log(error)
             setUser(null)
            }finally{
            setLoading(false)
            }
        }

        restoreSession()

    }, [])
    

    return {user, loading, handleRegister, handleLogin, handleLogout, handleLogoutAll}
}