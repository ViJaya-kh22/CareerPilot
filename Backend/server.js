import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    try {

      console.log(`Server running on port ${PORT}`)
        
    } catch (error) {
        console.log("Error in server.js :" + error)
    }
});