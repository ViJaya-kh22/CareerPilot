import pdfParse from 'pdf-parse-fork';
import interviewReportModel from '../models/interviewReport.model.js';
import generateInterviewReportMock from '../services/ai.services.js';


export async function generateInterviewReportController(req,res) {
    
    try {

        const pdfFile = req.file ? req.file.buffer : (req.files ? req.files.buffer : null);

        if(!pdfFile){
            res.status(400).json({
                message : "File not found"
            })
        }

        const parsedResumePdf  = await pdfParse(pdfFile);
        const fileContent = parsedResumePdf.text

    const {selfDescription , jobDescription } = req.body;

    const interviewReportAI = await generateInterviewReportMock({
        resume : fileContent,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        resume :fileContent,
        selfDescription,
        jobDescription,
        ...interviewReportAI
    });

    res.status(201).json({
        message : "Interview report generated successfully.",
        interviewReport
    });

    } catch (error) {
        console.log("Error in generating interview " , error)
        res.status(500).json({
            message : "Error in generating report."
        })
    }

};

