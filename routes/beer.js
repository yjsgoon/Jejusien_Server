/**
 * Created by JiSoo on 2016-10-13.
 */

var express = require('express');
var router = express.Router();

var db = require('../db');

// TODO: 권한 설정
router.get('/put', function(req, res, next) {
    db.one("INSERT INTO beer(beername) VALUES($1) ON CONFLICT (beername) DO UPDATE SET VALUE = $2;",
        [req.query.beername, req.query.beername])
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

router.get('/get/all', function(req, res, next) {
    db.any("SELECT * FROM beer;", [])
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

// TODO: 권한 설정
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