var fs = require("fs");
var fastcsv = require("fast-csv");
var Book = require('./models/book')

let stream = fs.createReadStream('./main_dataset.csv');

let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
        const book = new Book ({
            image: data[0], 
            name: data[1],
            author: data[2],
            format: data[3],
            book_depository_stars: data[4],
            price: data[5],
            currency: data[6],
            old_price: data[7], 
            isbn: data[8],
            category: data[9],
            img_paths: data[10]
        });
        book.save((err, book) => {});
    });

stream.pipe(csvStream);