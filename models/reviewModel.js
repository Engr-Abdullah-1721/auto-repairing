const mongoose=require('mongoose');
var reviewSchema=new mongoose.Schema({
    client:{
        type:String,
        required:true,
    },
    review:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    worker:{
        type:String,
        required:true,
    },
});

mongoose.model('reviews',reviewSchema);