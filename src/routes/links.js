const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

//Calling taskController class 
const taksClass = new tasksController();

const pool = require('../database')
const { isLoggetIn } = require('../lib/auth')


router.get('/dashboard', isLoggetIn, taksClass.dashboard);

router.get('/signature', isLoggetIn, taksClass.signature);

router.post('/add-signature', isLoggetIn, taksClass.post_addsignature);

router.post('/delete-signature', isLoggetIn, taksClass.post_deletesignature);

router.post('/update-signature', isLoggetIn, taksClass.post_updatesignature);

router.get('/add/:signatureid', isLoggetIn, taksClass.addnote);

router.post('/add/:signatureid', isLoggetIn, taksClass.post_addnote);

router.get('/signaturelist/:idsignature', isLoggetIn, taksClass.showsignature);

router.post('/signaturelist/task/delete/:id', isLoggetIn, taksClass.post_deletenote);

router.get('/signaturelist/task/edit/:id', isLoggetIn, taksClass.editnote);

router.post('/signaturelist/tasks/edit/:id', isLoggetIn, taksClass.post_editnote);

router.get('/task/finishtask/:id', isLoggetIn, taksClass.finishtask);

module.exports = router;