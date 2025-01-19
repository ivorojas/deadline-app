const express = require('express');
const router = express.Router();
//const axios = require('axios');
const {
    register,
    usersdata
} = require("../controllers/controllers.js");




router.post('/register', register)

router.get('/usersdata/:firebaseUid', usersdata);
//router.get('/usersdata', usersdata)


/*
router.get('/dogs', getDogsToRouter)
*/
module.exports = router;