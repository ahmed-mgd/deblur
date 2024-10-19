const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const originalPath = req.file.path;
        // Process the image here (e.g., call your deblurring function)
        const deblurredPath = originalPath; // Replace with actual processing result

        // Save image details to MongoDB
        const image = new Image({ originalPath, deblurredPath });
        await image.save();

        res.status(200).json({ message: 'Image uploaded and processed!', image });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

module.exports = router;
