require('dotenv').config();

const express = require("express");
const bcrypt = require('bcrypt');

const path = require('path');
const expressLayout = require('express-ejs-layouts'); 
const auth = require('./models/login');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;
const db = require("./models/blogdb");
const app = express();

const port = 3000;
app.use(express.urlencoded({ extended: true })); 
const methodOverride = require('method-override');


app.use(methodOverride('_method'));  

app.use(express.json()); 
app.use(express.static("public"));

// Set EJS as templating engine

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
//my main routes 
app.use("/", require("./server/routes/mainroutes"));
app.use("/", require("./server/routes/admin"));
passport.use(new Localstrategy( async (username,password,done) =>{ 
try{
    const user = await auth.findOne({username : username});
    if(!user)
        return done(null , false , {message:"incorrect password "});
     
    const ispasswordmatch = user.password == password ? true :false;
    if(ispasswordmatch){
        return done(null , user);

    }else{
        return done(null , false , {message:"incorrect password "});
    }

}catch(error){
 return done(err);
}

}));
app.get('/login',(req , res)=>{
    res.render('login');
});
app.get('/signup',(req , res)=>{
    res.render('login');
});
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
