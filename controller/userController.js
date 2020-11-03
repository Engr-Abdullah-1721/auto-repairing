const mongoose=require('mongoose');
const express=require('express');
const clientModel=mongoose.model('clients');
const workerModel=mongoose.model('workers');
const reviewModel=mongoose.model('reviews');
const router=express.Router();

router.get('',function(req,res){
    workerModel.find((err,doc)=>{
        if(!err){
          res.render('UI/home',({
              workers:doc,
          }));
        }
    })
    
});
router.post('',function(req,res){
    forInsertion(req,res);
    
});

router.get('/about/',function(req,res){
    res.render('UI/about');
})
function forInsertion(req,res){
    client=new clientModel();
    client.clientName=req.body.clientName;
    client.phone=req.body.phone;
    client.carType=req.body.carType;
    client.vehicleNumber=req.body.vehicleNumber;
    client.cnic=req.body.cnic;
    client.vehicleCondition=req.body.carCondition;
    client.location.lat=req.body.lat;
    client.location.lng=req.body.lng;
    if(req.body.clientName=="" || req.body.phone=="" || req.body.carType=="" || req.body.vehicleNumber=="" || req.body.carCondition =="" || req.body.lat=="" || req.body.lng==""){
        res.render("UI/home",({
            client:req.body,
            error:"All the input fields are required or make sure that your Location is enabled in setting",
        }));
    }

    client.save((err,doc)=>{
        if(!err){
            res.redirect('/'+doc._id);
        }
        else{
            console.log("error happened");
        }
    });
}

router.get('/:id',(req,res)=>{
    clientModel.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('UI/client.hbs',({
                client:doc,
            }))
        }
    })
});
router.post('/:id',(req,res)=>{
    var review=new reviewModel();
    review.worker=req.body.worker,
    review.client=req.body.client,
    review.comment=req.body.comment,
    review.review=req.body.review,
    review.client=review._id,
    review.worker=doc.worker,
    review.save((err)=>{
        if(!err){
            res.redirect('/')
        }
    })
})
router.get('/worker/:id',(req,res)=>{
    workerModel.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('UI/worker',({
                worker:doc,
            }));
        }
        else{
            res.redirect('/');
        }
    });
});

module.exports=router;