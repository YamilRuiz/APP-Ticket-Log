const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const logSchema= new Schema({

    tech:{
        type:String,
        required:true
    },
    site:{
        type:Number,
        required: true,
        trim: true,
        minlength:6
    },
    ticket:{
        type:String,
        reuired:true,
        minlength:14
    },
    coords:{
        coordinates:{
            lat:{type:Number,
                required:true
            },
            long:{type:Number,
                required:true
            }
        } 
    },
    hidden:{
        type:Boolean
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)

const Log = new mongoose.model('Log',logSchema);

module.exports= Log;