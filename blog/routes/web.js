var home = require("../app/controllers/home");



module.exports = function(app, passport) {

  
         // =====================================
         // HOME PAGE (with login links) ========
         // =====================================
         app.get('/', home.home);
 
         // =====================================
         // LOGIN ===============================
         // =====================================
         // show the login form
         app.get('/login', passport.authenticate('local-login', 
                { successRedirect: '/',
                  failureRedirect: '/login' 
         }));
 
         // =====================================
         // SIGNUP ==============================
         // =====================================
         // show the signup form
         //app.get('/signup', );
 
         // process the signup form
         app.post('/signup', passport.authenticate('local-signup', {
             successRedirect : '/dashboard', // redirect to the secure profile section
             failureRedirect : '/signup', // redirect back to the signup page if there is an error
             failureFlash : true // allow flash messages
         }));
 
         // =====================================
         // DASHBOARD SECTION =========================
         // =====================================
         // we will want this protected so you have to be logged in to visit
         // we will use route middleware to verify this (the isLoggedIn function)
         //app.get('/dashboard', isLoggedIn, dashboard.index);
 
 
         // =====================================
         // LOGOUT ==============================
         // =====================================
         app.get('/logout', function(req, res) {
             req.logout();
             req.session.destroy(); // delete session in database
             res.redirect('/');
         });
 
  
 
 
 };
 
 // route middleware to make sure
 function isLoggedIn(req, res, next) {
 
     // if user is authenticated in the session, carry on
     if (req.isAuthenticated()) {
         return next();
     }
 
     // if they aren't redirect them to the home page
     res.redirect('/');
 }