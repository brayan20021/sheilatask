const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../lib/passport')
const { isLoggetIn, isNotLoggetIn, generateToken } = require('../lib/auth');

router.get('/signup', (req, res) => {

    res.render('./auth/signup');

});


router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true

}));

router.get('/signin', (req, res) => {

    res.render('./auth/signin');

    /*     if(isLoggetIn){
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
        res.status(200).json({ success: true, message: 'Sus credenciales son invalidas' });
        } */

});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en la autenticación' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Autenticación exitosa
        const token = generateToken(); // Genera el token

        const userData = {
            id: user.id,
            user: user.username,
            fullname: user.fullname
        };

        return res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token, userData });
    })(req, res, next);

});






router.get('/profile', isLoggetIn, (req, res) => {

    res.render('partials/profile');

});

router.get('/logout', isLoggetIn, (req, res) => {

    req.logOut(function (err) {
        if (err) {
            res.send("Se ha producido un error")
        } else {
            res.redirect('/signin');
        }
    });

})

module.exports = router;