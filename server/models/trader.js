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
            ref: 'User',
        },
        added_items: [{
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: {
                type: Number, 
                default: 0
            },
            create_at: Date,
            update_at: Date,
        }],
        ordered_items: [{
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: {
                type: Number, 
                default: 0
            },
            create_at: Date,
        }],
        delivered_items: [{
            _id: false, 
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: {
                type: Number, 
                default: 0
            },
        }],
    }),
    'traders'
);
