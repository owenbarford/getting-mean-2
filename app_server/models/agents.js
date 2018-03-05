const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: String,
    products: [String],
    team: {
        type: String,
        required: true
    }
    
});
