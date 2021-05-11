const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userScema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    cpass:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
         {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            }
         }  
    ],
    tokens : [
        {
             token :{
                type:String,
                required:true
             }
        }
    ]
})

//we are hashing the password
userScema.pre('save', async function (next){
    if(this.isModified('pass')){
        this.pass = await bcrypt.hash(this.pass,12);
        this.cpass= await bcrypt.hash(this.cpass,12);
    }
    next();
 });

 //we are generating token
 userScema.methods.generateAuthToken = async function(){
     try{
     let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
     this.tokens = this.tokens.concat({token:token});
     await this.save();
     return token;
    }catch(err){
        console.log(err)
    }
 }

 //stored message

 userScema.methods.addMessage = async function(name,email,phone,message){
     try{
           this.messages = this.messages.concat({name,email,phone,message});
           await this.save();
           return this.messages;
     }catch(err){
         console.log(err)
     }
 }


const User =mongoose.model("USER",userScema);

module.exports = User;

