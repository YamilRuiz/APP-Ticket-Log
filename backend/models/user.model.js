const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const bcrypt = require('bcrypt');


const logSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId, ref: 'User'
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
);



const userSchema= new Schema({
	
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    sites:[],
	userLogs:[logSchema]
},{
    timestamps:true
});

userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})
const User= new mongoose.model('User',userSchema);
const UserLog = new mongoose.model('UserLog',logSchema)

module.exports=User,UserLog;
