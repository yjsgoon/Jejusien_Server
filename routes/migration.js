/**
 * Created by JiSoo on 2016-11-04.
 */

var db = require('../db');

var iconv = require('iconv-lite');
var fs = require('fs');
var csv = require('fast-csv');

iconv.extendNodeEncodings();

fs.createReadStream('../beers.csv')
    .pipe(iconv.decodeStream('euc-kr'))
    .pipe(csv())
    .on('data', function(data) {
        insertBeers(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    })
    .on('end', function(data) {
        console.log('Read finished');
    });

function insertBeers(krname, enname, style, abv, description, price, img_url) {
    db.any("INSERT INTO beers(krname, enname, style, abv, price, description, img_url, ipt_date, upt_date) VALUES($1, $2, $3, $4, $5, $6, $7, now(), now());",
        [krname, enname, style, abv, price, description, img_url])
        .then(function () {
        })
        .catch(function (err) {
        });
}
