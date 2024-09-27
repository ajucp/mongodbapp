// import { validationResult } from "express-validator";
const {validationResult}=require('express-validator');

const validate=(req,res,next)=>{
    const errors=validationResult(req)
    // console.log(errors.array()[0].msg)
    if(!errors.isEmpty()){

        return res.status(402).json({ errors: errors.array()[0].msg })
    }
    next();
}
// console.log('hai')
module.exports=validate;