const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    phoneNum: {
        type: String,
        unique: true
    },
    availableAmount: {
        type: Number,
        default: 0
    }
});

mongoose.model('UserModel', userSchema)