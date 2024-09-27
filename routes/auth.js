const express=require('express');
const routes=express.Router();
const validate=require('../middleware/validate');
const {check,body}=require('express-validator');

const authController=require('../controllers/authC');

routes.get('/login',authController.getLogin);
routes.post('/login',[
    body('email')
    .isEmail()
    .withMessage('please enter a valid email id').normalizeEmail(),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/[a-zA-Z]/)
      .withMessage('Password must contain a letter'),
],validate,authController.PostLogin);
routes.post('/logout',authController.postLogOut);



module.exports=routes