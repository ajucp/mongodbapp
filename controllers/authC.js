const {login}=require('../services/authS')


exports.getLogin=(req,res,next)=>{
    console.log('hai')
    res.send({
        "message": "Use POST /auth/login to log in."
      })
}

exports.PostLogin=async(req,res,next)=>{
    const {email,password}=req.body
    console.log(req.body)
    try {
        console.log('LOGIN')
        const userLogin=await login(email,password);
        //checking there is a error in login
        if(userLogin.error){
            return res.status(401).json({message:userLogin.error})
        }
        return res.json({
            message:'Login succesfully',
            user:userLogin.user,
            token:userLogin.token
        })
        
    } catch (err) {
        console.log("ERROR IN LOGIN PAGE",err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }

}

exports.postLogOut=(req,res,next)=>{
    req.destroy(err=>{

        res.send('log-Out Successfully')
    })
}