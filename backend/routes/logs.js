// routes for logs
let User = require('../models/user.model');
let Log = require('../models/log.model');
const routerLogs = require('express').Router();


routerLogs.route('/userlogs').get((req,res)=>{
    res.json("you are golden");
});


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
     })
     newLog.save(err=>{
         if(err){
             return console.log(err);
            }else{
                console.log("New Log Added")
            }
     })
     res.end();
});

routerLogs.post('delete',(req,res)=>{
    //Needs to be change for delete in log model only

    Log.findById(req.id, (err,log)=>{
        if (err)console.log(err);
        log.remove()
        console.log('Log removed from Log Model')
    })
    User.findOne({username:'yamil'},function (err,log){
        log.userLogs.id("5ebdfae7c6ac1b36547112a4").remove();
        log.save()
    })
})
routerLogs.get('/find',(req,res)=>{  
   // Needs to be change to get info from log model only, aslo change to get request
    Log.find({site:'yamil'},function (err,file){
        if (err){
            console.log(err)
        }else{
            const result = file.userLogs      
            res.send(result)
        }
    }) 
})

//Route to add site to user array for display in site list 07/10/2020
routerLogs.post('/addsite',(req,res)=>{
    const newSite= {name:req.body.site,lat:req.body.lat,lng:req.body.lng}
    const extractedArray=[];
    const extractFunc= list=>{
        Object.entries(list).forEach(site=>{       
             extractedArray.push(`${site[1].name}`)
     })
    }
    const finder= e=>{
        return e===newSite.name
    }
    User.findOne({username:'yamil'},function (err,log){
        const array=log.sites;
        extractFunc(array)
        if (extractedArray.some(finder)===true){
            console.log('Site is present on the User List')
        }else{
            log.sites.push(newSite)
            log.save()
        }       
    })    
    res.end();
   
})

router.post('/sitetickets',(req,res)=>{
    if (req.isAuthenticated()){       
        Log.find({ name: req.body.tech, site:req.body.site, function (err, docs) {}});
       
    }else{
        console.log("Not Authorized")
        const user= "invalid";
        res.send(user)
    }
})
module.exports=routerLogs;