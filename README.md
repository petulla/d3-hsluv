# d3-hsluv

This module implements the [HSluv](http://www.hsluv.org/) (Hue, Saturation, Lightness) color space.

For example, to recreate R’s terrain.colors:

```js
var i0 = d3.interpolateHsluvLong(d3.hsluv(120, 1, 0.65), d3.hsluv(60, 1, 0.90)),
    i1 = d3.interpolateHsluvLong(d3.hsluv(60, 1, 0.90), d3.hsluv(0, 0, 0.95));

function interpolateTerrain(t) {
  return t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2);
}
```

## Installing

If you use NPM, `npm install d3-hsluv`. Otherwise, download the [latest release](https://github.com/d3/d3-hsluv/releases/latest). You can also load directly from [d3js.org](https://d3js.org) as a [standalone library](https://d3js.org/d3-hsluv.v0.1.min.js). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-hsluv.v0.1.min.js"></script>
<script>

var yellow = d3.hsluv("yellow"); // {h: 60, s: 1, v: 1, opacity: 1}

</script>
```

[Try d3-hsluv in your browser.](https://tonicdev.com/npm/d3-hsluv)

## API Reference

<a name="hsluv" href="#hsluv">#</a> d3.<b>hsluv</b>(<i>h</i>, <i>s</i>, <i>v</i>[, <i>opacity</i>])<br>
<a href="#hsluv">#</a> d3.<b>hsluv</b>(<i>specifier</i>)<br>
<a href="#hsluv">#</a> d3.<b>hsluv</b>(<i>color</i>)<br>

Constructs a new [hsluv](http://www.hsluv.org/) color. The channel values are exposed as `h`, `s` and `v` properties on the returned instance.

If *h*, *s* and *v* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the hsluv color space. See [d3.color](https://github.com/d3/d3-color#color) for examples. If a [*color*](https://github.com/d3/d3-color#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](https://github.com/d3/d3-color#color_rgb) and then converted to hsluv.

<a href="#interpolatehsluv">#</a> d3.<b>interpolatehsluv</b>(<i>a</i>, <i>b</i>)<br>

…

<a href="#interpolatehsluvLong">#</a> d3.<b>interpolatehsluvLong</b>(<i>a</i>, <i>b</i>)<br>

…