/**
 * Created by JiSoo on 2016-11-04.
 */

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var crypto = require('./jeju_crypto');
var db = require('../db');
var fs = require('fs');

var path = './BeerInfo/';
var files = ['ale/', 'bock/', 'ipa/', 'lager/', 'pilsner/', 'stout/'];

function insertBeers(beername, coperation, category, abv, description) {
    db.any("INSERT INTO beers(beername, coperation, category, abv, description, ipt_date, upt_date) VALUES($1, $2, $3, $4, $5, now(), now());",
        [beername, coperation, category, abv, description])
        .then(function () {
        })
        .catch(function (err) {
        });
}

/* 사용자의 새로운 토큰을 생성한다. */
router.get('/', function (req, res, next) {
    // var i;
    files.forEach(function(dir) {
        fs.readdir(path+dir,function(err,list) {
            list.forEach(function (file) {
                // for(i = 0; i<10; i++) {
                //     var file = list[i];
                    var temp;
                    var cocoa = fs.readFileSync(path + dir + file, 'utf-8');
                    temp = cocoa.split('\n');

                    if (temp[0])
                        temp[0] = temp[0].split(': ')[1].replace(/\'/g, '');
                    if (temp[2])
                        temp[2] = temp[2].split(': ')[1].replace(/\'/g, '');
                    if (temp[3])
                        temp[3] = temp[3].split(': ')[1].replace(/\'/g, '');

                    insertBeers(file.split('.txt')[0], temp[0], dir.split('/')[0], temp[2], temp[3]);
                // }
            });
        });
    });

    res.json({
        resultCode: 0
    });
});

module.exports = router;
