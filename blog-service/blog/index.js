const express = require('express');
const router = express.Router();

const blog = require('./api/blog');

// API related to core business logics
router.use('/api/v1', blog);

module.exports = router;