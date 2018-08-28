
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
const partials = require('./partials');

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


function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`\nreq.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login.html');

    }
}

module.exports =


app.get('/threadbrowser', authenticationMiddleware(), function (req, res) {
    var sessionuser = req.session.passport.user;
    console.log('\n' + sessionuser);

    res.write(partials.head);


    if (req.session.passport.user) {
        con.query('SELECT email FROM userlogin WHERE id = ?', [req.session.passport.user], function (err, result, fields) {
            var email = result[0].email;


            res.write(partials.loggedinHeader);
            res.write(`<script>$('#profile').text('${email}');</script>`);

            con.query('SELECT * FROM threads ORDER BY created', function (err, result, fields) {
                res.write(partials.threadlistBegin);
                for (var i = 0; i < result.length; i++) {
                    res.write(`
                    <div class="col-6 col-md-3 mt-4 mt-md-0">
                    <a href="thread?threadName=${result[i].Name}">
                    <h3><strong>${result[i].Name}</strong></h3>
                    <p>${result[i].Description}</p>
                    \n
                    <h5><i>${result[i].created}</i></h5>
                    </a>
                    </div>
                    `);
                }
                res.write(partials.threadlistEnd);
                res.end();
            })

        });




    }
})




/*This part is about providing a form for the user to be able to create a new thread. */
app.get('/threadform', authenticationMiddleware(), function (req, res, next) {

    /*First, the server does a little bit of identification of the user by looking at the session 
    cookie and comparing it to the database. */
    con.query('SELECT email FROM userlogin WHERE id = ?', [req.session.passport.user], function (err, result, fields) {
        var email = result[0].email;

        /*See the partials middleware for explanation of the next 4 lines. */
        res.write(partials.head);
        res.write(partials.loggedinHeader);
        res.write(`<script>$('#profile').text('${email}');</script>`);
        res.write(`<section class="fdb-block"> <div class="container"> <div class="row justify-content-center"> <div class="col-12 col-md-8 col-lg-7 col-md-5 text-center"> <div class="fdb-box fdb-touch"> <div class="row"> <div class="col"> <h1>Register!</h1> </div> </div> <form action="/newthread" method="POST"> <div class="row mt-4"> <div class="col"> <input type="text" class="form-control" placeholder="Thread Name" name="name"> </div> </div> <div class="row mt-4"> <div class="col"> <textarea name="description" placeholder="Please enter your description..." class"form-control"></textarea> </div> </div> <input type="hidden" name="email" value="${email}"> <div class="row mt-4"> <div class="col"> <input class="btn" type="submit"></input> </div> </div> </form> </div> </div> </div> </div> </section>`);

        /*At this point I recognized that the server would be significantly less strained 
        if I signalized an end to responses */
        res.end();
    });


})

/*Yet another POST listener is added to the server process that listens for inbound 
requests for creating new threads. */
app.post('/newthread', authenticationMiddleware(), (req, res, next) => {

    var today = new Date();

    /*As usual the event is logged to the console with specific client and timestamp. */
    console.log('\nUser-ID ' + colors.yellow(req.session.passport.user) + ' has sent in a thread-form! \n' + colors.green(today));
    if (req.body.name && req.body.description) {

        /*To make it easier to work with and do MYSQL queries I made the form data into an 
        object so that I could just inject the entire thing in one query. */
        var newThread = {
            "authorEmail": req.body.email,
            "authorID": req.session.passport.user,
            "Name": req.body.name,
            "Description": req.body.description,
            "created": today
        };

        /*Now finally the data is parsed from a JSON format and sent in to the database by means 
        of SQL query! */
        con.query('INSERT INTO threads SET ?', newThread, function (err, result, field) {

            /*As usual if there an error it needs to be reported  it this as ususal by logging the error 
            message to the console and redirecting the user back to the form page.*/
            if (err) {

                /*The first two console.log reports a failure, the first one basically just says that it failed 
                and when it failed and the other console.log displays the error message.*/
                console.log(colors.red('\nIt failed:     ' + today));
                console.log(err);

                //This just redirects the user back to the form page.
                res.redirect('/threadform');

            } else {

                /*This next console.log reports back to the console that a new thread has been successfully 
                created. I used a module called colors to make the logs more colorful and highlighting the detailes.*/
                console.log('\n' + colors.green(req.session.passport.user) + ' Made a new Thread!' + colors.yellow(today));



                res.redirect(`/thread?threadName=` + newThread.Name);
                res.end();


            }
        })
    } else {
        res.redirect('/threadform');

    }

})

app.get('/thread', authenticationMiddleware(), function (req, res, next) {
    con.query('SELECT * FROM userlogin WHERE id = ?', [req.session.passport.user], function (err, result, fields) {
        var email = result[0].email;
        res.write(partials.head);
        res.write(partials.loggedinHeader);
        res.write(`<script>$('#profile').text('${email}');</script>`);


        var visitor = req.session.passport.user;
        var thread_ID = req.query.threadName;
        var rightNow = new Date();

        


        console.log(`\nUser: ${colors.yellow(visitor)} visited forum thread: ${colors.blue(thread_ID)} at ${colors.green(rightNow)}`);

        con.query('SELECT * FROM threads WHERE Name = ?', thread_ID, function (err, result, fields) {
            var authorID = result[0].authorID;



            res.write(`<section class="fdb-block"> <div class="container"> <div class="row"> <div class="col text-left"><strong><h3>${result[0].authorEmail}</h3></strong> <h2>${result[0].Name}</h2> <p>${result[0].Description}</p>`);
            res.write(`<fieldset><form action="/threadment" method="POST"><textarea name="comment" placeholder="Please enter your text here!..." class "form-control"></textarea><input type="hidden" name="threadName" value="${thread_ID}"><input class="btn" type="submit"></input><input type="hidden" name="email" value="${email}"></form>`)
            
            
            
            
                res.write('<ul class="list-group">')

                con.query(`SELECT * FROM comments WHERE threadName = '${thread_ID}' ORDER BY created`, function(err, result, fields) {
                    
                    if(err){
                        console.log('\n' + err);
                        res.write('<h1>404 content not available</h1>')
                    } else {
                       for (var i = 0; i < result.length; i++) {
                            res.write(`<li class="list-group-item"><h3>${result[i].commentEmail}</h3><p>${result[i].text}</p></li>`)
                        }
                    }
                });

                res.write(`</ul></div> </div> </div> </section>`)
            
            res.end();





        })
    })



})

app.post('/threadment', authenticationMiddleware(), (req, res, next) => {
    
    var today = new Date();
    var commentinfo = {
        "threadName": req.body.threadName,
        "commentEmail": req.body.email,
        "authorID": req.session.passport.user,
        "text": req.body.comment,
        "created": today
    }

    con.query('INSERT INTO comments SET ?', commentinfo, function(err, result, fields) {
        if(err) {
            console.log('\n' + err);
            res.write(err);
        } else {

            res.redirect(`/thread?threadName=${commentinfo.threadName}`);
            
        }
    })
    
});