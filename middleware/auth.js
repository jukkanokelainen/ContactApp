const jwt = require('jsonwebtoken');
const config = require('config');

//middleware funktiossa pitää kutsua next kun on valmista
//joka tarkoittaa että mene seuraavaan middleware funktioon
module.exports= function(req, res, next) {
//get token from header (x-auth-token on avain jossa se tulee)
const token = req.header('x-auth-token');

//Check if not token
if (!token){
    return res.status(401).json({msg: 'No token, authorization denied'});
}

try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //muutetaan requestissä tuleva userin dekoodatuksi useriksi (tokenissa tuli id vain mukana, muut tyhjää)
    req.user = decoded.user;
    next();
} catch (err) {
    res.status(401).json({msg: 'Token is not valid'});
}
};
