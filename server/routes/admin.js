const express = require("express");
const router = express.Router();
const post = require('../../models/post'); 
const adminlayout = "../views/layouts/admin";

router.get('/add', (req, res) => {
  res.locals.page = 'login'; 
  res.render('login');      
});


/* router.get('/add' ,(req,res)=>{
  res.render('login');
}); */

router.post('/admin-login', async (req, res) => {
try {
   const { username, password } = req.body;

  
   if (username === 'admin@dev' && password === 'deepak@dev') {
      
       res.redirect('/admin');
   } else {
       
   }
} catch (error) {
   console.error('Error during admin login:', error);
   res.status(500).send('An error occurred. Please try again later.');
}
});
router.get("/admin", async (req,res)=>{

    try{
    const data = await post.find();
    res.render('admin/dashboard',{data});
    } catch(error){
     console.log(error);
    }
    });
    router.get("/dashboard", async (req,res)=>{

      try{
      const data = await post.find();
      res.render('admin/dashboard',{data});
      } catch(error){
       console.log(error);
      }
      });
    router.get("/add-post", async (req,res)=>{

      try{
      const data = await post.find();
      res.render('admin/add-post',{data});
      } catch(error){
       console.log(error);
      }
      });
     
    
    // router.post('/add-post',  async (req, res) => {
    //     try {
    //       // Create a new post object with the provided data
    //       const newPost = new post({
    //         title: req.body.title,
    //         body: req.body.body
    //       });
      
    //       // Save the new post to the database
    //       await post.create(newPost);
      
    //       // Redirect to the dashboard after the post is created
    //       res.redirect('dashboard');
    //     } catch (error) {
    //       // Log the error if something goes wrong
    //       console.error(error);
    //       res.status(500).send('Server Error'); // Optionally send an error response
    //     }
    //   });
    router.post('/add-post', async (req, res) => {
      try {
        // Extract values from the form input
        const { title, content, summary, tag, url, author } = req.body;
    
        // Create a new post object with the provided data
        const newPost = new post({
          title,       
          content,  
          summary,    
          tag,         
          url,         // Optional URL
          author       
        });
    
        
        await post.create(newPost);
    
       
        res.redirect('dashboard');
      } catch (error) {
        // Log the error if something goes wrong
        console.error(error);
        res.status(500).send('Server Error'); // Optionally send an error response
      }
    });
    

      router.get('/edit-post/:id',  async (req, res) => {
        try {
      
      
          const data = await post.findOne({ _id: req.params.id });
      
          res.render('admin/edit-post', {
            data,
            layout: adminlayout
          });
      
        } catch (error) {
          console.log(error);
        }
      
      });
      
      
      
      router.put('/edit-post/:id',  async (req, res) => {
        try {
          const { title, content, summary, tag, url, author } = req.body;
          await post.findByIdAndUpdate(req.params.id, {     //findByIdAndUpdate(id, updateObject)
            title, 
            content, 
            summary, 
            tag,
             url,
              author ,      //parameter wali id ke document ka data existing document se replace ho jaiyega
            updatedAt: Date.now()
          });
      
          res.redirect(`/edit-post/${req.params.id}`); 
          // res.redirect('/dashboard');
      
        } catch (error) {
          console.log(error);
        }
      
      });
      
      
      // router.post('/admin', async (req, res) => {
      //   try {
      //     const { username, password } = req.body;
          
      //     if(req.body.username === 'admin@dev' && req.body.password === 'deepak@dev') {
      //       res.send('You are logged in.')
      //     } else {
      //       res.send('Wrong username or password');
      //     }
      
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });
      
      router.delete('/delete-post/:id', async (req, res) => {

        try {
          await post.deleteOne( { _id: req.params.id } );
          res.redirect('/dashboard');
        } catch (error) {
          console.log(error);
        }
      
      });
      
      
module.exports = router;


