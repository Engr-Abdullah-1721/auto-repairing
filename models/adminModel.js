const mongoose=require('mongoose');

var adminSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    }
});

mongoose.model('administrator',adminSchema);