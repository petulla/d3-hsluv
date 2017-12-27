var d3Color = require('d3-color');
var d3HSV = require('./build/d3-hsluv.js')


//var yellow = d3Color.rgb({l:85.87432021817473, u: 100.0000000000724, v: 97.13855934179674 }); 
var yellow = d3HSV.hsluv("#abcdef")
console.log(yellow)
