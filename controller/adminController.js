const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const administrator=mongoose.model('administrator');
const clients=mongoose.model('clients');
const workers=mongoose.model('workers');

var session=require('express-session');
//session
router.use(session({
    key:"admin",
    secret:"any random string",
}));//session

//admin login
router.get('/',(req,res)=>{
    res.render('AdminI/login');
});
//admin=admin123,admin123
//post data match with session
router.post('/',(req,res)=>{
    administrator.findOne({'username':req.body.username,'password':req.body.password},(err,admin)=>{
        if(admin != ""){
            req.session.admin=admin;
        }        
        res.send(admin);
    });
});

//logout by admin
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/admin');
})
//to create admin
// router.post('/',(req,res)=>{
//     var admins=new administrator();
//     admins.username=req.body.username;
//     admins.password=req.body.password;
//     admins.save((err,doc)=>{
//         if(!err){
//             res.redirect('/admin')
//         }
//     })
// });

//localhost:5000/admin/dashboard=> //first page of admin all clients
router.get('/dashboard',(req,res)=>{
    if(req.session.admin){
        clients.find((err,docs)=>{
            if(!err){
                res.render('AdminI/dashboard',({
                    clients:docs,
                    Ikram:'hey im Ikram',
                }));
            }
        });
    }
    else{
        res.redirect('/admin');
    }
});

//workers List
router.get('/dashboard/workersList',(req,res)=>{
    if(req.session.admin){
        workers.find((err,doc)=>{
            res.render('AdminI/workersList',({
                workers:doc,
            }))
        });}
    else{
        res.redirect('/admin/');
    }
    
});
// to delete a worker
router.get('/dashboard/workersList/:id/delete',(req,res)=>{
    if(req.session.admin){
        workers.findByIdAndDelete(req.params.id,(err,doc)=>{
            if(!err){
                res.redirect('/admin/dashboard/workersList/');
            }
            });
        
    }
    else{
        res.redirect('/admin');
    }
});
//to only add a worker
router.get('/dashboard/addWorker',(req,res)=>{
    if(req.session.admin){
        res.render('AdminI/workers');
    }
    else{
        res.redirect('/admin/');
    }

});

//add or update
router.post('/dashboard/addWorker',(req,res)=>{
    
    if(req.session.admin){
        if(req.body._id=="")
        {
        var worker=new workers();
        worker.workerName=req.body.workerName;
        worker.type=req.body.type;
        worker.password=req.body.password;
        worker.phone=req.body.phone;
        worker.location.lat=req.body.lat;
        worker.location.lng=req.body.lng;
        worker.save((err,doc)=>{
            if(!err){
                console.log("errorskk",err)
                res.redirect('/admin/dashboard/workersList');
            }
            else{
                res.redirect('/admin/dashboard/addWorker');
            }
        });}
        else{
            workers.findByIdAndUpdate({_id:req.body._id},req.body,(err,doc)=>{
                if(!err){res.redirect('/admin/dashboard/workersList');}
            });
        }
    }
    else{
        res.redirect('/admin/');
    }
});
//to update get form
router.get('/dashboard/workersList/:id',(req,res)=>{
    if(req.session.admin){
        workers.findById(req.params.id,(err,doc)=>{
            if(!err){
            res.render('AdminI/workers',({
                worker:doc,
            }));
        }
        })
    }
    else{
        res.redirect('/admin')
    }
});
//endWorker

//client detail 
router.get('/dashboard/:_id',(req,res)=>{
    if(req.session.admin){
        clients.findById(req.params._id,(err,doc)=>{
            if(!err){
                workers.find((err,docs)=>{
                res.render('AdminI/detailReplay.hbs',({
                    client:doc,
                    workers:docs,
                }));
            
        });}
    });
    
    }
    else{
        res.redirect('/admin');
    }
});
//client response and assign worker to client
router.post('/dashboard/:id',(req,res)=>{
    if(req.session.admin){  
        clients.findByIdAndUpdate({_id:req.body._id},{'response':req.body.response,'worker':req.body.worker},{new:true},(err,doc)=>{
            if(!err){res.redirect('/admin/dashboard/');}
            else{console.log('errrrr');}
        });
    }
    else{
        res.redirect('/admin');
    }
});

//to delete a client
router.get('/dashboard/:id/delete',(req,res)=>{
    if(req.session.admin){
        clients.findByIdAndDelete(req.params.id,(err,doc)=>{
            if(!err){res.redirect('/admin/dashboard/');}
        });
    }
    else{
        res.redirect('/admin');
    }
});




module.exports=router;