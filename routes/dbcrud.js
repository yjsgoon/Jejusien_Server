/**
 * Created by JiSoo on 2016-10-11.
 */

var express = require('express');
var router = express.Router();

router.get('/get', function(req, res, next) {
    res.send('dbcrud');
});

module.exports = router;