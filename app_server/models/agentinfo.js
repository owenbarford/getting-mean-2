const mongoose = require('mongoose');

const workingTimesSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    start: String,
    end: String,
    closed: {
        type: Boolean,
        required: true
    }
})

const agentInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    roleDesc: String,
    address: String,
    products: [String],
    team: String,
    workingTimes: [workingTimesSchema]
})