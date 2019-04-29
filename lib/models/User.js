const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    twitterHandle: {
        type: String,
        unique: true
    },
    passwordHash: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.passwordHash;
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

