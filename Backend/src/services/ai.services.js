import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";
import * as z from "zod";
import { jobDescription,selfDescription,resume,} from "../mock/mockUserData.js";
import  mockReport  from "../mock/mockReport.js";
import puppeteer from 'puppeteer';



const ai = new GoogleGenAI({
  apiKey: config.GOOGLE_GEMINI_API_KEY,
});



export async function generateInterviewReport({resume,jobDescription,selfDescription,}) {

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

    preparationPlan: {
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
    title : {
      type : "string",
      description : "Extract or infer the primary job title from the job description. Return only a concise role name (e.g., 'Frontend Developer', 'Backend Engineer', 'Data Analyst'). Do not include company names, locations, experience levels, or extra formatting."
    }
  },

  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportJsonSchema,
    },
  });

  const report = JSON.parse(response.text);
  return report
};

export async function generateInterviewReportMock({resume , jobDescription, selfDescription}) {
  if (config.DEV_MODE) {
    console.log("Using Mock Data");
    return(mockReport) ;
  }

  console.log("Calling gemini");

  return generateInterviewReport({ resume, jobDescription, selfDescription });
};

async function generatePdfFromHtml(htmlcontent) {

  const browser = await puppeteer.launch({
     args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();

  await page.setContent(htmlcontent, {waitUntil : 'domcontentloaded'});

  const pdfBuffer = await page.pdf({
     format : 'A4',
     margin : {
      top : '15px',
      bottom :  '15px' ,
      left :' 15px' ,
      right: '15px'
     }
  });

  await browser.close();

  return pdfBuffer

}

export async function generateReusmePdf({resume, selfDescription, jobDescription}) {

  const resumePdfSchema = {
  type : "object",
  properties : {
    pdfHtml : {
      type : "string",
      description :  "A complete, self-contained HTML document for a professional ATS-friendly resume. Include <!DOCTYPE html>, <html>, <head>, and <body> with all CSS embedded inside a <style> tag. Do not use external CSS, JavaScript, images, fonts, or CDN resources. The HTML should be clean, semantic, A4-print optimized, and ready to be converted directly into a PDF using Puppeteer without any additional processing."
    }
  }
};

  const prompt = `You are an expert resume writer, ATS optimization specialist, and technical recruiter.

Your task is to generate a professional, ATS-friendly resume as a complete HTML document.

You will receive:
1. The candidate's existing resume.
2. A self-description written by the candidate, which provides additional context about their skills, interests, strengths, goals, and personality.
3. The target job description.

Your goal is to improve and tailor the resume for the target job by:
- Optimizing the professional summary based on the self-description and job description.
- Rewriting experience and project descriptions using strong action verbs and measurable impact where supported by the provided information.
- Highlighting the candidate's most relevant technical skills and projects for the target role.
- Naturally incorporating important ATS keywords from the job description whenever they accurately reflect the candidate's background.
- Improving clarity, formatting, grammar, and readability.
- Maintaining a professional and modern resume structure.

Rules:
- Never fabricate work experience, projects, certifications, education, companies, dates, technologies, or achievements.
- Only use information found in the resume or self-description.
- If the job description mentions skills the candidate does not possess, do not add them.
- If a section has no information, omit it.
- Preserve factual accuracy while making the resume as competitive as possible.

Layout & Typography Constraints (STRICT — do not deviate):
- Body font-size: 10.5px to 11.5px. Do not use anything larger for body text.
- Section headings: 13px to 14px, bold, with 6-8px margin above and 4px margin below.
- Line-height: 1.35 to 1.45 for body text.
- Paragraph/bullet spacing: no more than 3-4px between list items.
- Page margins are fixed at 15px (top/bottom/left/right) — do not add extra padding inside <body> that duplicates this.
- Use a single-column layout unless a two-column layout better fits one page.
- If the candidate's content is extensive, prioritize brevity over completeness:
  prefer 1-2 line bullet points over 3-4 line ones, and include only the
  most relevant 3-4 bullets per role/project rather than every detail.
- The final rendered content, at the above font sizes and spacing, MUST fit
  within a single A4 page (297mm height) including all margins. If the
  content is too long to fit at these sizes, trim less critical bullet
  points rather than shrinking fonts below the minimum stated above.

Output Requirements:
- Return ONLY the HTML document.
- Do not wrap the response in Markdown or code fences.
- Include <!DOCTYPE html>, <html>, <head>, and <body>.
- Embed all CSS inside a single <style> tag.
- Do not use JavaScript.
- Do not use external CSS, fonts, images, icons, SVGs, or CDN resources.
- The HTML must be completely self-contained.
- Optimize the layout for A4 paper size with appropriate margins.
- Keep the resume to one page whenever reasonably possible.
- Use semantic HTML.
- Ensure the design is clean, modern, minimal, and ATS-friendly.
- Use clear section headings and consistent spacing.
- The generated HTML must be ready to be converted directly into a PDF using Puppeteer without any additional processing.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}`

 const response = await ai.models.generateContent({
   model: "gemini-2.5-flash",
   contents : prompt,
     config: {
      responseMimeType: "application/json",
      responseSchema: resumePdfSchema,
    },
 });

 const jsonPdfContent = JSON.parse(response.text);

 const pdfBuffer = await generatePdfFromHtml(jsonPdfContent.pdfHtml)

 return pdfBuffer

}


