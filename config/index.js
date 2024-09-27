const dotenv=require('dotenv');


// const crypto=require('crypto');
// const secretKey = crypto.randomBytes(20).toString('hex'); // Generate a random secret key
// console.log(secretKey);

dotenv.config();

const{URI,PORT,SECRET_ACCESS_TOKEN}=process.env;

// console.log('config data',process.env.SECRET_ACCESS_TOKEN)
// console.log('URI values:',URI,'PORT values:',PORT,'SECERT values:',SECRET_ACCESS_TOKEN);


module.exports={URI,PORT,SECRET_ACCESS_TOKEN};