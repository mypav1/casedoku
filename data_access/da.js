const Person = require('../models/person');
const Cars = require('../models/cars');
const Parts = require('../models/parts');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function connect2db() {
    mongoose.connect('mongodb://localhost:27017/social_network',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    bcrypt.hash(p1.password, 10, function(err, hash) {
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
    
}

function saveParts(pa1) {
    connect2db();
    var pa1 = new Cars(pa1);
    pa1.save();
}

function getAllParts(cb) {
    connect2db();
    Parts.find(function(err, cars) {
        if(err) {
        console.log('Error getting parts' + err);
    }
    cb(err,cars);    
    });
}


function saveCars(c) {
    connect2db();
    var c1 = new Cars(c);
    c1.save();
}

function getAllCars(cc) {
    connect2db();
    
    Cars.find(function(err, cars) {
        if(err) {
        console.log('Error getting cars' + err);
    }
    cc(err,cars);    
    });
}


function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err,users);
    });
}

function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: '.*' + pattern + '.*'}},
                        {last_name:{$regex: '.*' + pattern + '.*'}}
                      ]
    }, function(err, users){
        cb(err, users);
    });
}


function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res){
        if (err) {
            console.log("Error deleting user" + err);
        }
        cb(err);
    });
}


module.exports = {
    savePersonFromForm: savePerson,
    findPersons: getAllPersons,
    saveCarFromJson: saveCars,
    findCars: getAllCars,
    search: search,
    deleteUser: deleteUser,
    savePartsFromForm: saveParts,
    findParts: getAllParts,
};