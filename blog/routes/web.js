var home = require("../app/controllers/home");
var user = require("../app/controllers/user");


module.exports = function(app, passport) {
    
    app.group("/admin", (app) => {
        app.get('/*', (req, res, next) => {
            if(req.session.user) {
                res.locals.usernameGolbal = req.session.user;
            }
            next();
        });
        app.get("/home", isLoggedIn, home.home);
        app.get('/user',isLoggedIn,  user.index);

        // show the login form
        app.get('/login', home.login);

        // show update form
        app.get('/update', home.update);
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : 'admin/home', // redirect to the secure profile section
        failureRedirect : 'admin/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        res.redirect('admin/home');
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    // app.get('/signup', );

    // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/dashboard', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy(); // delete session in database
        res.redirect('admin/login');
    });
 };
 
// route middleware to make sure
function isLoggedIn(req, res, next) {
 
     // if user is authenticated in the session, carry on
     if (req.isAuthenticated()) {
         return next();
     }
 
     // if they aren't redirect them to the home page
     res.redirect('/admin/login');
}