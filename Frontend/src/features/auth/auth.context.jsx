import { createContext ,useState , useEffect} from "react";
import { refreshToken } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);


    
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

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
};