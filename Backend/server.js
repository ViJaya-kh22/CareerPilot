import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import invokeGeminiAI from "./src/services/ai.services.js";

connectDB();
invokeGeminiAI();

app.listen(3000, () => {
    try {

      console.log("Server running on port 3000")
        
    } catch (error) {
        console.log("Error in server.js :" + error)
    }
});