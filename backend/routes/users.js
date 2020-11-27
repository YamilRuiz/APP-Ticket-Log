const router = require('express').Router();
let User = require('../models/user.model');
const passport= require('../passport/passportSetup');

router.route('/').get((req,res)=>{
    res.json("you are golden");
});

router.route('/register').post((req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    User.findOne({ username : username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return done(err);

        // check to see if theres already a user with that email
        if (user) {
            return done(null, false);
        } else {

            // if there is no user with that email
            // create the user
            var newUser= new User();

            // set the user's local credentials
            newUser.username    = username;
            newUser.password = password;

            // save the user
            newUser.save(function(err, savedUser) {
                if (err)                    
                    return res.json(err)
                    res.json(savedUser)
            });
        }

    });
    
});

router.post(
    '/login',
    function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        req.session.save()        
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo)        
    }
)

router.get('/check',(req,res)=>{
    
    if (req.isAuthenticated()){       
        res.send(req.user.username)
       
    }else{
        console.log("Not Authorized")
        const user= "invalid";
        res.send(user)
    }
});

router.get('/firstcheck',(req,res)=>{    
    if (req.isAuthenticated()){       
        res.sendStatus(200)       
    }else{
        console.log("Not Authorized")        
        res.sendStatus(500)
    }
});

router.post('/find',(req,res)=>{


    // Fisrt step in creation of relationship for logs
    User.findOne({username:'manin'}, '_id',function (err,user){
        if (err){
            console.log(err)
        }else{
            res.send(user)
        }
    })
    

})



module.exports=router;