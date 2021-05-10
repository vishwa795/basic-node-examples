const assert = require("assert");

exports.insertDocument = (db,document,collection) =>{
    var collection = db.collection(collection);
    return collection.insertOne(document);
}

exports.findDocuments = (db,collection) =>{
    var collection = db.collection(collection);
    return collection.find({}).toArray();
}

exports.removeDocument = (db,document,collection) =>{
    var collection = db.collection(collection);
    return collection.deleteOne(document);
}

exports.updateDocument = (db,document,update,collection) =>{
    var collection = db.collection(collection);
    return collection.updateOne(document,{$set: update},null);
}