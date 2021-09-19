const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
//middleware
const auth = require('../middleware/auth');
//contact db object
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private  
router.get('/',auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const result=await Contact.find({user: userId},
            function (err, result) {
                if(err){
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
            //res.send(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private 
router.post('/', [
        auth,
        check('name', 'Please enter a name')
        .not()
        .isEmpty()
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {name, phone, email, type} = req.body;

        //Check if user with given name already exists
        const existingContact = await Contact.findOne({name: name, user: user});
        
        if(existingContact !== null){
            return res.status(404).json({msg: `User ${name} already exists among user's contacts`});
        }

        const contact = new Contact({
           name,
           phone,
           email,
           type,
           user: req.user.id //link the contact to the user who added it.user id is decoded by auth-middleware
       })
       
       contact.save();

       res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/contacts:id
// @desc        Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
    
    try {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);

        if(!contact) {return res.status(404).json({msg: 'User with that id was not found'});}

        //check that user matches with the contact owner
        if (req.user.id.toString() !== contact.user.toString()) {
            return res.status(401).json({msg: 'Not Authorized'});
        }
        
        const {name, phone, email, type} = req.body;
        const updateSchema = {};
        //build updateSchema
        if (name) {updateSchema.name = name};
        if (email) {updateSchema.email = email};
        if (phone) {updateSchema.phone = phone};
        if (type) {updateSchema.type = type};
        
        //find by if (from params) and update 
        await Contact.findByIdAndUpdate(contactId, 
            updateSchema,
            {new: true},//with this parameter result in callback contains the updated object, not the old one
            function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                    res.send(result);
                }
              });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route       DELETE api/contacts:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);
        if(!contact) {return res.status(404).json({msg: 'User with that id was not found'});}

        //check that user matches with the contact owner
        if (req.user.id.toString() !== contact.user.toString()) {
            return res.status(401).json({msg: 'Not Authorized'});
        }

        //find by id (from params) and delete
        await Contact.findByIdAndRemove(contactId,
            {},
            (err, result) => {
                if (err){
                    res.send(err);
                } else {
                    res.json({msg:'User removed'});
                }
            })

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//pitää exportata router jotta se toimii
module.exports = router;