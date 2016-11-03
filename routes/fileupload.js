/**
 * Created by JiSoo on 2016-11-02.
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var request = require('request');

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
        request('http://sienlogo.herokuapp.com/api/logo?url=https://jejusien.herokuapp.com/fileupload/get?filename='+req.body.fname+'.jpg', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json({
                    resultCode: 0,
                    data: JSON.parse(response.body).logo
                });
            }
            else {
                res.json({
                    resultCode: -1,
                    msg: '이미지 인식 실패'
                })
            }
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