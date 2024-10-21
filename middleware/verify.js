const User=require('../models/userM');
const jwt=require('jsonwebtoken');
const {SECRET_ACCESS_TOKEN}=require('../config/index');


//verification of middleware for jwt token

exports.Verify=async(req,res,next)=>{
    
    console.log("hello")
    try {
        const authHeader = req.headers['authorization'];//geting autherzation header
        // console.log(authHeader)
        if(!authHeader){
            return res.status(401).json({message:"No Token Provided,access denied"})
        }
        const token = authHeader;//extracting the token
        // console.log(token)
        if(!token){
            return res.status(401).json({message:"Missing Token,Access Denied"})
        }
        

        jwt.verify(token,SECRET_ACCESS_TOKEN,async (err,decoded) => {
            if(err){
                return res.status(403).json({message:"Token Invalid or Expired,Access Denied"})
            }
            
            const {id,role}=decoded;//extracting the user id from the payload
            console.log(token);
            console.log("role:",role)
            console.log("id:",id)

            const user=await User.findUserById(id);//finding the user form the user database
            
            if(!user){
                return res.status(404).json({message:"User Not FOund "})
            }
            req.user=user;//requesting the user for furthur use
            // req.user.role=role;
            next();

        })
    } catch (err) {
        console.log("Error in token verification", err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

