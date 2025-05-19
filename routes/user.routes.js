const express = require('express');
const router = express.Router();
const {registerAdmin,loginAdmin}=require('../controllers/Admin.controllers')
const { registerUser, loginUser ,chat} = require('../controllers/user.controllers');
const upload=require('../utils/multer')

router.post('/register',upload.single('photo'), registerUser);
router.post('/Adminregister',upload.single('photo'), registerAdmin);
router.post('/login', loginUser);
router.post('/Adminlogin', loginAdmin);
router.get('/message', chat);

module.exports = router;
