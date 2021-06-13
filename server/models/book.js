const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/web';
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

mongoose.connect(mongoURI, options, (err) => {
    if(err) console.log('Cannot connect to MongoDB');
});

const Book = mongoose.model(
    "Book", 
    new mongoose.Schema({
        image: String,
        name: String,
        author: String,
        format: String, 
        book_depository_stars: Number,
        price: Number,
        old_price: Number,
        currency: String,
        isbn: String,
        category: String,
        img_paths: String,
        quantity: Number,
    }),
    "book"
);

module.exports = Book;