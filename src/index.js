const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');
const passport = require("passport")


//inicializations

const app = express();


//setting 
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //Determina la extension de mis archivos.
    helpers: require('./lib/handlebars')
})); 
app.set('view engine', '.hbs');

//Middleware
app.use(session({

    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)

}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables

app.use((req, res, next) => {

    app.locals.success = req.flash('success');
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/links'))
app.use('/',require('./routes/autentication'))

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting server   
app.listen(app.get('port'), () => {
    
    console.log(`Server on port ${app.get('port')}`);

})