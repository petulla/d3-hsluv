var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hsluvEqual = function(actual, l, u, v, opacity) {
  this._assert(actual instanceof color.hsluv
      && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
      && (isNaN(u) ? isNaN(actual.u) && actual.u !== actual.u : u - 1e-6 <= actual.u && actual.u <= u + 1e-6)
      && (isNaN(v) ? isNaN(actual.v) && actual.v !== actual.v : v - 1e-6 <= actual.v && actual.v <= v + 1e-6)
      && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
    message: "should be equal",
    operator: "hsluvEqual",
    actual: [actual.l, actual.u, actual.v, actual.opacity],
    expected: [l, u, v, opacity]
  });
};