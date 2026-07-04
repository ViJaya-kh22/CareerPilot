import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import * as z from "zod";
import {
  jobDescription,
  selfDescription,
  resume,
} from "../mock/mockUserData.js";
import  mockReport  from "../mock/mockReport.js";

const ai = new GoogleGenAI({
  apiKey: config.GOOGLE_GEMINI_API_KEY,
});

const interviewReportJsonSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      description:
        "A percentage score from 0 to 100 indicating how well the candidate's resume and self-description match the provided job description.",
    },

    technicalQuestions: {
      type: "array",
      description:
        "A list of technical interview questions tailored to the job description and the candidate's profile.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "A realistic technical interview question the interviewer is likely to ask for this specific role.",
          },
          intention: {
            type: "string",
            description:
              "Explain what the interviewer is trying to evaluate by asking this question, such as problem-solving, framework knowledge, coding ability, or system design.",
          },
          answer: {
            type: "string",
            description:
              "Provide only a concise answering approach, not a full answer. Mention the important topics, concepts, experiences, or structure the candidate should cover while answering. Keep it brief and avoid writing a complete interview response.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: "array",
      description:
        "A list of behavioral interview questions based on the candidate's experience and the company's expectations.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description:
              "A realistic behavioral interview question that may be asked during the interview.",
          },
          intention: {
            type: "string",
            description:
              "Explain what personality trait, communication skill, teamwork ability, leadership quality, or work ethic the interviewer wants to assess.",
          },
          answer: {
            type: "string",
            description:
              "Provide only a concise answering approach, not a full answer. Mention the important topics, concepts, experiences, or structure the candidate should cover while answering. Keep it brief and avoid writing a complete interview response.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    skillGaps: {
      type: "array",
      description:
        "A list of important skills that are missing or weak compared to the job description.",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description:
              "The missing or weak technical or soft skill identified from comparing the candidate profile with the job description.",
          },
          severity: {
            type: "string",
            enum: ["Low", "Medium", "High"],
            description:
              "Indicates how critical this missing skill is for successfully performing the job. High means essential, Medium means important, and Low means optional or nice to have.",
          },
        },
        required: ["skill", "severity"],
      },
    },

    preprationPlan: {
      type: "array",
      description:
        "A personalized multi-day interview preparation plan designed to improve the candidate's readiness for this specific job.",
      items: {
        type: "object",
        properties: {
          day: {
            type: "number",
            description:
              "The day number in the preparation schedule, starting from 1.",
          },
          focus: {
            type: "string",
            description:
              "The primary learning objective or topic to focus on during this day.",
          },
          tasks: {
            type: "array",
            description:
              "A list of actionable tasks the candidate should complete during the day.",
            items: {
              type: "string",
              description:
                "A specific preparation task such as studying a concept, solving coding problems, building a mini project, or practicing interview questions.",
            },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preprationPlan",
  ],
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
}) {

  const prompt = `
    You are an expert interviewer, hiring manager, and career coach.

Your task is to analyze the candidate's profile and generate a structured interview preparation report.

You will receive:
1. A Job Description : 
${jobDescription || "Not provided it is required"},
2. A Resume (optional) : 
${resume || "Not provided"}, 
3. A Self Description (optional) :  
${selfDescription || "Not provided"}

Analyze all the provided information carefully.

Generate a report that includes:

- matchScore
  - A score between 0 and 100 representing how well the candidate matches the job description.

- technicalQuestions
  - Generate realistic technical interview questions based on the job description and the candidate's experience.
  - Questions should be appropriate for the required experience level.
  - For each question provide:
    - question
    - intention (what the interviewer wants to evaluate)
    - answer (ONLY provide the answering approach, not the complete answer. Mention the important concepts, technologies, or points the candidate should cover. Keep it concise.)

- behavioralQuestions
  - Generate realistic behavioral interview questions.
  - For each question provide:
    - question
    - intention
    - answer (ONLY provide the answering approach. Recommend a structure such as STAR when appropriate. Do not generate a complete response.)

- skillGaps
  - Compare the candidate's profile with the job description.
  - Identify missing or weak skills.
  - For each skill provide:
    - skill
    - severity
      - Low
      - Medium
      - High

- preparationPlan
  - Create a personalized 7-day interview preparation plan.
  - Each day must contain:
    - day
    - focus
    - tasks
  - Tasks should be actionable, realistic, and directly address the identified skill gaps and interview topics.

Important Rules:
- Do NOT invent experience that isn't provided.
- Base your analysis only on the supplied information.
- If resume or self description is missing, rely on the available inputs.
- Keep all answering approaches concise (2–4 sentences maximum).
- Do NOT generate complete interview answers.
- Do NOT include markdown.
- Do NOT include explanations outside the JSON.
- Return only valid JSON that exactly matches the provided schema.   
`;

  const response = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportJsonSchema,
    },
  });
}

async function generateInterviewReportMock({resume , jobDescription, selfDescription}) {
  if (config.DEV_MODE) {
    console.log("Using Mock Data");
    return(mockReport) ;
  }

  console.log("Calling gemini");

  return generateInterviewReport({ resume, jobDescription, selfDescription });
}

export default generateInterviewReportMock;
