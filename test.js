var d3 = require('d3');
var hsluv = require('./build/d3-hsluv.js')


//var yellow = d3Color.rgb({l:85.87432021817473, u: 100.0000000000724, v: 97.13855934179674 });
console.log(d3.quantize(hsluv.interpolateHsluv("#d66000", "#a9a9b4"), 10))
//
