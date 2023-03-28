var rfs = require('rotating-file-stream');
var path = require('path');

function generator(time, index) {
    if (!time) return "file.log";
  
    var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day = pad(time.getDate());
    var hour = pad(time.getHours());
    var minute = pad(time.getMinutes());
  
    return month + "/" + month + day + "-" + hour + minute + "-" + index + "-file.log";
}
  
var accessLogStream = rfs(generator, {
    interval: '1d', // rotate
    path: path.join(__dirname, 'log')
});

module.exports = accessLogStream;