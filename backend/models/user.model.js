const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true, index: {unique: true}, validate: [isEmail, 'invalid email'] },
    password: { type: String, required: true }
});

const SALT_FACTOR = 10;
schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try{
        this.password = await bcrypt.hash(this.password, SALT_FACTOR);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare password for login
schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { 
            return cb(err); 
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', schema);

module.exports = User;