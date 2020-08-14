const users = require('../users/userDb');

function checkUserId(){
    return(req, res, next) => {
        users.getById(req.params.id)
            .then((user) => {
                if(user){
                    req.user = user;
                    next();
                } else {
                    res.status(400).json({
                        message: "invalid user id"                    })
                }
            })
            .catch(next)
        }
};

function checkUserData(){
    return(req, res, next) => {
        if(Object.keys(req.body).length === 0 ){
            return res.status(400).json({
                message: "missing user data" 
            })
        } else 
        if(!req.body.name){
            return res.status(400).json({
                message: "missing required name field"
            })
        }
        next();
    }
};

function checkPostData(){
    return(req, res, next) => {
        if(Object.keys(req.body).length === 0 ){
            return res.status(400).json({
                message: "missing post data" 
            })
        } else 
        if(!req.body.text){
            return res.status(400).json({
                message: "missing required text field"
            })
        }
        next();
    }
}

module.exports = {
    checkUserId,
    checkUserData,
    checkPostData
}