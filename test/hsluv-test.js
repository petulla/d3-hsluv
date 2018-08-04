var tape = require("tape"),
    d3_color = require("d3-color"),
    d3_hsluv = require("../");

require("./hsluvEqual");
require("./rgbEqual");

tape("hsluv(…) returns an instance of hsluv and color", function(test) {
  var c = d3_hsluv.hsluv(120, 0.4, 0.5);
  test.ok(c instanceof d3_hsluv.hsluv);
  test.ok(c instanceof d3_color.color);
  test.equal(c.constructor.name, "Hsluv");
  test.end();
});

tape("hsluv(…) exposes h, s, and l channel values and opacity", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("#abc"), 237.8523, 25.80045, 75.10529, 1);
  test.end();
});

tape("hsluv.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(d3_hsluv.hsluv("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(d3_hsluv.hsluv("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(d3_hsluv.hsluv("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(d3_hsluv.hsluv(d3_color.rgb("rgb(12, 34, 56)")) + "", "rgb(12, 34, 56)");
  test.equal(d3_hsluv.hsluv(d3_hsluv.hsluv("rgba(102, 102, 0, 0.4)")) + "", "rgba(102, 102, 0, 0.4)");
  test.end();
});

tape("hsluv.toString() reflects l, u and v channel values and opacity", function(test) {
  var c = d3_hsluv.hsluv("#abc");
  c.l += 100, c.u += 10, c.v -= 10, c.opacity = 0.4;
  test.equal(c + "", "rgba(198, 142, 169, 0.4)");
  test.end();
});

tape("hsluv.toString() treats undefined channel values as 0", function(test) {
  test.equal(d3_hsluv.hsluv("invalid") + "", "rgb(0, 0, 0)");
  test.equal(d3_hsluv.hsluv("#000") + "", "rgb(0, 0, 0)");
  test.equal(d3_hsluv.hsluv("#ccc") + "", "rgb(204, 204, 204)");
  test.equal(d3_hsluv.hsluv("#fff") + "", "rgb(255, 255, 255)");
  test.equal(d3_hsluv.hsluv(NaN, 0.0, 0.4) + "", "rgb(1, 1, 1)"); // equivalent to hsluv(0, 0, 0.4)
  test.equal(d3_hsluv.hsluv(120, NaN, 0.4) + "", "rgb(1, 1, 1)");
  test.equal(d3_hsluv.hsluv(NaN, NaN, 0.4) + "", "rgb(1, 1, 1)");
  test.equal(d3_hsluv.hsluv(120, 0.5, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hsluv(120, 0.5, 0)
  test.end();
});

tape("hsluv.toString() treats undefined opacity as 1", function(test) {
  var c = d3_hsluv.hsluv("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("hsluv(h, c, g) does not wrap hue to [0,360)", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
  test.end();
});

tape("hsluv(l, u, v) does not clamp u and v channel values to [0,1]", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
  test.end();
});

tape("hsluv(l, u, v, opacity) does not clamp opacity to [0,1]", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
  test.end();
});

tape("hsluv(l, u, v) coerces channel values to numbers", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("120", ".4", ".5"), 120, 0.4, 0.5, 1);
  test.end();
});

tape("hsluv(l, u, v, opacity) coerces opacity to number", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  test.hsluvEqual(d3_hsluv.hsluv(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
  test.end();
});

tape("hsluv(l, u, v) allows undefined channel values", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.hsluvEqual(d3_hsluv.hsluv(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(42, undefined, 0.5), 42, NaN, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(42, 0.4, undefined), 42, 0.4, NaN, 1);
  test.end();
});

tape("hsluv(l, u, v, opacity) converts undefined opacity to 1", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  test.hsluvEqual(d3_hsluv.hsluv(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
  test.end();
});

tape("hsluv(l, u, v) preserves explicit hue, even for grays", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(0, 0, 0), 0, 0, 0, 1);
  test.hsluvEqual(d3_hsluv.hsluv(42, 0, 0.5), 42, 0, 0.5, 1);
  test.hsluvEqual(d3_hsluv.hsluv(118, 0, 1), 118, 0, 1, 1);
  test.end();
});

tape("hsluv(l, u, v) preserves explicit saturation, even for white or black", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(0, 0, 0), 0, 0, 0, 1);
  test.hsluvEqual(d3_hsluv.hsluv(0, 0.18, 0), 0, 0.18, 0, 1);
  test.hsluvEqual(d3_hsluv.hsluv(0, 0.42, 1), 0, 0.42, 1, 1);
  test.hsluvEqual(d3_hsluv.hsluv(0, 1, 1), 0, 1, 1, 1);
  test.end();
});

tape("hsluv(format) parses the specified format and converts to hsluv", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("#abcdef"), 239.8087, 69.11436, 81.04448, 1);
  test.hsluvEqual(d3_hsluv.hsluv("#abc"), 237.8523, 25.80045, 75.10529, 1);
  test.hsluvEqual(d3_hsluv.hsluv("rgb(12, 34, 56)"), 247.3614, 80.33178, 12.65677, 1);
  test.hsluvEqual(d3_hsluv.hsluv("rgb(12%, 34%, 56%)"), 249.4946, 88.58912, 36.04142, 1);
  test.hsluvEqual(d3_hsluv.hsluv("aliceblue"), 233.4799, 100, 97.17878, 1);
  test.hsluvEqual(d3_hsluv.hsluv("transparent"), NaN, NaN, NaN, 0);
  test.end();
});

tape("hsluv(format) returns undefined channel values for unknown formats", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hsluv(hsluv) copies an hsluv color", function(test) {
  var c1 = d3_hsluv.hsluv("hsla(120, 30%, 50%, 0.4)"),
      c2 = d3_hsluv.hsluv(c1);
  test.hsluvEqual(c1, 127.715, 62.35914, 61.69085, 0.4);
  c1.l = c1.u = c1.v = c1.opacity = 0;
  test.hsluvEqual(c1, 0, 0, 0, 0);
  test.hsluvEqual(c2, 127.715, 62.35914, 61.69085, 0.4);
  test.end();
});

tape("hsluv(rgb) converts from RGB", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv(d3_color.rgb(255, 0, 0, 0.4)), 12.17705, 100, 53.23712, 0.4);
  test.end();
});

tape("hsluv(color) returns zero hue and zero saturation for grays", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("gray"), 0, 1.903044e-12, 53.58501, 1);
  test.hsluvEqual(d3_hsluv.hsluv("#ccc"), 0, 1.016426e-11, 82.04578, 1);
  test.hsluvEqual(d3_hsluv.hsluv(d3_color.rgb("gray")), 0, 1.903044e-12, 53.58501, 1);
  test.end();
});

tape("hsluv(color) returns 0 hue and saturation for black and white", function(test) {
  test.hsluvEqual(d3_hsluv.hsluv("black"), 0, 0, 0, 1);
  test.hsluvEqual(d3_hsluv.hsluv("#000"), 0, 0, 0, 1);
  test.hsluvEqual(d3_hsluv.hsluv("white"), 0, 0, 100, 1);
  test.hsluvEqual(d3_hsluv.hsluv("#fff"), 0, 0, 100, 1);
  test.hsluvEqual(d3_hsluv.hsluv(d3_color.rgb("#fff")), 0, 0, 100, 1);
  test.end();
});

tape("hsluv(color) converts from another colorspace via d3_color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(d3_color.color.prototype);
  TestColor.prototype.rgb = function() { return d3_color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hsluvEqual(d3_hsluv.hsluv(new TestColor), 247.3614, 80.33178, 12.65677, 0.4);
  test.end();
});

tape("hsluv.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", function(test) {
  test.equal(d3_hsluv.hsluv("white").displayable(), true);
  test.equal(d3_hsluv.hsluv("red").displayable(), true);
  test.equal(d3_hsluv.hsluv("black").displayable(), true);
  test.equal(d3_hsluv.hsluv("invalid").displayable(), false);
  test.equal(d3_hsluv.hsluv(NaN, NaN, 1).displayable(), false);
  test.equal(d3_hsluv.hsluv(120, -0.5, 0).displayable(), false);
  test.equal(d3_hsluv.hsluv(370, 1.5, 0).displayable(), false);
  test.equal(d3_hsluv.hsluv(0, 1, 1, 0).displayable(), true);
  test.equal(d3_hsluv.hsluv(0, 1, 1, 1).displayable(), true);
  test.equal(d3_hsluv.hsluv(0, 1, 1, -0.2).displayable(), false);
  test.equal(d3_hsluv.hsluv(0, 1, 1, 1.2).displayable(), false);
  test.end();
});

tape("hsluv.rgb() converts to RGB", function(test) {
  var c = d3_hsluv.hsluv(85.87432, 100, 97.13855, 0.4);
  test.rgbEqual(c.rgb(), 255, 255, 0, 0.4);
  test.end();
});
