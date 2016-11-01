/**
 * Created by JiSoo on 2016-10-18.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./jeju_crypto');
var db = require('../db');

router.get('/put', function(req, res, next) {
    var bid;
    var cnt_eval = 0, old_eval = 0, new_eval = 0;
    db.one("SELECT * FROM beers WHERE beername = $1", [req.query.beername])
        .then(function(data) {
            bid = data.bid;

            db.one("SELECT evaluation FROM drinkbeers WHERE uid = $1 AND beername = $2", [req.query.uid, req.query.beername])
                .then(function(data) {
                    old_eval = data.evaluation;
                })
                .catch(function(err) {
                    console.log(err);
                });

            db.any("SELECT uid FROM drinkbeers WHERE bid = $1 AND evaluation > 0", [bid])
                .then(function(data) {
                    cnt_eval = data.length;
                })
                .catch(function(err) {
                    console.log(err);
                });

            db.any("INSERT INTO drinkbeers(uid, bid, evaluation, ipt_date, upt_date) VALUES($1, $2, $3, now(), now()) ON CONFLICT (uid, bid) DO UPDATE SET evaluation = $4;",
                [parseInt(req.query.uid), parseInt(bid), parseInt(req.query.evaluation), parseInt(req.query.evaluation)])
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
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });

    db.one("SELECT evaluation FROM beers WHERE beername = $1", [req.query.beername])
        .then(function(data) {
             new_eval = ((parseFloat(data.evaluation) * cnt_eval) - old_eval + req.query.evaluation) / cnt_eval;

            db.any("UPDATE beers SET evaluation = $1 WHERE bid = $2", [new_eval, bid])
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(err) {
                    console.log(err);
                });
        })
        .catch(function(err) {
            console.log(err);
        });
});

router.get('/get', function(req, res, next) {
    db.any("SELECT * FROM drinkbeers WHERE uid = $1 AND evaluation > 0;", [req.query.uid])
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

module.exports = router;