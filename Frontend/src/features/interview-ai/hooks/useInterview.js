import {
  getInterviewReport,
  getInterviewReportById,
  getAllInterviewReport,
  generateResumePdf,
} from "../services/interview.ai.api";
import { InterviewContext } from "../Interview.context";
import { useContext } from "react";
import toast from "react-hot-toast";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be use within InterviewProvider.");
  }

  const { loading, setLoading, report, setReport, allreports, setAllReports } =
    context;

  const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      toast.success("Interview report generated successfully.", { id: "report-success" });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to generate report. Please try again.";
      toast.error(message ,  { id: "report-error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      toast.success("Interview report loaded successfully.", { id: "report-success" });
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to load the interview report.";
      toast.error(message , { id: "report-error" });
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  const getAllReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReport();
      setAllReports(response.interviewReports);
     
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReports;
  };

  const getResumePdf = async (interviewId) => {
    setLoading(true);
    let resposne = null;
    try {
      resposne = await generateResumePdf({ interviewId });
      const url = window.URL.createObjectURL(
        new Blob([resposne], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Your AI resume is ready." , { id: "report-success" });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to generate resume. Please try again.";
      toast.error(message ,  { id: "report-error" })
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    report,
    allreports,
    generateInterviewReport,
    getReportById,
    getAllReports,
    getResumePdf,
  };
};
