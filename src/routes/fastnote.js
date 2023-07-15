const express = require('express');
const router = express.Router();
const { isLoggetIn } = require('../lib/auth')

const fastnoteController = require('../controllers/fastnoteController');

const fastnoteClass = new fastnoteController();

router.get('/api/endpoint', (req, res) => {
    const responseData = { message: 'Respuesta desde node JSs' };

    // Envia la respuesta al cliente
    res.json(responseData);
})

router.get('/fast-notes', isLoggetIn, fastnoteClass.showfastnote);

router.get('/add-fast-notes', isLoggetIn, fastnoteClass.addfastnote);

router.post('/add-fast-notes', isLoggetIn, fastnoteClass.post_addfastnote);

module.exports = router;