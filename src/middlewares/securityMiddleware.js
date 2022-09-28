function ValidateLogin(req,res,next) {
    
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }

};



module.exports = ValidateLogin;