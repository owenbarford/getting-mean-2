const mongoose = require('mongoose');

const policiesSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        index: {unique: true}
    },
    createdBy: {
        type: String,
        required: true
    },
    policyText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        'default': Date.now        
    },
});

mongoose.model('Policy', policiesSchema);