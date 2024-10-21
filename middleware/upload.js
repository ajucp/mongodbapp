const multer=require('multer');         //TO HANDLE THE FILE UPLOAD FORM POSTMAN

const storage=multer.memoryStorage();

const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024}
});

module.exports=upload