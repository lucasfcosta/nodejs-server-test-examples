const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dogs: { type: Number, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
