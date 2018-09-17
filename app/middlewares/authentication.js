const { User } = require('../models/user');

let authenticateUser = ((req,res,next) => {
    let token = req.header('x-auth');
    User.findByToken(token)
    .then((user) => {
        req.locals = {
            user,
            token
        }
        next();
    })
    .catch((err) => {
        res.status(401).send(err);
    })
})

module.exports = {
    authenticateUser
}