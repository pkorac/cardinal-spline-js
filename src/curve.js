/*!	Curve extension for canvas 2.0
 *	Epistemex (c) 2013-2014
 *	License: MIT
*/

/**
 * Draws a cardinal spline through given point array. Points must be arranged
 * as: [x1, y1, x2, y2, ..., xn, yn]. It adds the points to the current path.
 *
 * The method continues previous path of the context. If you don't want that
 * then you need to use moveTo() with the first point from the input array.
 *
 * The points for the cardinal spline are returned as a new array.
 *
 * @param {Array} points - point array
 * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
 * @param {Number} [numOfSeg=20] - number of segments between two points (line resolution)
 * @returns {Array} New array with the calculated points that was added to the path
 */
CanvasRenderingContext2D.prototype.curve = function(points, tension, numOfSeg) {

	// options or defaults
	tension = (typeof tension === 'number') ? tension : 0.5;
	numOfSeg = numOfSeg ? numOfSeg : 20;

	var pts,					// clone point array
		res = [],				// result with spline points
		l = points.length,
		t, i,
		cache = [];

	pts = points.slice(0);

	pts.unshift(points[1]);		// copy 1. point and insert at beginning
	pts.unshift(points[0]);		// TODO check if pre-push then concat is faster instead of slice and unshift

	pts.push(points[l - 2], points[l - 1]);	// duplicate end-points

	// cache inner-loop calculations as they are based on t alone
	cache.push([1, 0, 0, 0]);

	for (t = 1; t < numOfSeg; t++) {

		var st = t / numOfSeg,
			st2 = st * st,
			st3 = st2 * st,
			st23 = st3 * 2,
			st32 = st2 * 3;

		cache.push([
			st23 - st32 + 1,	// c1
			st32 - st23,		// c2
			st3 - 2 * st2 + st,	// c3
			st3 - st2			// c4
		]);
	}

	cache.push([0, 1, 0, 0]);

	// calc. points
	for (i = 2; i < l; i += 2) {

		var pt1 = pts[i],
			pt2 = pts[i+1],
			pt3 = pts[i+2],
			pt4 = pts[i+3],

			t1x = (pt3 - pts[i-2]) * tension,
			t1y = (pt4 - pts[i-1]) * tension,
			t2x = (pts[i+4] - pt1) * tension,
			t2y = (pts[i+5] - pt2) * tension;

		for (t = 0; t <= numOfSeg; t++) {

			var c = cache[t];

			res.push(c[0] * pt1 + c[1] * pt3 + c[2] * t1x + c[3] * t2x,
					 c[0] * pt2 + c[1] * pt4 + c[2] * t1y + c[3] * t2y);
		}
	}

	// add lines to path
	for(i = 0, l = res.length; i < l; i += 2)
		this.lineTo(res[i], res[i+1]);

	return res;
};
