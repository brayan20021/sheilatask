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

router.post('/fast-notes', fastnoteClass.showfastnote);

router.post('/fast-notes-description', fastnoteClass.show_description);

router.post('/add-fast-notes', fastnoteClass.post_addfastnote);

router.post('/edit-fast-notes', fastnoteClass.editfastnote);

//router.post('/edit-fast-notes', fastnoteClass.post_editfastnote);

router.post('/dashboard', fastnoteClass.dashboard);

module.exports = router;