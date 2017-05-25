/**
 * Created by JiSoo on 2016-10-18.
 */

var express = require('express');
var router = express.Router();
var crypto = require('./jeju_crypto');
var db = require('../db');

router.get('/put', function(req, res, next) {
    var jauth = crypto.decrypt(req.query.jauth);
    jauth = JSON.parse(jauth);

    db.any("INSERT INTO drinkbeers(uid, bid, prefer, ipt_date, upt_date) VALUES($1, $2, 1, now(), now()) ON CONFLICT (uid, bid) DO UPDATE SET prefer = 1;",
        [jauth.uid, res.query.bid])
        .then(function() {
            res.json({
                resultCode: 0
            });
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        });

/*    db.one("SELECT bid FROM beers WHERE beername = $1;", [req.query.beername])
        .then(function (data) {
            db.any("INSERT INTO drinkbeers(uid, bid, prefer, ipt_date, upt_date) VALUES($1, $2, 1, now(), now()) ON CONFLICT (uid, bid) DO UPDATE SET prefer = 1;",
                [jauth.uid, parseInt(data.bid)])
                // [parseInt(req.query.uid), parseInt(data.bid)])
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
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });*/
});

router.get('/get', function(req, res, next) {
    var jauth = crypto.decrypt(req.query.jauth);
    jauth = JSON.parse(jauth);

    db.any("SELECT bid FROM drinkbeers WHERE uid = $1 AND prefer = $2;", [jauth.uid, 1])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            });
            /*var i;
            var beerinfo = [];
            var flag = undefined;
            for (i = 0; i < data.length; i++) {
                db.one("SELECT * FROM beers WHERE bid = $1;", [data[i].bid])
                    .then(function (data) {
                        beerinfo.push(data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                if(i+1 === data.length)
                    flag = true;
            }
            while(!flag){}
                res.json({
                    resultCode: 0,
                    info: beerinfo
                });*/
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/delete', function(req, res, next) {
    var jauth = crypto.decrypt(req.query.jauth);
    jauth = JSON.parse(jauth);

    db.any("INSERT INTO drinkbeers(uid, bid, prefer, ipt_date, upt_date) VALUES($1, $2, 0, now(), now()) ON CONFLICT (uid, bid) DO UPDATE SET prefer = 0;",
        [jauth.uid, res.query.bid])
        .then(function() {
            res.json({
                resultCode: 0
            })
        })
        .catch(function(err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
/*    db.one("SELECT bid FROM beers WHERE beername = $1;", [req.query.beername])
        .then(function (data) {
            db.any("INSERT INTO drinkbeers(uid, bid, prefer, ipt_date, upt_date) VALUES($1, $2, 0, now(), now()) ON CONFLICT (uid, bid) DO UPDATE SET prefer = 0;",
                [jauth.uid, parseInt(data.bid)])
                // [parseInt(req.query.uid), parseInt(data.bid)])
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
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });*/
});

module.exports = router;