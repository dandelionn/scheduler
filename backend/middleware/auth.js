const config = require('config');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //x-auth-token TOKEN
    if(!token) 
        res.status(401).json({msg: "No token, authorization denied"});

    
    try{
        const decoded = jwt.verify(token, config.get('ACCESS_TOKEN_SECRET'))
        req.user = decoded;
        next();
    }
    catch(e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = authenticateToken;