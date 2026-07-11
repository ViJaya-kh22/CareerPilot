import api from '../../services/apiClient';

/**
 * Sends the user's job details and resume to generate an AI-powered interview report.
 */
export const getInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);

    if (resumeFile) {
        formData.append("resume", resumeFile);
    }

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

/**
 * Retrieves a specific interview report using its unique interview ID.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
};

/**
 * Fetches all interview reports associated with the authenticated user.
 */
export const getAllInterviewReport = async () => {
    const response = await api.get("/api/interview/all-reports");
    return response.data;
};

export const generateResumePdf = async ({ interviewId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`, null, {
        responseType: "blob"
    });
    return response.data;
};