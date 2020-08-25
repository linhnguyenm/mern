const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type:String,
        required: false,
        trim: true,
        minlength: 6,
        
    }
},{
    timestamps: true
    
});
userSchema.pre("save",function(next){
    var user = this;
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) {
          return next(err); }
        user.password = hash;
        next();
      })
});
const User = mongoose.model('User',userSchema);

module.exports = User;