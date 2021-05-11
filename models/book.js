var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://xuannam:xuannamt81@web.qpw3q.mongodb.net";
const uri_backup = "mongodb://localhost:27017/";
var client;
function get_db() {
MongoClient.connect(uri_backup, function (err, result) {
    if(!err) return result.db(web);    
});
}

exports.get_db = get_db;