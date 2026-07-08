import pdfParse from "pdf-parse-fork";
import interviewReportModel from "../models/interviewReport.model.js";
import {generateInterviewReportMock , generateReusmePdf} from "../services/ai.services.js";

/**
 * @name generateInterviewReportController
 * @description Generates a personalized AI interview report by analyzing the uploaded resume, job description, and optional self-description, then stores the generated report.
 * @access Private
 */
export async function generateInterviewReportController(req, res) {
  try {
    
    const pdfFile = req.file?.buffer ?? null;

    const parsedResumePdf = await pdfParse(pdfFile);
    const fileContent = parsedResumePdf.text;

    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required." });
    }

    const interviewReportAI = await generateInterviewReportMock({
      resume: fileContent,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: fileContent,
      selfDescription,
      jobDescription,
      ...interviewReportAI,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });

  } catch (error) {
    console.log("Error in generating interview ", error);
    res.status(500).json({
      message: "Error in generating report.",
    });
  }
};


/**
 * @name getInterviewReportByIdController
 * @description Retrieves a specific AI-generated interview report belonging to the authenticated user using the provided interview report ID.
 * @access Private
 */
export async function getInterviewReportByIdController(req,res) {
  
  try {
    const {interviewId} = req.params;
  
    const interviewReport = await interviewReportModel.findOne({
      _id : interviewId,
      user : req.user.id
    });
  
    if(!interviewReport){
      return res.status(404).json({
        message : "Interview report not found."
      })
    };
  
    return res.status(200).json({
      message : "Interview report fetched successfully.",
      interviewReport
    });
    
  } catch (error) {
    console.log("Error in fetching interview report by id" + error)
    return res.status(500).json({
      message : "Error in fetching interview report by id "
    })
  };

};

/**
 * @name getAllInterviewReportsController
 * @description Retrieves all AI-generated interview reports created by the authenticated user, sorted by the most recent reports first.
 * @access Private
 */
export async function getAllInterviewReportsController(req,res) {
  try {

    const interviewReports = await interviewReportModel.find({
      user : req.user.id
    }).sort({createdAt : -1}).select(" -resume  -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps  -preparationPlan");

    if(!interviewReports.length === 0){
      return res.status(404).json({
        message : "Interview reports not found."
      })
    };

    return res.status(200).json({
      message : "All interview reports fetched successfully.",
      interviewReports
    });

  } catch (error) {
     console.log("Error in fetching all interview reports." + error)
    return res.status(500).json({
      message : "Error in fetching all interview reports. "
    })
  }
};

export async function generateResumePdfController(req,res) {

  try {
     const {interviewId} = req.params

  const interviewReport = await interviewReportModel.findById(interviewId);

  if(!interviewReport){
    return res.status(404).json({
      message : "Interview report not found."
    })
  };

  const {resume, selfDescription, jobDescription} = interviewReport;

  const pdfBuffer = await generateReusmePdf({resume, selfDescription, jobDescription});

  res.set({
    "Content-Type" : "application/pdf",
    "Content-Disposition" : `attachment ; filename = resume_${interviewId}.pdf`
  })
  
  res.send(pdfBuffer)
  } catch (error) {
     console.log("Error in generate interview report pdf :" ,error)
     res.status(500).json({
      message : "Conflit in generating interview pdf"
     })
  }
  
}

