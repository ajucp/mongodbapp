const roleAuth=(allowedRoles)=>{
    return (req,res,next)=>{
        const user=req.user;
        console.log(user);
        if(!user||!allowedRoles.includes(user.role)){
            return res.status(403).json({message:'Access Denied'})
        }
        next()
    };
};
module.exports=roleAuth;