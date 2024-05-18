const UserController = require("../controllers/user-controller")
const express = require("express")
const fs=require('fs')
const router = express.Router()

// File: user-upload-config.js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const uploadsDir = path.join(__dirname, '../user_images');  

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
        });
    }
});

const userUpload = multer({ storage: userStorage });



// NOTE: creating a general user is done by the auth-router's register function. Note
// that creating other things (such as equipment) is not

// update user route
router.put('/:id', UserController.updateUser)

router.put(`/notification/:id`, UserController.updateNotification)

router.post(`/get-notifications/:id`, UserController.getNotifications)

// send notification
router.post(`/notification/:id`, UserController.postNotification)

// get user route
router.post('/:id', UserController.getUser)

// get all users route
router.post('/', UserController.getAllUsers)

//  delete user route
router.delete('/:id', UserController.deleteUser)

//  delete notification route
router.delete('/notification/:id', UserController.deleteNotification)
// In user-routes.js
router.post('/:id/upload-image', userUpload.single('image'), UserController.uploadUserImage);


// other routes if needed ANTEN ??

module.exports = router