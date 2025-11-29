console.log("ROUTE FILE IS LOADING...");


// routes/docRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const docController = require('../controllers/docController');

// --- MULTER SETUP ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// --- THE ROUTES ---

// 1. Upload & Issue (Write to Blockchain)
router.post('/upload', upload.single('certificate'), docController.uploadDocument);

// 2. Verify (Read from Blockchain)
router.post('/verify', upload.single('certificate'), docController.verifyDocument);

router.get('/student/:address', docController.fetchStudent);

module.exports = router;