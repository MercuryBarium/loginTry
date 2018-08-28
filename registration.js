const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const colors = require('colors');
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

module.exports =

    //Just like the login process this one also uses the POST method to listen for form data.
    app.post('/registerprocess', (request, response, next) => {

        var today = new Date();

        //This is the form data retrieved from the post address!
        var users = {
            "first_name": request.body.first_name,
            "last_name": request.body.last_name,
            "email": request.body.email,
            "password": request.body.password,
            "created": today,
            "modified": today
        }

        /*Here, an SQL query is initialized in order to attempt to inject the data onto 
        the database. */
        con.query('INSERT INTO userlogin SET ?', users, function (error, results, fields) {

            /*If something goes wrong with the connection or the query then the error logged in the
            console as well as scent to the client for them to study as well. */
            if (error) {
                console.log('Error occured ', colors.red(error));
                response.send({
                    "code": 400,
                    "failed": "error occured"
                })
            }

            /*If all goes smoothly however, then the result will be logged to the console 
            saying that the following user has been registered. The same will be sent to the client. */
            else {
                console.log('User register:   ', colors.green(users));
                

                response.redirect('/login.html')

            }
        })
    });