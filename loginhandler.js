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

var con = mysql.createConnection({
    host: mysql_Login.host,
    user: mysql_Login.user,
    password: mysql_Login.password,
    database: mysql_Login.database,

    connectionLimit: 2, // Default value is 10.
    waitForConnections: true, // Default value.
    queueLimit: 0
});

var options = {
    host: mysql_Login.host,
    port: mysql_Login.port,
    user: mysql_Login.user,
    password: mysql_Login.password,
    database: mysql_Login.database
};

var sessionStore = new MySQLStore(options);

app.use(cookieParser());
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


module.exports =

    //Listens for a form input by a post request. 
    app.post('/processinglogin', (request, response, next) => {

        //These variables are set to the strings retrieved from the form and parsed by "Body-Parser" so that it's readable as an object.
        var email = request.body.email;
        var password = request.body.password;

        /*con as seen below is a variable set to a function with query defining its method. This specific 
        function is about retrieving data from a MYSQL database and comparing it the inbound data.*/
        con.query('SELECT * FROM userlogin WHERE email = ?', [email], function (err, result, fields) {

            /*If the email entered in the form does not return a row where the email matches the one entered in 
            the form then an error will occur. */
            if (err) {
                /*Here, a message is logged to the console with the error info attatched which helps the developer
                to recognize what could be the issue. */
                console.log('An error occured' + err);

                /*In this istance where the query failed, an error message is also sent out to the client 
                so that they could contact the developer about the issue or even find out on their own.*/
                response.send({
                    "code": 400,
                    "failed": "error occured"
                });
            }

            /*Otherwise, if the email does return a row with matching email then the process proceeds to stage 2.
            Verifying the password.*/
            else {

                /*The first step is to see if there is actually a password to verify and so the loginHandler 
                checks the length of the password and as long as the password is longer than zero caracters then  
                the process will move on. */
                if (result.length > 0) {

                    /*In this if statement the server checks if the password from the form data is the same
                    as the password from the database query. */
                    if (result[0].password == password) 
                    {
                        /*Here the event is logged to the console saying that a user successfully logged in. 
                        As a common good practice i've chosen to include the date and time of the event so that
                        any bug error or other abnormality can be logged and analysed.*/
                        var rightnow = new Date();
                        console.log(colors.yellow(email) + ' logged in!\n' + colors.green(`At:   ${rightnow}` + '\n'));

                        var user_id = result[0].id;

                        //_______COOKIE_DISPENSER________

                        /*Using the express-session the server takes the request and applies a method from the
                        express-session module in order to create a session.
                        I then redirects the client to a new page. */
                        request.login(user_id, function (err) {
                            response.redirect('/threadbrowser');
                        })

                        //_______________________________


                    }
                    else //If not then this runs instead
                    {
                        response.send('You have entered the wrong password or email')
                    }
                }


            }

        })
    })

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});
