const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require('../database');

const helpers = require('../lib/helpers');

 passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true  
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    console.log(rows)
    console.log(req.body);
    if(rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.mathPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success', 'Bienvenido!', + user.username));
        } else {
            done(null, false, req.flash('message','Contraseña incorrecta'));
        }
    } else {
        done(null, false, req.flash('message','El usuario no existe'))
    }
})); 

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, async(req, username, password, done) => {
        const {fullname, email} = req.body;
        console.log(req.body)
        const design_note = "#190c5c";
        const newUser = {
            username,
            password,
            fullname,
            email,
            design_note
        }
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query('INSERT INTO users SET ?', [newUser])
        newUser.id = result.insertId;
        return done(null, newUser); 
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
        const rows = await pool.query('SELECT * FROM users where id = ?', [id]);
        done(null, rows[0]);
});