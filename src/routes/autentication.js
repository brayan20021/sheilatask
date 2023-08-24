const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../lib/passport')
const { isLoggetIn, isNotLoggetIn, generateToken } = require('../lib/auth');


router.post('/signup', (req, res, next) => {

    try {

        passport.authenticate('local.signup', (err, user, info) => {

            if (err) {
                const confimationCode = 1001;
               return res.status(500).json(confimationCode)
            }

            if (!user) {

                const confimationCode = 1001;
               return res.status(500).json(confimationCode)
            }
            
            // Autenticación exitosa
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error en la autenticación" });
                }
                const token = generateToken(); // Genera el token

                const userData = {
                    id: user.id,
                    user: user.email,
                    fullname: user.fullname,
                    design_note: user.design_note
                };

                //console.log(userData)
                const confirmationData = 1048;
                return res.status(200).json({ confirmationData, token, userData });

            });

        })(req, res, next)

    } catch (error) {

        console.log(error);

    }

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
            fullname: user.fullname,
            design_note: user.design_note
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