const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "Not Authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return next(createError(403, "Invalid Token!"));
        req.user = user;
        next();
    })

}

module.exports = verifyToken;