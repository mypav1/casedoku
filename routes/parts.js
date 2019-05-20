var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

/* GET parts listing. */
router.get('/', function(req, res, next) {
  da.findParts(function(err, parts) {
    res.render('parts', {title:'Part listing', part_list: parts});
  });

});


router.post('/', function(req, res, next) {
  da.savePartsFromForm(req.body);
  res.send("Part saved");
});

router.get('/add', function(req, res){
  res.render('parts/add', {title: 'Add Parts'});
});

module.exports = router;