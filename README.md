Cardinal spline
===============

An HTML5 Canvas extension (JavaScript).

This library extends the 2D context with a new method to enable drawing
of cardinal splines - splines that goes through the defined points.

The method is passed a simple array of points and a line is drawn through
them at given or default tension and segment resolution.

The method is highly optimized for use in performance critical situations.

![Demo snapshot](http://i.imgur.com/V3nuJv0.png?1?9037)

**Example**

    ctx.moveTo(points[0], points[1]);
    ctx.curve(points);

will draw the points in the array which is arranged in this manner:

    [x1, y1, x2, y2, ... xn, yn]

Optionally a tension value can be given:

    ctx.curve(points, 0.5);

as well as a segment resolution value:

    ctx.curve(points, 0.5, 20);

The methods returns an array with the spline points which can be used for
tracking and so forth:

    var splinePoints = ctx.curve(points);

License
-------

This library is released under MIT license and can be used in both
commercial and non-commercial projects as long as the header is included.

&copy; Epistemex 2013-2014