//________MODULES_______
const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MySQLStore = require('express-mysql-session');
const mysql_Login = require('./MysqlLogin');

//__________CONFIGURATION________



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var con = mysql.createConnection({
    host: mysql_Login.host,
    user: mysql_Login.user,
    password: mysql_Login.password,
    database: mysql_Login.database,

    connectionLimit: 2, // Default value is 10.
    waitForConnections: true, // Default value.
    queueLimit: 0
});




app.use(cookieParser());

var options = {
    host: mysql_Login.host,
    port: mysql_Login.port,
    user: mysql_Login.user,
    password: mysql_Login.password,
    database: mysql_Login.database
};

var sessionStore = new MySQLStore(options);

app.use(session(
    {
        secret: 'XRNXwKNjbShIe7QrMZ8cpujbjAZaHspChNOVTlwL',
        resave: false,
        store: sessionStore,
        saveUninitialized: true,
        cookie: {
            //    secure: true 
        }
    }));

//___PASSPORT_INITIALIZED___
app.use(passport.initialize());
app.use(passport.session());

//_______________________________


//_____EXTERNAL_MIDDLEWARE_______
const loginH = require('./loginhandler');
const registration = require('./registration');
const routingJS = require('./router');
const partials = require('./partials');
//_______________________________


//LOGIN_HANDLER
app.use(loginH);
//_______________________________

//REGISTRATION
app.use(registration);
//_______________________________

//ROUTING
app.use(routingJS);
//_______________________________


app.listen(8080);



