/**
 * Created by JiSoo on 2016-10-13.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./jeju_crypto');
var db = require('../db');

router.get('/put', function(req, res, next) {
    var jauth = JSON.stringify(req.body.jauth);
    jauth = crypto.decrypt(jauth);

    if (jauth.status !== 1) {
        res.json({
            resultCode: -1,
            msg: 'don\'t access database'
        });
    }

    db.one("INSERT INTO beer(beername) VALUES($1) ON CONFLICT (beername) DO UPDATE SET beername = $2;",
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

router.get('/delete', function(req, res, next) {
    var jauth = JSON.stringify(req.body.jauth);
    jauth = crypto.decrypt(jauth);

    if (jauth.status !== 1) {
        res.json({
            resultCode: -1,
            msg: 'don\'t access database'
        });
    }

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