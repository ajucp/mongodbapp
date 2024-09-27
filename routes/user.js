const express=require('express');
const routes=express.Router();

const userController=require('../controllers/userC');
const validate=require('../middleware/validate');
const {check,body}=require('express-validator');
// const Verify=require('../middleware/verify')

routes.post('/user',[
    check('FName').notEmpty().withMessage('First Name is required'),
    check('LName').notEmpty().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('userId').notEmpty().withMessage('User ID is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],validate,userController.postUser);

routes.get('/users',userController.getUser);

routes.get('/user/:userId',userController.getUserById);
routes.delete('/user/:userId/delete',userController.deleteUserById);
routes.patch('/user/:userId/edit-user',userController.postUpdateUser)



module.exports=routes;