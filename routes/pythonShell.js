/**
 * Created by JiSoo on 2016-10-25.
 */

// var PythonShell = require('python-shell');
//
// module.exports.exec = function(file, args) {
//     var options = {
//         mode: 'text',
//         pythonPath: '/python',
//         pythonOption: ['-u'],
//         scriptPath: '',
//         args: args
//     };
//
//     // todo: ERROR HANDLING
//     return PythonShell.run(file, options, function(err, results) {
//         if (err)
//             console.log(err);
//         return results;
//     });
// };

var PythonShell = require('python-shell');


module.exports.exec = function(file, path, args) {
    var options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: path,
        args: args
    };

    PythonShell.run(file, options, function (err, results) {
        if (err) throw err;
        console.log(results);
    });
};

