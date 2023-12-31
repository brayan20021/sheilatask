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

router.put('/update-fast-notes', fastnoteClass.updatefastnote);

router.post('/delete-fast-notes', fastnoteClass.deletefastnote);

router.post('/dashboard', fastnoteClass.dashboard);

router.post('/deleted-notes', fastnoteClass.deleted_notes);

router.post('/update-theme', fastnoteClass.change_theme);

router.post('/restore-note', fastnoteClass.restore_note);

router.post('/empty-trash', fastnoteClass.removed_complete);

module.exports = router;