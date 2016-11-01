/**
 * Created by JiSoo on 2016-11-02.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var filepath = './uploads';

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, filepath);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);// + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).single('file');

router.post('/put', function(req, res) {
    console.log(req.body);

    upload(req, res, function(err) {
        if (err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        }
        res.json({
            resultCode: 0
        });
    });
});

router.get('/get', function (req, res) {
    if (!req.query.filename) {
        res.json({
            resultCode: -1,
            msg: '파일명을 입력해주세요.'
        });
    }
    else {
        fs.readFile('./uploads/' + req.query.filename, function (err, data) {
            if (err) {
                res.json({
                    resultCode: -1,
                    msg: '존재하지 않는 파일입니다.'
                });
            }

            res.sendFile(path.join(__dirname, '../uploads', req.query.filename));
        });
    }
});

module.exports = router;