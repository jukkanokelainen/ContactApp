const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

//get on kun otetaan jotain, post on kun lähetetään.
//put tarkoittaa että päivitetään jotain olemassa olevaa
//delete tarkoittaa että poistetaan.

// @route       POST api/users
// @desc        Register a user
// @access      Public   
//tässä kohtaa keno osoittaa tähän filen sijaintiin      
router.post('/',
    [
        check('name', 'Please enter a name')
        .not()
        .isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        //otetaan data ulos bodystä, joka on nyt ok
        const {name, email, password}=req.body;

        try {
            //check if there is a user with that email- find user by email by using the email that is in body
            let user = await User.findOne({email: email})
            
            if(user) {
                return res.status(400).json({msg: 'User already exists'});
            }

            //now we will store the user to database (password is encryptet)
            user= new User({
                name,
                email,
                password
                //date is automatically created
            })

            const salt = await bcrypt.genSalt(10);

            //plain text pasword is changed to hashed
            user.password= await bcrypt.hash(password, salt);
            
            //save to database (mongoose);
            await user.save();

            const payload = {user: {id: user.id}}//id on tässä ilmeisesti mongodb:n oma id kun sitä ei ole shemassa
            //signaus eli payload muutetaan tokeniksi joka sitten palautetaan:
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
    }
);

//pitää exportata router jotta se toimii
module.exports = router;