import express from "express";
import Validator from "validator";
import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../config/token.js";
export const Register = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        let existUser = await User.findOne({email});

        if (existUser){
            return res.status(400).json({message:"User Already Exist"});
        }
        if( !Validator.isEmail(email)){
            return res.status(400).json({message:"Please Enter a Valid Email"});
        }
        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        let hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword});

        //token generation
        let token = await generateToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24*60*60*1000,
        });
        return res.status(201).json(user);


    }catch(error)
    {
        return res.status(500).json({message:error.message});
    }

}

export const Login = async (req,res) =>{
    try{
        const {email,password}= req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        let isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        //token generation
        let token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24*60*60*1000,
        });
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const logOut = async (req,res) =>{
    try{
        res.clearCookie("token");
    return res.status(200).json({message:"Logged out successfully"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}


export const googleLogin = async (req,res)=>{
    try{
       const {name,email} =req.body;
       let user = await User.findOne({email});
       const randomPassword = crypto.randomBytes(32).toString("hex");

       const hashedPassword = await bcrypt.hash(randomPassword, 10);
       if (!user){
           user = await User.create({name,email,password:hashedPassword});
       }
       
         //token generation
        let token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:24*60*60*1000,
        });
            // Exclude the password field from the response
        const { password, ...userData } = user.toObject();

        return res.status(200).json(userData);

        
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
