const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authenticate')

require('../db/conn');
const User = require("../model/userSchema");


// router.post('/register',(req,res) => {
//     const {name, email, phone, work, pass,cpass}=req.body;

//     if(!name || !email || !phone || !work ||  !pass || !cpass){
//            return res.status(422).json({error:"plaese fill all property"})
//     }

//     User.findOne({email:email})
//        .then((userExist) => {
//            if(userExist){
//             return res.status(422).json({error:"Email Allready Exist.."}) 
//            }
//         const user = new User({name, email, phone, work, pass,cpass});
//         user.save().then(() =>{
//             res.status(201).json({message:"User Resgister Sucessfully.."})
//         }).catch((err)=> res.status(500).json({error:"Fail to Register.."}) )

//        }).catch(err => {console.log(err)})
// })




//Async---await
router.post('/register', async(req,res) => {
    const {name, email, phone, work, pass,cpass}=req.body;

    if(!name || !email || !phone || !work ||  !pass || !cpass){
           return res.status(422).json({error:"plaese fill all property"})
    }

    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email Allready Exist.."}) 
           }else if(pass != cpass){
            return res.status(422).json({error:"Password are not matched.."}) 
           }else{
            const user = new User({name, email, phone, work, pass,cpass});
            await user.save();
           res.status(201).json({message:"User Resgister Sucessfully.."});
           }
    }catch(err){
        console.log(err)
    } 
})

//login authentication

router.post('/signin', async(req,res) => {
    try{
        let token;
        const {email,pass}=req.body;
        if(!email || !pass){
            return res.status(400).json({error:"please fill all the data"})
        }
        const userLogin = await User.findOne({email:email});
        //console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(pass, userLogin.pass);

            //
            const token = await userLogin.generateAuthToken();
            //console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
         
            if(!isMatch){
                res.status(400).json({error:"Invalid Cradentials"});
            }else{
                res.status(200).json({message:"User Login Succesfully"});
            }
        }else{
            res.status(400).json({error:"Invalid Cradentials"});
        }
        
    }catch(err){
        console.log(err)
    }
});

// router.get("/register",async(req,res) =>{
//     try{
//         const registerFetch = await User.find();
//         res.send(registerFetch);
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

router.get('/about', authenticate, (req, res) => {
    //console.log(`Hello my About`);
    res.send(req.rootUser)
});

router.get('/getdata', authenticate, (req, res) => {
    //console.log(`Hello my About`);
    res.send(req.rootUser)
});

router.post('/contact', authenticate, async(req, res) => {
    try{

        const {name,email,phone,message} = req.body;
        if(!name || !email || !phone || !message){
           return res.json({error : "Please all Contact filled."})
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name,email,phone,message);
            await userContact.save();

            res.status(201).json({message:"User contact successfully Send"})
        }

    }catch(err){ 
        console.log(err);
    }
});

//logout page
router.get('/logout', (req, res) => {
    //console.log(`Hello my About`);
    res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send("User Logout")
});

module.exports=router;