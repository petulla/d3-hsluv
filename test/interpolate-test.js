var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../"),
    hsluv = interpolate.hsluv;

tape("interpolateHsluv(a, b) converts a and b to HSLuv colors", function(test) {
	test.equal(interpolate.interpolateHsluv("steelblue", "brown")(0), color.rgb("steelblue") + "");
	test.equal(interpolate.interpolateHsluv("steelblue", hsluv("brown"))(1), color.rgb("brown") + "");
	test.equal(interpolate.interpolateHsluv("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
	test.end();
});

tape("interpolateHsluv(a, b) interpolates in HSLuv and returns an RGB string", function(test) {
	test.equal(interpolate.interpolateHsluv("steelblue", "#f00")(0.2), "rgb(122, 109, 228)");
	test.equal(interpolate.interpolateHsluv("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(122, 109, 228, 0.84)");
	test.end();
});

tape("interpolateHsluv(a, b) uses the shortest path when interpolating hue", function(test) {
	var i = interpolate.interpolateHsluv(hsluv(10,50,50), hsluv(350,50,50));
	test.equal(i(0.0), "rgb(193, 84, 89)");
	test.equal(i(0.2), "rgb(191, 85, 99)");
	test.equal(i(0.4), "rgb(189, 85, 107)");
	test.equal(i(0.6), "rgb(187, 86, 113)");
	test.equal(i(0.8), "rgb(185, 86, 119)");
	test.equal(i(1.0), "rgb(184, 87, 124)");
	test.end();
});

tape("interpolateHsluv(a, b) uses a’s hue when b’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv("#f60", "#000")(0.5), "rgb(123, 50, 51)");
	test.end();
});

tape("interpolateHsluv(a, b) uses b’s hue when a’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv("#000", "#f60")(0.5), "rgb(123, 50, 51)");
	test.end();
});


tape("interpolateHsluv(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv("#ccc", "#000")(0.5), "rgb(97, 97, 97)");
	test.equal(interpolate.interpolateHsluv("#f00", "#000")(0.5), "rgb(105, 43, 51)");
	test.end();
});

tape("interpolateHsluv(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv("#000", "#ccc")(0.5), "rgb(97, 97, 97)");
	test.equal(interpolate.interpolateHsluv("#000", "#f00")(0.5), "rgb(105, 43, 51)");
	test.end();
});

tape("interpolateHsluv(a, b) uses b’s lightness when a’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv(null, hsluv(16, 100, 57))(0.5), "rgb(255, 64, 4)");
	test.end();
});

tape("interpolateHsluv(a, b) uses a’s lightness when b’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateHsluv(hsluv(16, 100, 57), null)(0.5), "rgb(255, 64, 4)");
	test.end();
});
