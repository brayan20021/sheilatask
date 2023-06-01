const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// Global variables

app.use((req, res, next) => {

    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/links'))
app.use('/links',require('./routes/autentication'))

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting server   
app.listen(app.get('port'), () => {
    
    console.log(`Server on port ${app.get('port')}`);

})