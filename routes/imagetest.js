/**
 * Created by JiSoo on 2016-11-04.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./jeju_crypto');
var request = require('request');

/* 사용자의 새로운 토큰을 생성한다. */
router.get('/', function (req, res, next) {
    request('http://sienlogo.herokuapp.com/api/logo?url=https://jejusien.herokuapp.com/fileupload/get?filename=jejusien.jpg', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.body);
        }
    })
});

module.exports = router;