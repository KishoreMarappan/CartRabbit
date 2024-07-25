import express, { request, response } from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/Usermodel.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = express.Router();
dotenv.config();

router.post('/signup',async (request,response) =>{
    const {username, email, password } = request.body;
    const existinguser = await User.findOne({email})
    if(existinguser){
        return response.json({message : "User already existing!"});
    }
    const hashpassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        email,
        password:hashpassword,
    })
    await newUser.save();
    return response.json({status:true, message : "user successfully added!!"});
    

} ) ;

router.post('/login',async (req,res)=>{

    const {email,password} = req.body;
    const finduser = await  User.findOne({email});
    if(!finduser){
        return res.json({message : "user not found!!"});
    }
    console.log("found user");
    const passwordmatch  = await bcrypt.compare(password,finduser.password);
    if(!passwordmatch){
        return res.json({message : "Invalid Credentials"});
    }

    const token  = jwt.sign({username : finduser.username},process.env.KEY,{expiresIn : '2h'});
    res.cookie('token',token,{httpOnly:true, maxAge : 360000});
    return res.json({status : true ,message:"Logged In successfully",token : token});

}); 

router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    console.log("the reset email is "+ email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAILPASS
            }
        });
        console.log("created transporter");
        transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP configuration error:', error);
            } else {
                console.log('SMTP server connection established successfully!');
            }
        });
        console.log("verified transporter");
        const encodedtoken = encodeURIComponent(token).replace(/\./g, "%2E");
        const mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: 'Email to reset password',
            text: `Click on the following link to reset your password: http://localhost:5173/resetpassword/${encodedtoken}`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: false, message: "Failed to send password reset email" });
            } else {
                return res.json({ status: true, message: "Password reset link sent to your email" });
            }
            console.log("done sending mail");
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal  server error" });
    }
});

router.post('/resetpassword/:token', async (req, res) => {
    console.log("reset started!!");
    const token = req.params.token;
    const { password } = req.body;
    try {
        const decode = await jwt.verify(token, process.env.KEY);
        const id = decode.id;
        const hashpasss = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { password: hashpasss });
        console.log("updated new password!");
        return res.json({ status: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Failed to reset password" });
    }
});

  
  export default router;