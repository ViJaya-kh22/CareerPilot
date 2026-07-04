import express from 'express';
import authUser from '../middlewares/auth.middleware.js'
import * as interviewaiController from '../controllers/interview.ai.controller.js'
import upload from '../middlewares/pdf.file.middleware.js';

const interviewRouter = express.Router();

interviewRouter.post('/', authUser, upload.single("resume") ,interviewaiController.generateInterviewReportController)

export default interviewRouter