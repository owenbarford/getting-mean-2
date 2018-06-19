const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    userName: {
        type: String,
        required: true,
        index: {unique: true}
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true     
    },
    token: {
        type: String
    }
});

mongoose.model('User', userSchema);
