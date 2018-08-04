var tape = require("tape"),
		color = require("d3-color"),
		interpolate = require("../"),
		hsluv = interpolate.hsluv;

tape("interpolateHsluvLong(a, b) converts a and b to HSLuv colors", function(test) {
	test.equal(interpolate.interpolateHsluvLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
	test.equal(interpolate.interpolateHsluvLong("steelblue", hsluv("brown"))(1), color.rgb("brown") + "");
	test.equal(interpolate.interpolateHsluvLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
	test.end();
});

tape("interpolateHsluvLong(a, b) interpolates in HSLuv and returns an RGB string", function(test) {
	test.equal(interpolate.interpolateHsluvLong("steelblue", "#f00")(0.2), "rgb(59, 137, 140)");
	test.equal(interpolate.interpolateHsluvLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(59, 137, 140, 0.84)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses the shortest path when interpolating hue", function(test) {
	var i = interpolate.interpolateHsluvLong(hsluv(10,50,50), hsluv(350,50,50));
	test.equal(i(0.0), "rgb(193, 84, 89)");
	test.equal(i(0.2), "rgb(126, 120, 82)");
	test.equal(i(0.4), "rgb(84, 128, 104)");
	test.equal(i(0.6), "rgb(87, 125, 135)");
	test.equal(i(0.8), "rgb(140, 101, 185)");
	test.equal(i(1.0), "rgb(184, 87, 124)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses a’s hue when b’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong("#f60", "#000")(0.5), "rgb(123, 50, 51)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses b’s hue when a’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong("#000", "#f60")(0.5), "rgb(123, 50, 51)");
	test.end();
});


tape("interpolateHsluvLong(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong("#ccc", "#000")(0.5), "rgb(97, 97, 97)");
	test.equal(interpolate.interpolateHsluvLong("#f00", "#000")(0.5), "rgb(105, 43, 51)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong("#000", "#ccc")(0.5), "rgb(97, 97, 97)");
	test.equal(interpolate.interpolateHsluvLong("#000", "#f00")(0.5), "rgb(105, 43, 51)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses b’s lightness when a’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong(null, hsluv(16, 100, 57))(0.5), "rgb(255, 64, 4)");
	test.end();
});

tape("interpolateHsluvLong(a, b) uses a’s lightness when b’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateHsluvLong(hsluv(16, 100, 57), null)(0.5), "rgb(255, 64, 4)");
	test.end();
});
