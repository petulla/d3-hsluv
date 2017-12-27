# d3-hsluv

This module implements the [HSluv](http://www.hsluv.org/) (Hue, Saturation, Lightness) color space.


## Installing

If you use NPM, `npm install d3-hsluv`. Otherwise, download the [latest release](https://github.com/d3/d3-hsluv/releases/latest). You can also load directly from [d3js.org](https://d3js.org) as a [standalone library](https://d3js.org/d3-hsluv.v0.1.min.js). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-color.v1.min.js"></script>
<script src="https://d3js.org/d3-hsluv.v0.1.min.js"></script>
<script>

var yellow = d3.hsluv("yellow"); // {l: 60, u: 1, v: 1, opacity: 1}

</script>
```

[Try d3-hsluv in your browser.](https://tonicdev.com/npm/d3-hsluv)

## API Reference

<a name="hsluv" href="#hsluv">#</a> d3.<b>hsluv</b>(<i>l</i>, <i>u</i>, <i>v</i>[, <i>opacity</i>])<br>
<a href="#hsluv">#</a> d3.<b>hsluv</b>(<i>specifier</i>)<br>
<a href="#hsluv">#</a> d3.<b>hsluv</b>(<i>color</i>)<br>

Constructs a new [hsluv](http://www.hsluv.org/) color. The channel values are exposed as `l`, `u` and `v` properties on the returned instance.

If *l*, *u* and *v* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the hsluv color space. See [d3.color](https://github.com/d3/d3-color#color) for examples. If a [*color*](https://github.com/d3/d3-color#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](https://github.com/d3/d3-color#color_rgb) and then converted to hsluv.
