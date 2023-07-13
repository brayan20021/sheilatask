const express = require('express');
const router = express.Router();
const { isLoggetIn } = require('../lib/auth')

const fastnoteController = require('../controllers/fastnoteController');

const fastnoteClass = new fastnoteController();


router.get('/fast-notes', isLoggetIn, fastnoteClass.showfastnote);

router.get('/add-fast-notes', isLoggetIn, fastnoteClass.addfastnote);

router.post('/add-fast-notes', isLoggetIn, fastnoteClass.post_addfastnote);

module.exports = router;