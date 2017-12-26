import {minv, refU, refV} from './constant';
import {toLinear, dotProduct, yToL, maxChromaForLH} from './helpers';

export function lchToHsluv(tuple) {
  var L = tuple[0];
  var C = tuple[1];
  var H = tuple[2];
  if(L > 99.9999999) return [H,0,100];
  if(L < 0.00000001) return [H,0,0];
  var max = maxChromaForLH(L,H);
  var S = C / max * 100;
  return {h:H,s:S,l:L};
};

export function luvToLch(tuple) {
  var L = tuple[0];
  var U = tuple[1];
  var V = tuple[2];
  var C = Math.sqrt(U * U + V * V);
  var H;
  if(C < 0.00000001) H = 0; else {
    var Hrad = Math.atan2(V,U);
    H = Hrad * 180.0 / 3.1415926535897932;
    if(H < 0) H = 360 + H;
  }
  return [L,C,H];
};

export function xyzToLuv(tuple) {
  var X = tuple[0];
  var Y = tuple[1];
  var Z = tuple[2];
  var divider = X + 15 * Y + 3 * Z;
  var varU = 4 * X;
  var varV = 9 * Y;
  if(divider != 0) {
    varU /= divider;
    varV /= divider;
  } else {
    varU = NaN;
    varV = NaN;
  }
  var L = yToL(Y);
  if(L == 0) return [0,0,0];
  var U = 13 * L * (varU - refU);
  var V = 13 * L * (varV - refV);
  return [L,U,V];
};

export function rgbToXyz(tuple) {
  var rgbl = [toLinear(tuple[0]),toLinear(tuple[1]),toLinear(tuple[2])];
  return [dotProduct(minv[0],rgbl), dotProduct(minv[1],rgbl),dotProduct(minv[2],rgbl)];
};
