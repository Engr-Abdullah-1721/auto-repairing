const express=require('express');
const session=require('express-session');
const mongoose=require('mongoose');
const workers=mongoose.model('workers');
const router=express.Router();
const clients=mongoose.model('clients');
//session
router.use(session({
    key:"worker",
    secret:"any random string",
}));//session
router.get('/',(req,res)=>{
    res.render('WorkerI/workerLogin');
})

//login of worker 
router.post('/',(req,res)=>{
    workers.findOne({'workerName':req.body.workerName,'password':req.body.password},(err,worker)=>{
          if(worker!=''){
              req.session.worker=worker;
          }
          res.send(worker);
    });
});

//dashboard of worker
router.get('/:_id/dash',(req,res)=>{
    if(req.session.worker){
        workers.findById(req.params._id,(err,doc)=>{
                clients.find({'worker':doc.workerName},(err,docs)=>{
                    if(!err){
                    res.render('WorkerI/workerDash',({
                        worker:doc,
                        clients:docs
                    }));
                }
                else{console.log("error in worker/id/dash")}
                });
            
        
        })
    }
    else{
        res.redirect('/worker');
    }
});

//if a worker complete client request.
router.post('/:_id/dash',(req,res)=>{
    if(req.session.worker){
        workers.findById({_id:req.params._id},(err,doc)=>{
        clients.findByIdAndUpdate({_id:req.body._id},{'complete':"completed"},{new:true},(err,doc1)=>{
            if(!err){
                res.redirect('/worker/'+req.params._id+'/dash');
            }
            else{
                console.log('sorry');
            }
        });});
    }
    else{
        res.redirect('/worker');
    }
});//



//logout by worker
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/worker');
})
module.exports=router;