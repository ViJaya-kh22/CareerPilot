import { useState } from "react";
import { Children, createContext } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({children}) =>{

    const [loading,setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [allreports, setAllReports] = useState(null);

    return (
        <InterviewContext.Provider value = {{loading, setLoading, report , setReport}}>
            {children}
        </InterviewContext.Provider>
    )

}