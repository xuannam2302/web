const mongoose = require('mongoose');
// mongo key
const mongoURI = 'mongodb://localhost:27017/web';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

// Tạo kết nối tới database
mongoose.connect(mongoURI, options)
    .then(
        () => console.log('Database connection established'),
        err => console.log('Database connection unestablied, error occurred')
    )

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        username: {
            type: String, 
            minLength: 6,
            required: true
        },
        email: String,
        password: {
            type: String, 
            minLength: 6,
            required: true
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
        }
    }),
    "users"
);

module.exports = User;