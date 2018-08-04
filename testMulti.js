var d3Color = require('d3-color');
var d3HSV = require('d3-cam02');

var hex2 = '#006B73';
var hex1 = '#aaaaaa';
//console.log(d3Color.jab(initialHex))
var hexV = d3Color.jab(hex1);
var hexV2 = d3Color.jch(hex2);
console.log("HSluv:",hexV)
var initialL = hexV.l;
var initialU = hexV.u;
var initialV = hexV.v;
var endL = hexV2.l;
var endU = hexV2.u;
var endV = hexV2.v;
var spanV = endV - initialV;
var spanU = endU - initialU;
var spanL = endL - initialL;
var Scales = 7 + 1;

console.log('start:',hexV);
console.log('end:', hexV2);

//if (initialV > 65) break;

var rgbToHex = function (rgb) {
  if (+rgb < 0) rgb = 0;
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var returnHex = function(yellow) {
  return '#' + rgbToHex(parseInt(yellow.r)) + rgbToHex(parseInt(yellow.g)) + rgbToHex(parseInt(yellow.b))
}

var all = {};

function logScale(iter) {
  var toLog = [];
  //4
  all[iter] = [];

  for (var i = 0; i < iter; i++) {
    //console.log('\n',iter, (startV + (i * (totalSpan / (iter - 1)))))
    var L = initialL + (i * (spanL / (iter - 1)));
    var U = initialU + (i * (spanU / (iter - 1)));
    var V = initialV + (i * (spanV / (iter - 1)));
    var yellow = d3HSV.hsluv(L,U,V).rgb()
    //console.log("step:",(startV + (i * (totalSpan / (iter - 1)))))
    //console.log(yellow)
    toLog.push(returnHex(yellow));
    all[iter].push(returnHex(yellow))
  }
  if (Scales - 1 !== iter) {
    process.stdout.write('\n' + iter + ': ' + JSON.stringify(toLog.reverse()) + ",")
  }
  else {
    process.stdout.write('\n' + iter + ': ' + JSON.stringify(toLog.reverse()))
  }
}

process.stdout.write('1: ["' + hex1 + '"],');
for (var j = 2; j < Scales; j++) {
  logScale(j);

  if (j === Scales - 1) {
    process.stdout.write('\n\nhtml:\n');
    var allhtml = '<div>';
    //console.log(all, 'all')
    for (k in all) {
      //console.log(k,'k')
      allhtml = allhtml + '<div>';
      for (var w = 0; w < all[k].length; w++) {
        //console.log(all[k][w],k)
        allhtml = allhtml + '<div style="display:inline-block; background-color: ' + all[k][w] + '; width: 70px; height: 20px;"></div>';
      }

      //allhtml = allhtml + '<div style=background-color='
    }
    //generate HTML
    //process.stdout.write(allhtml + '</div>');
  }
}

