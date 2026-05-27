const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId && !this.githubId;
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isTwoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: String,
    googleId: String,
    githubId: String
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;