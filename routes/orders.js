var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

/* GET order listing. */
router.get('/', function(req, res, next) {
    da.findOrders(function(err, orders) {
      res.render('orders/orders', {title:'Order listing', order_list: orders});
    });
  
  });


router.post('/', function(req, res, next) {
  da.saveOrdersFromForm(req.body);
  res.redirect('/orders');
});


router.get('/add', function(req, res){
    res.render('orders/add', {title: 'Add Orders'});
  });

  
router.get('/add', function(req, res, next) {
  da.findParts(function(err, parts) {
    res.render('orders/add', {title:'Parts', part_list: parts});
  });
});

module.exports = router;
