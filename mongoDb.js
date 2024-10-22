const express=require('express');
const bodyParser=require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const app=express();
const userRoutes=require('./routes/user');
const productRoutes=require('./routes/product');
const authRoutes=require('./routes/auth');
const reviewRoutes=require('./routes/review');

const { Verify } = require('./middleware/verify');


app.use(bodyParser.json());
app.use('/api/mongodb',userRoutes,productRoutes,authRoutes,reviewRoutes);
app.get('/api/mongodb/v1/user', Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to your Dashboard!",
    });
});

mongoConnect(()=>{
    app.listen(3000);
});
