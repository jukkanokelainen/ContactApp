const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');//middleware joka muuttaa tokenin use id:ksi jos valid.

//define user database schema tai oikeastaan taulu. sillä tämän User-objektin methodilla voi hakea taulusta usereita
const User = require('../models/User');

// @route       GET api/auth
// @desc        Get login user
// @access      Private  
//tämä on nyt private, joten laitetaan auth-middleware toiseksi parametriksi.
//kyseinen middleware tarkastaa, että headerissa 'x-auth-token'-keyssä on validi token
//jos token on validi middleware funktio muuttaa sisään tulevan requestin sellaiseksi, että siinä on user ja userilla
//on id-tiedossa. käytännössä siis token muuttuu user id:ksi, jolla voidaan hakea userin muut tiedot.
router.get('/', auth, async (req, res) => {
    try {
        //haetaan loput userin tiedoista nyt tiedossa olevan id:n avulla
        //ei haluta kaikkia tietoja kuten salasana niin select muut paitsi password
        user =await User.findById(req.user.id).select('-password');
        //palautetaan
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/auth
// @desc        Auth user & get token
// @access      Public 
router.post('/',
[check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        //otetaan data ulos bodystä, joka on nyt ok
        const {email, password}=req.body;

        try {
            //check if there is a user with that email- find user by email by using the email that is in body
            let user = await User.findOne({email: email});
            
            if(!user) {
                return res.status(400).json({msg: 'Invalid credentials'});
            }

            //verrataan salasanaa. Bcryptin ensimmäinen argument on ei häshätty ja toinen on häsh.
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({msg: 'Invalid credentials'});
            }

            //if everything is ok, we will send back the user id that was read from db:
            const payload = {user: {id: user.id}}//id on tässä ilmeisesti mongodb:n oma id kun sitä ei ole schemassa
            //tehdään signaus, eli payload muutetaan tokeniksi joka sitten palautetaan:
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000 //<-- testissä 1h aikaa tuhoutumiseen, tuotannossa ehkä 1min.
                }, 
                (err, token) => {//<--callback funktio jossa sisään tulee mahd. error ja signin luoma token
                    if (err) throw err;
                    res.json({token}) //<-- if no errors then response is the token.
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

//pitää exportata router jotta se toimii
module.exports = router;