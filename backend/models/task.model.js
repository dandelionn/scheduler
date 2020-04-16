const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: String, required: true },
    tag: { type: String , required: true },
    description: { type: String },
    resources: [{type: String}]
});

const Task = mongoose.model('Task', schema);

module.exports = Task;