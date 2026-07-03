import { GoogleGenAI } from  '@google/genai'
import config from '../config/config.js'

const ai =  new GoogleGenAI({
    apiKey : config.GOOGLE_GEMINI_API_KEY
});

async function invokeGeminiAI() {


    const responses = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : "Hello gemini ! Explain what is interview"
    })
 
    console.log(responses.text)

}

export default invokeGeminiAI