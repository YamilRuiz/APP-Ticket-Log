// routes for logs
let User = require('../models/user.model');
let Log = require('../models/log.model');
const routerLogs = require('express').Router();

routerLogs.route('/add').post((req,res)=>{
     const newLog = new Log({         
         site:req.body.site,
         tech:req.body.tech,
         ticket:req.body.ticket,
         coords:{
             coordinates:{
                 lat:req.body.lat,
                 long:req.body.lng
             }
         },
         hidden:false,
         description: req.body.description
     });
     newLog.save(err=>{
         if(err){
             return console.log(err);
            }else{
                console.log("New Log Added")
            }
     });
     res.end();
});

routerLogs.post('delete',(req,res)=>{
    //Needs to be change for delete in log model only

    Log.findById(req.id, (err,log)=>{
        if (err)console.log(err);
        log.remove();
        console.log('Log removed from Log Model')
    });
    User.findOne({username:'yamil'},function (err,log){
        log.userLogs.id("5ebdfae7c6ac1b36547112a4").remove();
        log.save();
    });
});
routerLogs.post('/findlogs',(req,res)=>{  
   // Needs to be change to get info from log model only, aslo change to get request
    Log.exists({tech:'manin'},function (err,result){
        if (result){
            Log.find({tech:'manin'},function(err,files){
                res.send(files);
                res.end();
            })
        }else{
            const tech=false;
            res.send(tech);
            res.end();     
        }
    }); 
});

// Needs to be completed to return the data per site 
routerLogs.post('/sitetickets',(req,res)=>{
    if (req.isAuthenticated()){       
        Log.find({ name: req.body.tech, site:req.body.site, function (err, docs) {
            res.send(docs);
        }});
       
    }else{
        console.log("Not Authorized");
        const user= "invalid";
        res.send(user);
    }
});
module.exports=routerLogs;