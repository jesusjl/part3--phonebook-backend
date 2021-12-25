const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config()

const url = process.env.URL

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")  
    })
    .catch(errir => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    number : {
        type: String,
        minlength: 8,
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)