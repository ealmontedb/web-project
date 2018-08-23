var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hbs=require('express-handlebars');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp');
// mongoose.set('bufferCommands', false);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log ("we are connected!");
});



var User = require('./models/user');



// Init App
var app = express();


//view engine
app.engine('hbs',hbs({extname: 'hbs',defaultLayout: 'main'}));
app.set('view engine', 'hbs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/',(req,res)=>{

    res.send('si');

})


app.get('/login',(req,res)=>{

    res.render('home');

})

app.get('/registrarse',(req,res)=>{
    
    res.render('registrarse');

})


// Set Port
app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});