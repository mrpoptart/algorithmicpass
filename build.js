#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;

exec('npx uglifyjs bookmarklet.js', function(e, code){
	var template = fs.readFileSync('public/index.html', 'utf8');
	code = code.replace(/'/g, '\\\'');
	code = code.replace(/\s*$/g, '');
	code = code.replace('my secret password', "'+target.value+'");
	code = `javascript:/*ALGORITHMIC PASSWORD GENERATOR*/${code}`;
	const index = template.replace(/el\.href.*/, `el.href='${code}'`);
	fs.writeFileSync('public/index.html', index);
	console.log("public/index.html has been updated");
});
