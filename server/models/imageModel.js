const mongoose = require('mongoose')


const imgSchema = new mongoose.Schema({
    name: String,
    image: String,
    cloudinary_id: String
})

module.exports = mongoose.model('Image', imgSchema)