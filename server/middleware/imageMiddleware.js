import multer from 'multer';
import path from 'path';
import fs from 'fs';
import base64Img from 'base64-img';

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Create a multer instance
const upload = multer({ storage: storage });

// Middleware to handle multiple files
export const uploadMultiple = upload.array('images');

// Middleware to encode images to Base64
export const encodeImagesToBase64 = (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next(new Error('No files uploaded!'));
       // return next();
    }

    const encodedImages = [];
    let processedFiles = 0;

    req.files.forEach(file => {
        base64Img.base64(file.path, (err, data) => {
            if (err) {
                return next(err);
            }
            encodedImages.push(data);
            fs.unlinkSync(file.path); // Delete file after encoding

            processedFiles++;
            if (processedFiles === req.files.length) {
                req.imagesBase64 = encodedImages;
                next();
            }
        });
    });
};
