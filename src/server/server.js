var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hbs=require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('express-flash-messages')
var session = require('express-session');

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
app.use(expressValidator());
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

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
	req.flash('notify', 'This is a test notification.')
    res.render('home');

})

app.get('/registrarse',(req,res)=>{
    
    res.render('registrarse');

})

app.get('/users/login',(req,res)=>{
    
    res.render('login');

})

app.post('/registrarse',(req,res)=>{
    
    var address=req.body.address;
    var cellphone=req.body.cellphone;
    var DPI=req.body.DPI;
    var email=req.body.email;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var phone=req.body.phone;
    var psw=req.body.psw;
    var rpsw=req.body.rpsw;
    var uname=req.body.uname;
    

	// Validation
	req.checkBody('address', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('uname', 'Username is required').notEmpty();
	req.checkBody('psw', 'Password is required').notEmpty();
	req.checkBody('rpsw', 'Passwords do not match').equals(req.body.psw);

	var errors = req.validationErrors();

	if (errors) {
		res.render('registrarse', {
			errors: errors
        });
        console.log(errors);
    }
    else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + uname + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('registrarse', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						username:	uname,
                        password:	psw,
                        fisrtname: 	fname,
                        lastname:	lname,
                        address1:	address,
                        phone:	phone,
                        cellphone: 	cellphone,
                        DPI:	DPI,
                        email:	email

					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/users/login');
				}
			});
		});
    }

})

// Set Port
app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});