/* 
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY); */

// async function run() {
//     const prompt = req.body.prompt;

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//   const result = await model.generateContent(prompt);

//   console.log(result.response.text()); 
//   const response = result.response.text();
   
//     //now we can render response in its required position using ejs in frontend
// }
// run();

/* router.post('/getpage', async (req, res) => {
  try {
    const prompt = req.body.prompt; // Get the prompt from the user
    if (!prompt) {
      return res.status(400).send("Prompt is required");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responsetxt = result.response.text(); // Extract the AI response text

   
    res.render('query-window', { prompt, response: responsetxt });
  } catch (error) {
    console.error("Error at", error);
    res.status(500).send("An error occurred while generating the response");
  }
}); */
