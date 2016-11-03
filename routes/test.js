/**
 * Created by JiSoo on 2016-10-25.
 */

// var crypto = require('./jeju_crypto');
// // var python = require('./pythonShell');
//
// // console.log(python.exec('test.py', '../python', []));
// // python.exec('test.py', '../python', []);
//
// // python.exec('Jejusien_Model.py', '../python', ['../python/dataset/dataset/cass1.jpg']);
//
// var jauth = crypto.decrypt('MCeyNiGS7bV3rXu3ugfwsX/O2EHZlU/caLCT774eGsc=');
// jauth = JSON.parse(jauth);
//
// console.log(jauth.uid);

var fs = require('fs');
var csv = require('fast-csv');

fs.createReadStream('../beers.csv')
.pipe(csv())
.on('data', function(data) {
    console.log(data);
})
.on('end', function(data) {
    console.log('Read finished');
});