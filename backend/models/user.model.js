const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const bcrypt = require('bcrypt');


const siteSchema= new Schema({   
    site:{
        type:String,
        required: true,
        trim: true,
        minlength:5
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
    bounce:{
        type:Boolean
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
	userLogs:[siteSchema]
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
		console.log(' =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('Password Hash');
        
		this.password = this.hashPassword(this.password)
		next()
	}
})
const User= new mongoose.model('User',userSchema);
const SiteLog = new mongoose.model('SiteLog',siteSchema)

module.exports=User,SiteLog;
