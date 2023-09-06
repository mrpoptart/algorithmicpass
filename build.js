#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;

exec('npx uglifyjs bookmarklet.js', function(e, code){
	var template = fs.readFileSync('template.html', 'utf8');
	code = code.replace(/'/g, '\\\'');
	code = code.replace(/\s*$/g, '');
	code = code.replace('my secret password', "'+target.value+'");
	code = `javascript:/*ALGORITHMIC PASSWORD GENERATOR*/${code}`;
	code = template.replace('template', code);
	fs.writeFileSync('index.html', code);
	console.log("index.html has been updated");
});
