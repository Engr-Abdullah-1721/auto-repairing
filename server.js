require('dotenv').config()
require('./models/db');
const express=require('express');
const mongoose=require('mongoose');
const expressHandlebars=require('express-handlebars');
const bodyParser=require('body-parser');
const path=require('path');


//all contollers are here
const adminController=require('./controller/adminController');
const userController=require('./controller/userController');
const workerController=require('./controller/workerController');
var app=express();

app.use(express.static('static'));

app.use(bodyParser.urlencoded({
    extended:true,
}));

app.use(bodyParser.json());//all request changes to json format

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname+'/views/layouts/'
}));


app.set('view engine','hbs');//successfully configured handlebars
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('hey your server is running at port 3000');
});

app.use('/worker',workerController);
app.use('/admin',adminController);
app.use('/',userController);
