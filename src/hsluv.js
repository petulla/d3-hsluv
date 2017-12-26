import {color, rgb} from "d3-color";
import {xyzToLuv, rgbToXyz, lchToHsluv, luvToLch, xyzToRgb, luvToXyz, lchToLuv, hsluvToLch} from "./space";

function HsluvConvert(o) {
  if (o instanceof Hsluv) return new Hsluv(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof rgb)) o = rgb(o);

  var oRGB = lchToHsluv(luvToLch(xyzToLuv(rgbToXyz([o.r/255,o.g/255,o.b/255])))),
      h = oRGB.h,
      s = oRGB.s,
      l = oRGB.l;

  return new Hsluv(h,s,l, o.opacity);
}

export default function hsluv(h, s, l, opacity) {
  return arguments.length === 1 ? HsluvConvert(h) : new Hsluv(h, s, l, opacity == null ? 1 : opacity);
}

export function Hsluv(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

var hsluvPrototype = Hsluv.prototype = hsluv.prototype = Object.create(color.prototype);

hsluvPrototype.constructor = Hsluv;

hsluvPrototype.brighter = function(k) {
  k = k == null ? brighter : Math.pow(brighter, k);
  return new Hsluv(this.h, this.s, this.l * k, this.opacity);
};

hsluvPrototype.darker = function(k) {
  k = k == null ? darker : Math.pow(darker, k);
  return new Hsluv(this.h, this.s, this.l * k, this.opacity);
};

hsluvPrototype.rgb = function() {
  var L = this.h,
      U = this.s,
      V = this.l,
      o = xyzToRgb(luvToXyz(lchToLuv((hsluvToLch([L,U,V]))))),
      r = +o[0],
      g = +o[1],
      b = +o[2];

      console.log(o,'o', L, U, V)

      return hsluv2rgb(r,g,b);
};

hsluvPrototype.displayable = function() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s))
      && (0 <= this.l && this.l <= 1)
      && (0 <= this.opacity && this.opacity <= 1);
};

function hsluv2rgb(r1, g1, b1, a) {
  return rgb(r1 * 255, g1 * 255, b1 * 255, a || 1);
}
