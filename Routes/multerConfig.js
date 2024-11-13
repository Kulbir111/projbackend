const multer = require('multer');

let mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads"); // Set the destination for file uploads
    },
    filename: (req, file, cb) => {
        var picname = Date.now() + file.originalname; // Add milliseconds to the file name
        cb(null, picname);
    }
});

const upload = multer({ storage: mystorage });

module.exports = upload;