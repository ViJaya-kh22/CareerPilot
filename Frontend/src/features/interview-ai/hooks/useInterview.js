import {getInterviewReport ,getInterviewReportById , getAllInterviewReport , generateResumePdf} from "../services/interview.ai.api";
import { InterviewContext } from "../Interview.context";
import { useContext } from "react";


export const useInterview =  () =>{

    const context = useContext(InterviewContext);
    

    if(!context){
        throw new Error("useInterview must be use within InterviewProvider.")
    };

    const {loading, setLoading, report , setReport, allreports, setAllReports} = context;

    const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) =>{
        setLoading(true)
        let response = null
        try {
        response = await getInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
             response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getAllReports = async () => {
        setLoading(true)
        let response = null
        try {
        response = await getAllInterviewReport()
        setReport(response.interviewReports)
        console.log("From hook :",response.interviewReports)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReports
    }
 
    const getResumePdf = async (interviewId) =>{
        setLoading(true);
        let resposne = null
        try {
         resposne = await generateResumePdf({interviewId});
         const url = window.URL.createObjectURL(new Blob([resposne], {type : "application/pdf"}));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute("download" , `resume_${interviewId}.pdf`);
         document.body.appendChild(link);
         link.click();
         link.remove();
         window.URL.revokeObjectURL(url)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return {loading, report , allreports, generateInterviewReport, getReportById, getAllReports, getResumePdf}

}