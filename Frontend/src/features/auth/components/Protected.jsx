import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({children}) =>{

    const {loading, user} = useAuth();

    if(loading){
       return (
        <div>
            <span>Loading...</span>
           <span className="spinner"></span> 
        </div>
       )
    }
   

    if(!user){
        return <Navigate to={'/login'}/>
    }

    return children
}

export default Protected;