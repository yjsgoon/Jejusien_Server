/**
 * Created by JiSoo on 2016-11-02.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');

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
    console.log(req.files);

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

// TODO: ERROR HANDLING
router.post('/get', function(req, res) {
    res.sendFile(path.join(__dirname, './uploads', req.body.filename));
});



module.exports = router;