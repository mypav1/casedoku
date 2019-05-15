const Person = require('../models/person');
const Cars = require('../models/cars');
const mongoose = require('mongoose');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/social_network',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p) {
    connect2db();
    var p1 = new Person(p);
    p1.save();
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

module.exports = {
    savePersonFromJson: savePerson,
    findPersons: getAllPersons,
    saveCarFromJson: saveCars,
    findCars: getAllCars
};