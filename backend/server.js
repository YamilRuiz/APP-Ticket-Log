require('dotenv').config()
const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const session= require('express-session');
const passport=require ('./passport/passportSetup');
const app = express();
const port = process.env.PORT || 5000;




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    session({
        secret: 'secret key',
        saveUninitialized: true,
        resave: true,
        cookie:{secure:false}
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  }));
app.use( (req, res, next) => {    
    return next();
  });
const uri =process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
connection= mongoose.connection;
connection.once('open', ()=>{
    console.log("****Connnection was Established*****")
})




const userRouter= require('./routes/users');
const logsRouter= require('./routes/logs');


app.use('/users',userRouter);
app.use('/logs',logsRouter);



app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})
