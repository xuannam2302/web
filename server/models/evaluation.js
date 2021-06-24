const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/web';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(mongoURI, options, (err) => {
    if(err) console.log('Cannot connect to MongoDB');
});

const Evaluation = mongoose.model(
    'Evaluation',
    new mongoose.Schema({
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        comments: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String,
            rating: Number,
            answers: [{
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                content: String, 
                create_at: Date
            }],
            likes: [{
                _id: false, 
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
            }],
            create_at: Date
        }],
    }),
    'evaluations'
);

module.exports = Evaluation;