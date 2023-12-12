const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage})


// Serve static files from the 'public' directory
app.use(express.static('public'));
// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Check if a file has been uploaded
  if (!req.file) {
    // No file has been selected
    return res.status(400).json({ error: 'No file selected!' });
  }

  // File has been uploaded successfully
  res.json({ message: 'File uploaded successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
