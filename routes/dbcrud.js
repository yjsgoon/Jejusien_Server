/**
 * Created by JiSoo on 2016-10-11.
 */

var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/put', function(req, res, next) {
    db.one("INSERT INTO beer(beername, capacity) VALUES($1, $2) ON CONFLICT (beername) DO UPDATE SET VALUE = $3;",
        [req.query.beername, req.query.capacity])
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
    db.any("SELECT * FROM beer WHERE beername = $1;", [req.query.beername])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
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
    db.one("DELETE FROM beer WHERE beername = $1;", [req.query.beername])
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