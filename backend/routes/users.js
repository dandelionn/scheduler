const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post( async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({email: email, password: password});
    newUser.save()
           .then(() => res.json('User created!'))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post( async (req, res) => {
    const user = User.find({ email: req.body.email })
    if(user == null) {
        return res.status(400).send('Email address is not valid');
    }
    try {

        if(await user.validatePassword(req.body.password)){
            res.send('Success');
        } else {
            res.send('Password is incorrect');
        }
    }
    catch {
        res.status(500).send();
    }
});

module.exports = router;