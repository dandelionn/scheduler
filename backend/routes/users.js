const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => { //TO BE DELETED, IT EXISTS ONLY FOR TESTING PURPOSES
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .select('-refreshTokens')
        .then(user => res.json(user));
});

router.post('/register',  async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const newUser = new User({email, password});
    newUser.save()
           .then( user => {
            const payload = { id: user.id }
            tokens = generateTokens(payload)
            user.refreshTokens.push(tokens.refreshToken)
            user.save()
                .catch(err => {
                    res.status(400).json({msg: "User tokens not stored, please login again."})
                });
            res.json(tokens)
           })
           .catch(err => res.status(400).json({ msg: "User already exists." }));
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json( {msg: 'User does not exists.' });
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(!isMatch) res.status(401).json('Password is incorrect.');
                const payload = { id: user.id }
                tokens = generateTokens(payload)
                user.refreshTokens.push(tokens.refreshToken)
                user.save()
                    .catch(err => res.status(400).json({msg: "User tokens not stored, please login again."}));
                res.json(tokens)
            });
        })
        .catch(err => res.status(400).json({msg: "Unknown error when attempting to find the user."}));
});

router.post('/token', (req, res) => {
    const {user_id, refreshToken} = req.body
    if (refreshToken == null || user_id == null) 
        return res.status("400").send({ msg: 'Please specify a refresh token and an user_id' })

    User.findOne({_id: user_id})
        .then(user => {
            if(!user) 
                return res.status(400).json({msg: 'User does not exists'})
            if (!user.refreshTokens.includes(refreshToken)) 
                return res.sendStatus(403);
            jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.sendStatus(403)
                    const payload = { id: user.id }
                    const accessToken = generateAccesToken(payload)
                    res.json({accessToken : accessToken})
                })
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/logout', (req, res) => {
    const {user_id, refreshToken} = req.body

    if (refreshToken == null || user_id == null) 
        return res.status("400").send({ msg: 'Please specify a refresh token and an user_id' })
        
    User.findOne({_id: user_id})
        .then(user => {
            if(!user) 
                return res.status(400).json({msg: 'User does not exists'})
            user.refreshTokens.remove(refreshToken)
            user.save()
                .then(() => res.sendStatus(204))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

function generateTokens(payload) {
    const accessToken = generateAccesToken(payload)
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET)
    return {accessToken, refreshToken}
}

function generateAccesToken(payload) {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '3000s'})
}

module.exports = router;