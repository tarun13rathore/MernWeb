const mongoose = require("mongoose");
const dotenv = require('dotenv');
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
//const User=require("./model/userSchema");
app.use(cookieParser());

app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT || 3007;

// Middelware 
// const middleware = (req,res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

//app.get('/', (req, res) => {
 //   res.send("this is index page");
//});
// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });
// app.get('/contact', (req, res) => {
//     res.send("this is conatct page");
// });
app.get('/login', (req, res) => {
    res.send("this is login page");
});

//heroku
if(process.env.NODE_ENV == "production") {
app.use(express.static("client/build"));
const path= require("path");
app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})
}

app.listen(PORT,() =>{
    console.log(`server is running port no ${PORT}`)
})