var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

/* GET parts listing. */
router.get('/', function(req, res, next) {
  var userid = req.session['userid'];
  da.findParts(function(err, parts) {
    res.render('parts/parts', {title:'Part listing', part_list: parts, userid: userid});
  });

});


router.post('/', function(req, res, next) {
  da.savePartsFromForm(req.body);
  res.redirect("/parts");
});

router.get('/add', function(req, res){
  res.render('parts/add', {title: 'Add Parts'});
});

router.post('/updateprice', function(req, res) {
  var partid = req.query.partid;
  var price = req.body.price;
  console.log(req.query.partid, req.body.price, '---1');
  da.updatePrice(partid, price, function(err) {
    res.redirect('/parts');
  });
});


module.exports = router;