const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');

// GET /api/user/profile — protected
router.get('/profile', verifyToken, getProfile);

module.exports = router;
