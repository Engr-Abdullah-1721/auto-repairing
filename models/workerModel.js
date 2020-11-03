const mongoose=require('mongoose');

var workerSchema= mongoose.Schema({
    workerName:{
        type:String,
        required:true,
    },
    location:{
        lat:{
            type:String,
            required:true,
        },
        lng:{
            type:String,
            required:true,
        }
    },
    type:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
});
mongoose.model('workers',workerSchema);