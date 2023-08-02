const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

//Calling taskController class 
const taksClass = new tasksController();

const pool = require('../database')
const { isLoggetIn } = require('../lib/auth')

router.post('/signature', taksClass.signature);

router.post('/add-signature', taksClass.post_addsignature);

router.post('/delete-signature', taksClass.post_deletesignature);

router.post('/update-signature', taksClass.post_updatesignature);

router.post('/edit-signature-tasks', taksClass.editsignature);

router.put('/update-signature-tasks', taksClass.updatesignature);

router.post('/signaturelist', taksClass.showsignature);

router.post('/signaturelist-text', taksClass.showTextsignature);

router.post('/add-signature-note', taksClass.post_signatureNote);

module.exports = router;