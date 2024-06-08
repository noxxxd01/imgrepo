const imageModel = require('../models/imageModel')
const cloudinary = require('../utils/cloudinary')
const fs = require('fs')

// GET
const fetchImages = async (req, res) => {
    const images = await imageModel.find({}).exec()
    res.status(200).json(images)
}

// POST
const createImages = async (req, res) => {
    try {
        const {path} = req.file
        const result = await cloudinary.uploader.upload(path)
        const images = new imageModel({
            name: req.body.name, 
            image: result.secure_url,
            cloudinary_id: result.public_id 
        })
        await images.save()
        fs.unlinkSync(path)
        res.status(201).json(images);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error uploading image' });
    } 
}

// EDIT
const editImages = async (req, res) => {
    let image = await imageModel.findById(req.params.id).exec();
    const {path} = req.file;
    await cloudinary.uploader.destroy(image.cloudinary_id);
    let result;

    if(req.file){
        result  = await cloudinary.uploader.upload(path);
    }

    const data ={
        name: req.body.name || image.name,
        image: result?.secure_url || image.image,
        cloudinary_id: result?.public_id || image.cloudinary_id,
    }

    contact= await imageModel.findByIdAndUpdate(req.params.id, data, {new:true});
    if(req.file){
        fs.unlinkSync(req.file.path)
    }

    res.status(200).json(image)

}

// DELETE
const deleteImages = async (req, res) => {
    try {
        const image = await imageModel.findById(req.params.id).exec();
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        await cloudinary.uploader.destroy(image.cloudinary_id);
        await imageModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting image' });
    }
}

module.exports = {
    fetchImages,
    createImages,
    editImages,
    deleteImages
}