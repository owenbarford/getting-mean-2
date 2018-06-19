const mongoose = require('mongoose');

const listAgentSchema = new mongoose.Schema({ 
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

mongoose.model('listAgents', listAgentSchema);
