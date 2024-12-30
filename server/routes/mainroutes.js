const express = require("express");
const router = express.Router();
const post = require('../../models/post'); 

//routes
//practice route
/* router.get("/", (req, res) => {
    const locals = {
        title: "hello",
        heading:"ssr"
    };
    res.render('index' ,{locals}); //with { } we can pass multiple
}); */
//router to display data
router.get("/", async (req,res)=>{

try{
const data = await post.find();
res.render('index',{data});
} catch(error){
 console.log(error);
}
});


/* async function insertpostData() {
    try {
      const result = await post.insertMany([
        {
          title: "Building APIs with Node.js",
          content: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
          summary: "An introductory guide to building APIs with Node.js.",
          tag: "API",
          author: "John Doe",
        },
        {
          title: "Deployment of Node.js applications",
          content: "Understand the different ways to deploy your Node.js applications, including cloud and container environments.",
          summary: "A guide to deploying Node.js apps.",
          tag: "Deployment",
          author: "Jane Smith",
        },
        // Add more posts here...
      ]);
      console.log("Posts inserted:", result);
    } catch (error) {
      console.error("Error inserting posts:", error);
    }
  }
  
  // Call the insert function
  insertpostData();
   */
//router to create seperate page
router.get("/post/:id", async(req,res)=>{

    try{
        let slug = req.params.id;
    const data = await post.findById({_id : slug});
    res.render('post', {data});
    } catch(error){
     console.log(error);
    }
    });
    //search

    router.get('/search', async (req, res) => {
        try {
            let searchTerm = req.body.searchTerm;
    
            // Remove special characters from the search term
            const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    
            // Perform the search using a regular expression
            const data = await Post.find({
                $or: [
                    { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                    { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
                ]
            });
    
            // Render the search results
            res.render("search", {
                locals: res.locals // Assuming you want to pass locals to the view
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while searching.");
        }
    });
    

    const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
router.get('/help', (req, res) => {
  
  res.render('query-window', { prompt: null, response: null }); 
});

router.post('/help', async (req, res) => {
  try {
    const prompt = req.body.prompt; 
    if (!prompt) {
      return res.status(400).send("Prompt is required");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responsetxt = result.response.text(); 

   
    res.render('query-window', { prompt, response: responsetxt });
  } catch (error) {
    console.error("Error at", error);
    res.status(500).send("An error occurred while generating the response");
  }
});


module.exports = router;
