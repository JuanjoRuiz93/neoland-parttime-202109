const { Schema } = require('mongoose')

const user = new Schema ({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    }
})

module.exports = user