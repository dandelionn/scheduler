const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

router.post('/register',  async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newUser = new User({email, password});
    newUser.save()
           .then( user => {
            const payload = { id: user.id }
            tokens = generateTokens(payload)
            res.json(tokens)
           })
           .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token 
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403) //refreseh tokens should be in the database
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccesToken({ name: user.name })
        res.json({accessToken : accessToken})
    })
})

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exists'})
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if(!isMatch) res.status(401).json('Password is incorrect');
            const payload = { id: user.id }
            tokens = generateTokens(payload)
            res.json(tokens)
        });
    });
});

function generateTokens(payload) {
    const accessToken = generateAccesToken(payload)
    const refreshToken = jwt.sign(payload, config.get('REFRESH_TOKEN_SECRET'))
    //refreshTokens.push(refreshToken)
    return {accessToken, refreshToken}
}

function generateAccesToken(payload) {
    return jwt.sign(payload, config.get('ACCESS_TOKEN_SECRET'), {expiresIn: '30s'})
}

module.exports = router;

////////STORE REFRESH TOKENS IN THE DATABASE