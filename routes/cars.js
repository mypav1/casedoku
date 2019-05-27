var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findCars(function(err, cars) {
    res.render('cars/cars', {title:'Car listing', car_list: cars});
  });

});


router.post('/', function(req, res, next) {
  da.saveCarFromJson(req.body);
    res.redirect('/cars');
});

router.get('/add', function(req, res){
  res.render('cars/add', {title: 'Add Parts'});
});



module.exports = router;