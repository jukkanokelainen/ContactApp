const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'users'//<-- name of the collection. if collection name not given the name
        //of the schme object is automatically pluraliced. that is by user scema -> collection name is users.
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false
    },
    type: {
        type: String,
        default: 'Professional'
    }
})

module.exports = mongoose.model('contact', ContactSchema);