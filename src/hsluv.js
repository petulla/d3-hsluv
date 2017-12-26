import {color, rgb} from "d3-color";
import {xyzToLuv, rgbToXyz, lchToHsluv, luvToLch} from "./space";

function HsluvConvert(o) {
  if (o instanceof Hsluv) return new Hsluv(o.h, o.s, o.v, o.opacity);
  if (!(o instanceof rgb)) o = rgb(o);

  var oRGB = lchToHsluv(luvToLch(xyzToLuv(rgbToXyz([o.r/255,o.g/255,o.b/255]))));
  return new Hsluv(oRGB.h,oRGB.s,oRGB.l, o.opacity);
}

export default function hsluv(h, s, v, opacity) {
  return arguments.length === 1 ? HsluvConvert(h) : new Hsluv(h, s, v, opacity == null ? 1 : opacity);
}

export function Hsluv(h, s, v, opacity) {
  this.h = +h;
  this.s = +s;
  this.v = +v;
  this.opacity = +opacity;
}

var hsluvPrototype = Hsluv.prototype = Object.create(color.prototype);

hsluvPrototype.constructor = Hsluv;

hsluvPrototype.brighter = function(k) {
  k = k == null ? brighter : Math.pow(brighter, k);
  return new Hsluv(this.h, this.s, this.v * k, this.opacity);
};

hsluvPrototype.darker = function(k) {
  k = k == null ? darker : Math.pow(darker, k);
  return new Hsluv(this.h, this.s, this.v * k, this.opacity);
};

hsluvPrototype.rgb = function() {
  var h = isNaN(this.h) ? 0 : this.h % 360 + (this.h < 0) * 360,
      s = isNaN(this.h) || isNaN(this.s) ? 0 : this.s,
      v = this.v,
      a = this.opacity,
      c = v * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = v - c;
  return h < 60 ? hsluv2rgb(c, x, 0, m, a)
      : h < 120 ? hsluv2rgb(x, c, 0, m, a)
      : h < 180 ? hsluv2rgb(0, c, x, m, a)
      : h < 240 ? hsluv2rgb(0, x, c, m, a)
      : h < 300 ? hsluv2rgb(x, 0, c, m, a)
      : hsluv2rgb(c, 0, x, m, a);
};

hsluvPrototype.displayable = function() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s))
      && (0 <= this.v && this.v <= 1)
      && (0 <= this.opacity && this.opacity <= 1);
};

function hsluv2rgb(r1, g1, b1, m, a) {
  return rgb((r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255, a);
}