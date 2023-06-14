const express = require('express');
const passport = require('passport');
const router = express.Router();
require('../lib/passport')
const { isLoggetIn, isNotLoggetIn } = require('../lib/auth');

router.get('/signup',  (req, res) => {

    //res.send("Estoy aqui")
    res.render('./auth/signup');
});


router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
        
}));

router.get('/signin', (req, res) => {
    
    res.render('./auth/signin');

});

router.post('/signin', (req, res, next) => {
    
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggetIn, (req, res) => {

    res.render('partials/profile');
});

router.get('/logout', isLoggetIn, (req, res) => {

    req.logOut(function (err){
        if(err){
            res.send("Se ha producido un error")
        } else {
            res.redirect('/signin'); 
        }
    });
 
    

})

module.exports = router;