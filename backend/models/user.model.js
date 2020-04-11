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


schema.methods.validatePassword = async function validatePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', schema);

module.exports = User;