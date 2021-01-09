var mongo = require('mongodb').MongoClient;

var dbName = 'library';
var url = 'mongodb://127.0.0.1:27017/' + dbName;

function insertOne(collection, obj, cb) {
    mongo.connect(url, function (error, db) {
        if(error == null) {
            var database = db.db('library');
            database.collection(collection).insertOne(obj, cb);
            db.close();
        } else {
            console.log(error);
        }
    })
}

function insertMany(collection, objArr, cb) {
    mongo.connect(url, function (error, db) {
        if(error == null) {
            var database = db.db('library');
            database.collection(collection).insertMany(objArr, cb);
            db.close();
        } else {
            console.log(error);
        }
    })
}

function find(collection, where, cb) {
    mongo.connect(url, function (error, db) {
        if(error == null) {
            var database = db.db('library');
            database.collection(collection).find(where).toArray(cb);
            db.close();
        } else {
            console.log(error);
        }
    })
}

function updateOne(collection, where, update, cb) {
    mongo.connect(url, function (error, db) {
        if(error == null) {
            var database = db.db('library');
            database.collection(collection).updateOne(where, update, cb);
            db.close();
        } else {
            console.log(error);
        }
    })
}

function deleteOne(collection, where, cb) {
    mongo.connect(url, function (error, db) {
        if(error == null) {
            var database = db.db('library');
            database.collection(collection).deleteOne(where, cb);
            db.close();
        } else {
            console.log(error);
        }
    })
}

module.exports = {
    insertOne,
    insertMany,
    find,
    updateOne,
    deleteOne,
}