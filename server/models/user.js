const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/web';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(mongoURI, options, (err) => {
    if(err) console.log('Cannot connect to MongoDB');
});

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        username: {
            type: String, 
        },
        email: String,
        password: {
            type: String, 
        },
        user: {
            type: Boolean, 
            default: true
        },
        admin: {
            type: Boolean, 
            default: false
        },
        manager: {
            type: Boolean, 
            default: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        money: {
            type: Number,
            default: 0,
        }
    }),
    "users"
);

module.exports = User;