const express = require('express');
const { fetchImages, createImages, editImages, deleteImages } = require('../controllers/controls');
const upload = require('../middleware/multer'); // Correct path to multer middleware

const router = express.Router();

router.get('/', fetchImages);
router.post('/upload', upload.single('image'), createImages);
router.put('/:id', upload.single('image'), editImages);
router.delete('/:id', deleteImages); 

module.exports = router;
