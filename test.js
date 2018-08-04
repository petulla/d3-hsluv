var d3 = require('d3');
var hsluv = require('./build/d3-hsluv.js')


//var yellow = d3Color.rgb({l:85.87432021817473, u: 100.0000000000724, v: 97.13855934179674 });
var color1 = hsluv.hsluv('#60c96e');
var color2 = hsluv.hsluv('#4d4193');
var breaks = 8;

var color3 = d3.hsl('#60c96e');
var color4 = d3.hsl('#4d4193');

function rgbToHex(r,g,b) {
   return '#' + (r << 16 | g << 8 | b).toString(16).toUpperCase();
}

function getLess(X) {
	var t = hsluv.hsluv(color1.l + (X * ((color2.l - color1.l) / breaks)),
		color1.u + (X * ((color2.u - color1.u) / breaks)),
		color1.v + (X * ((color2.v - color1.v) / breaks))).rgb();
	return '"' + rgbToHex(t.r,t.g,t.b) + '",';
}

function getLessHSL(X) {
	var t = d3.hsl(color3.h + (X * ((color4.h - color3.h) / breaks)),
		color3.s + (X * ((color4.s - color3.s) / breaks)),
		color3.l + (X * ((color4.l - color3.l) / breaks))).rgb();
	return '"' + rgbToHex(t.r,t.g,t.b) + '",';
}

for (var i = 0; i < breaks ; i++) {
	console.log(getLess(i));
}

console.log(' ');

for (var i = 0; i < breaks ; i++) {
	console.log(getLessHSL(i));
}

//
