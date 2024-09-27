const mongodb=require('mongodb');

const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=async(callback)=>mongoClient.connect(
    'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0'
    )
    .then(client=>{
        console.log("DATA_BASE IS CONNECTED");
        _db=client.db('books')
        callback()
    })
    .catch(err=>{
        console.log(err);
        throw err
        }     
    )
        
    
const getDb=()=>{
    if(_db){
        return _db;
    }
    throw "NO DATABASE IS FOUND"
}

module.exports={mongoConnect,getDb};
// exports.getDb=getDb;
    
