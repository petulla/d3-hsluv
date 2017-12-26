import color, {hue} from "./color";
import colorHsv from "./hsluv";

function hsluv(hue) {
  return function(start, end) {
    var h = hue((start = colorHsv(start)).h, (end = colorHsluv(end)).h),
        s = color(start.s, end.s),
        v = color(start.v, end.v),
        opacity = color(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.v = v(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

export default hsluv(hue);
export var hsluvLong = hsluv(color);