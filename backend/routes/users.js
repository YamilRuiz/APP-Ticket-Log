const router = require('express').Router();
let User = require('../models/user.model');
const passport= require('../passport/passportSetup');

router.route('/register').post((req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    User.findOne({ username : username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            done();
           
        } else {

            // if there is no user with that email
            // create the user
            var newUser= new User();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = password;

            // save the user
            newUser.save(function(err){
                if(err){
                    return console.log(err);
                   }else{
                    res.sendStatus(200);
                   }
            });
        }
    }); 
});

router.post(
    '/login',
    function (req, res, next) {
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        req.session.save();
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);        
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.end();
  }
);

router.get('/check',(req,res)=>{
    
    if (req.isAuthenticated()){
        const user= 'valid'       
        res.send(user);
       
    }else{
        const user= "invalid";
        res.send(user);
    }
});

router.get('/firstcheck',(req,res)=>{    
    if (req.isAuthenticated()){
        console.log('firstcheck pass')       
        res.sendStatus(200);       
    }else{
        console.log('firstcheck no pass')
        res.sendStatus(500);
    }
});
// need to change to accept the request body
router.post('/findsites',(req,res)=>{
    User.findOne({username:'yamil'},function(err,user){
        if(err){            
            res.sendStatus(500);
            res.end();
        }else{
            const userSites= user.userLogs;        
            res.send(userSites);
            res.end();
        }        
    });
});
//Adding a site location to the specific user completed/ Need to change so it accepts req.body information

router.post('/addsite',(req,res)=>{
    const location =  {
        site:'dxl66766',
        coords:{
            coordinates:{
                lat:32.4562,
                long:-96.4545
            }
        },
        hidden:false,
        bounce:false
    }
  
    User.findOne({username:'yamil'},function (err,user){
        if (user){
            
            const arr = user.userLogs
            const siteExist = arr.find(o=>{
                return o.site === location.site;
            })
            if (siteExist===undefined){
                user.userLogs.push(location);
                user.save();
            }
            res.end();
    }
    });
});


 
module.exports=router;