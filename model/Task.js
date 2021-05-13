const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: String,
    body: String,
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Task = mongoose.model('Task', TaskSchema);