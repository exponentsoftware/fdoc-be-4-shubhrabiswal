const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const auth = require('./auth')

router.post('/signup',usercontroller.adduser)
router.get('/:id',auth.required, usercontroller.getalltodo);
router.post('/signin',usercontroller.signin)

module.exports = router;