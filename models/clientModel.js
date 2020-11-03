const mongoose=require('mongoose');
var clientSchema=new mongoose.Schema({
    clientName:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    vehicleCondition:{
        type:String,
        required:true,
    },
    cnic:{
        type:String,
        required:true,
    },
    vehicleNumber:{
        type:String,
        required:true,
    },
    carType:{
        type:String,
        required:true,
    },
    worker:{
        type:String,
        required:false,
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
    response:{
        type:String,
        required:false,
    },
    complete:{
        type:String,
        required:false,
    }

});

mongoose.model('clients',clientSchema);