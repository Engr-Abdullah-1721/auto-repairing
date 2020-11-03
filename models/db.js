const mongoose=require('mongoose');
const url="mongodb://localhost:27017/WORKSHOP1";

mongoose.connect('mongodb+srv://abdullah:097vehicle@cluster1.toux6.mongodb.net/vehicle-repairing?retryWrites=true&w=majority' || url,{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("WORKSHOP1 successfully connected");
    }
    else{
        console.log("Error in connecting DB WORKER1");
    }
});
require('./reviewModel')
require('./workerModel');
require('./clientModel');
require('./adminModel');
