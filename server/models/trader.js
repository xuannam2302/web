const { Double } = require('bson');
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/web';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(mongoURI, options, (err) => {
    if(err) console.log('Cannot connect to MongoDB');
});

exports.Trader = mongoose.model(
    'Trader',
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        items: [{
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'book',
            },
            quantity: {
                type: Number, 
            },
            status: {
                type: String,
                enum: ['added_to_cart', 'ordered', 'delivered', 'cancelled'],
                default: 'add_to_cart', 
            }
        }]
    }),
    'traders'
);
