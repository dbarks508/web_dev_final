const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    }
});


//function after doc saved
userSchema.post('save', function (doc, next) {
    console.log('new user created');
    next();
})

userSchema.pre('save', function (next) {

    next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;