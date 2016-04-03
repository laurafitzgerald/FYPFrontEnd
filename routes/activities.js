var express = require('express');
var router = express.Router();


/*Get Activity Page*/
router.get('/activities', function(req, res, next){
    res.render('activities');
});

module.exports = router;