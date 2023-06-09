const express = require('express');
const path = require('path')
const post = require('../controllers/post')

const router = express.Router();

router.post('/post', post.post); 

module.exports = router;