var fs 	 = require('fs');
var path = require('path');
var conf = JSON.parse(fs.readFileSync('app/conf/conf.json'));

function read_conf (argument) {
	return conf[argument];
}

exports.read_conf = read_conf;