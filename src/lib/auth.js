module.exports = {
    
    isLoggetIn(req, res, next){

        if(req.isAuthenticated()){
            return next();
        } else {
            return res.redirect('/signin');
        }

    },

    isNotLoggetIn(req, res, next){
        if(!req.isAuthenticated){
            return next()
        } else {
            return res.redirect('/profile');
        }
    }
}