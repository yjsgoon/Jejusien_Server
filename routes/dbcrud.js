/**
 * Created by JiSoo on 2016-10-11.
 */

var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/put', function(req, res, next) {
    db.one("INSERT INTO [ table_name ] VALUES( [ values ] ) ON CONFLICT ( [ keys ] ) DO UPDATE SET VALUE = [ value ];",
        [ params ])
        .then(function () {
            res.json({
                resultCode: 0
            });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        });
});

router.get('/get', function(req, res, next) {
    db.any("SELECT [ * ] FROM [ table_name ] WHERE [ * ];", [ params ])
        .then(function (data) {
            res.json({
                resultCode: 0//,
                // info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/delete', function(req, res, next) {
    db.one("DELETE FROM [ table_name ] WHERE [ * ];", [ params ])
        .then(function (data) {
            res.json({
                resultCode: 0
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

module.exports = router;