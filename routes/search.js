var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.search(req.body['search'], function(err, users){
        var userid = req.session['userid'];
        da.getUserById(userid, function(err, user){
            res.render('users/users', {title:'User listing', user_list: users, userid: userid, friends: user.friends});
        });
    });
});

router.post('/parts', function(req, res){
    da.searchPart(req.body['search'], function(err, parts){
        var userid = req.session['userid'];
        res.render('parts/parts', {title:'Part listing', part_list: parts, userid: userid});
    });
});


module.exports = router;