const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    req.session.destroy(function(err){
        if(err) {
            res.redirect('/dashboard');
        }
        res.clearCookie('Sid');
        res.redirect('/');
    });
});

module.exports = router;