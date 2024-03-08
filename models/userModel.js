const mongoose = require('mongoose');
const validator = require('validator');

const crypto = require('crypto');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please tell us your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid mail'],
        lowercase: true,
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    passwordChangedAt: Date,
    target: {
        type: Object,
        default: { cals: 0, protein: 0, fats: 0 }
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        minlength: 8,
        select: false
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please tell us your password'],
    //     validate: {
    //         //This only works with Save!! not on update
    //         validator: function (el) {
    //             return el === this.password;
    //         },
    //         message: "Password are not same"
    //     }
    // },
    passwordResetToken: String,
    passwordResetExpires: Date,
    meals: {
        type: [Number],
        default: []
    },
    liked: {
        type: [Number],
        default: []
    },
    picturePath: String


});
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})
userSchema.pre('save', async function (next) {

    if (!this.isModified('password') || this.isNew) {
        return next();
    }
    this.passwordChangedAt = Date.now() - 1000;
    this.passwordConfirm = undefined;
    next();
})



userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimeStamp < changedTimeStamp; //password is changed
    }
    //False means password not changed 
    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    let resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;