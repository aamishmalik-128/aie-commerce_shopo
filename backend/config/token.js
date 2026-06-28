import jwt from "jsonwebtoken";

export const generateToken =async (userId)=>{
    try{
        let token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"});
        return token;
    }
    catch(error){
        console.log("token generation error");
    }
}