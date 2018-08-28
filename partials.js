module.exports = {
    head: `<head><title>Welcome!</title><meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0'><link rel='icon' href='./imgs/HTML5_Logo_512.png'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' integrity='sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M' crossorigin='anonymous'><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script><link type='text/css' rel='stylesheet' href='./css/froala_blocks.css'></head>`,
    loggedinHeader: `<header><div class="container"><nav class="navbar navbar-expand-md"><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNav1"><ul class="navbar-nav mr-auto"><li class="nav-item active"><a class="nav-link" href="/threadbrowser">Home <span class="sr-only">(current)</span></a></li><li class="nav-item"><a class="nav-link" href="/threadform">New Thread</a></li><li class="nav-item"><a class="nav-link" href="https://www.froala.com">Features</a></li><li class="nav-item"><a class="nav-link" href="https://www.froala.com">Pricing</a></li><li class="nav-item"><a class="nav-link" href="https://www.froala.com">Team</a></li></ul><h2 id="profile"></h2> </div> </nav> </div> </header>`, 
            // Needs to be supplimented by the following script
               // var profile = document.getElementById('profile'); profile.value = '${email}';
    unloggedHeader: `<header> <div class="container"> <nav class="navbar navbar-expand-md"> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav1"> <ul class="navbar-nav mr-auto"> <li class="nav-item active"> <a class="nav-link" href="https://www.froala.com">Home <span class="sr-only">(current)</span></a> </li> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com">Features</a> </li> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com">Pricing</a> </li> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com">Team</a> </li> </ul> <ul class="navbar-nav justify-content-end d-none d-lg-flex ml-md-auto"> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com"><i class="fa fa-slack"></i></a> </li> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com"><i class="fa fa-twitter"></i></a> </li> <li class="nav-item"> <a class="nav-link" href="https://www.froala.com"><i class="fa fa-github"></i></a> </li> </ul> <a class="btn btn-empty ml-md-3" href="/login.html">Login</a> <a class="btn btn-empty ml-md-3" href="/register.html">Register</a> </div> </nav> </div> </header> <h1>Thread Browser</h1>`,
    formThread: `<section class="fdb-block"> <div class="container"> <div class="row justify-content-center"> <div class="col-12 col-md-8 col-lg-7 col-md-5 text-center"> <div class="fdb-box fdb-touch"> <div class="row"> <div class="col"> <h1>Register!</h1> </div> </div> <form action="/newthread" method="POST"> <div class="row mt-4"> <div class="col"> <input type="text" class="form-control" placeholder="Thread Name" name="name"> </div> </div> <div class="row mt-4"> <div class="col"> <textarea name="description" placeholder="Please enter your description..." class"form-control"></textarea> </div> </div> <div class="row mt-4"> <div class="col"> <input class="btn" type="submit"></input> </div> </div> </form> </div> </div> </div> </div> </section>`,
    threadlistBegin: `<section class="fdb-block"><div class="container"><div class="row pt-4">`,
    threadlistEnd: `</div</div></section>`,
    currentThread: `<section class="fdb-block"> <div class="container"> <div class="row"> <div class="col text-left"> <h2 id="threader"></h2> <p id="thredDesc"></p> </div> </div> </div> </section>`
}