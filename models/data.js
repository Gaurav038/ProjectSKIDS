const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('datas', dataSchema)