const {check,body}=require('express-validator');

const userValidator=()=>{
    return[
        check('FName').notEmpty().withMessage('First Name is required').toUpperCase(),
        check('LName').notEmpty().withMessage('Last Name is required').toUpperCase(),
        check('email').isEmail().withMessage('Invalid email format').toLowerCase(),
        check('userId').notEmpty().withMessage('User ID is required').toLowerCase(),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]
}

module.exports=userValidator;