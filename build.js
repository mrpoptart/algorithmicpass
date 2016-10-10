#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;

exec('./node_modules/uglifyjs/bin/uglifyjs bookmarklet.js', function(e, code){
	var template = fs.readFileSync('selector.template', 'utf8');
	code = code.replace(/'/g, '\\\'');
	code = code.replace(/\s*$/g, '');
	code = code.replace('my secret password', "'+target.value+'");
	code = code.replace('javascript:', 'javascript:/*ALGORITHMIC PASSWORD GENERATOR*/');
	code = template.replace('template', code);
	fs.writeFileSync('index.html', code);
});