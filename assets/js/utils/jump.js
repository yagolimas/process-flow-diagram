/* function jump() {

} */

// var validEdges = [];

function updateLineJumps(state) {

    // graph.view.validEdges.push(state);

    // var pts = state.absolutePoints;
	
    // var changed = state.routedPoints != null;
    // var actual = null;
    
    // if (pts != null && graph.view.validEdges != null &&
    //     mxUtils.getValue(state.style, 'jumpStyle', 'none') !== 'none')
    // {
    //     var thresh = 0.5 * graph.view.scale;
    //     changed = false;
    //     actual = [];
        
    //     // Type 0 means normal waypoint, 1 means jump
    //     function addPoint(type, x, y)
    //     {
    //         var rpt = new mxPoint(x, y);
    //         rpt.type = type;
            
    //         actual.push(rpt);
    //         var curr = (state.routedPoints != null) ? state.routedPoints[actual.length - 1] : null;

    //         return curr == null || curr.type != type || curr.x != x || curr.y != y;
    //     };
        
    //     for (var i = 0; i < pts.length - 1; i++)
    //     {
    //         var p1 = pts[i + 1];
    //         var p0 = pts[i];
    //         var list = [];
            
    //         // Ignores waypoints on straight segments
    //         var pn = pts[i + 2];
            
    //         while (i < pts.length - 2 &&
    //             mxUtils.ptSegDistSq(p0.x, p0.y, pn.x, pn.y,
    //             p1.x, p1.y) < 1 * graph.view.scale * graph.view.scale)
    //         {
    //             p1 = pn;
    //             i++;
    //             pn = pts[i + 2];
    //         }
            
    //         changed = addPoint(0, p0.x, p0.y) || changed;
            
    //         // Processes all previous edges
    //         for (var e = 0; e < graph.view.validEdges.length; e++)
    //         {
    //             var state2 = graph.view.validEdges[e];
    //             var pts2 = state2.absolutePoints;
                
    //             if (pts2 != null && mxUtils.intersects(state, state2))
    //             {
    //                 // Compares each segment of the edge with the current segment
    //                 for (var j = 0; j < pts2.length - 1; j++)
    //                 {
    //                     var p3 = pts2[j + 1];
    //                     var p2 = pts2[j];
                        
    //                     // Ignores waypoints on straight segments
    //                     pn = pts2[j + 2];
                        
    //                     while (j < pts2.length - 2 &&
    //                         mxUtils.ptSegDistSq(p2.x, p2.y, pn.x, pn.y,
    //                         p3.x, p3.y) < 1 * graph.view.scale * graph.view.scale)
    //                     {
    //                         p3 = pn;
    //                         j++;
    //                         pn = pts2[j + 2];
    //                     }
                        
    //                     var pt = mxUtils.intersection(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

    //                     // Handles intersection between two segments
    //                     if (pt != null && (Math.abs(pt.x - p2.x) > thresh ||
    //                         Math.abs(pt.y - p2.y) > thresh) &&
    //                         (Math.abs(pt.x - p3.x) > thresh ||
    //                         Math.abs(pt.y - p3.y) > thresh))
    //                     {
    //                         var dx = pt.x - p0.x;
    //                         var dy = pt.y - p0.y;
    //                         var temp = {distSq: dx * dx + dy * dy, x: pt.x, y: pt.y};
                        
    //                         // Intersections must be ordered by distance from start of segment
    //                         for (var t = 0; t < list.length; t++)
    //                         {
    //                             if (list[t].distSq > temp.distSq)
    //                             {
    //                                 list.splice(t, 0, temp);
    //                                 temp = null;
                                    
    //                                 break;
    //                             }
    //                         }
                            
    //                         // Ignores multiple intersections at segment joint
    //                         if (temp != null && (list.length == 0 ||
    //                             list[list.length - 1].x !== temp.x ||
    //                             list[list.length - 1].y !== temp.y))
    //                         {
    //                             list.push(temp);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
            
    //         // Adds ordered intersections to routed points
    //         for (var j = 0; j < list.length; j++)
    //         {
    //             changed = addPoint(1, list[j].x, list[j].y) || changed;
    //         }
    //     }

    //     var pt = pts[pts.length - 1];
    //     changed = addPoint(0, pt.x, pt.y) || changed;
    // }
    
    // state.routedPoints = actual;
    
    // return changed;
};

function paintLine(c, absPts, rounded, connector) {

    // var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
    //     mxConstants.LINE_ARCSIZE) / 2;
    // var size = (parseInt(mxUtils.getValue(connector.state.style, 'jumpSize',
    //     6)) - 2) / 2 + connector.state.strokewidth;
    // var style = mxUtils.getValue(connector.state.style, 'jumpStyle', 'gap');
    // var f = undefined;
    // var moveTo = true;
    // var last = null;
    // var len = null;
    // var pts = [];
    // var n = null;
    // c.begin();

    // if(connector.state.routedPoints != null)
    // {
    //     for (var i = 0; i < connector.state.routedPoints.length; i++) {
    //         var rpt = connector.state.routedPoints[i];
    //         var pt = new mxPoint(rpt.x / graph.view.scale, rpt.y / graph.view.scale);
    
    //         // Takes first and last point from passed-in array
    //         if (i == 0) {
    //             pt = absPts[0];
    //         }
    //         else if (i == connector.state.routedPoints.length - 1) {
    //             pt = absPts[absPts.length - 1];
    //         }
    
    //         var done = false;
    
    //         // Type 1 is an intersection
    //         if (last != null && rpt.type == 1) {
    //             // Checks if next/previous points are too close
    //             var next = connector.state.routedPoints[i + 1];
    //             var dx = next.x / graph.view.scale - pt.x;
    //             var dy = next.y / graph.view.scale - pt.y;
    //             var dist = dx * dx + dy * dy;
    
    //             if (n == null) {
    //                 n = new mxPoint(pt.x - last.x, pt.y - last.y);
    //                 len = Math.sqrt(n.x * n.x + n.y * n.y);
    //                 n.x = n.x * size / len;
    //                 n.y = n.y * size / len;
    //             }
    
    //             if (dist > size * size && len > 0) {
    //                 var dx = last.x - pt.x;
    //                 var dy = last.y - pt.y;
    //                 var dist = dx * dx + dy * dy;
    
    //                 if (dist > size * size) {
    //                     var p0 = new mxPoint(pt.x - n.x, pt.y - n.y);
    //                     var p1 = new mxPoint(pt.x + n.x, pt.y + n.y);
    //                     pts.push(p0);
    
    //                     connector.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
    
    //                     var f = (Math.round(n.x) < 0 || (Math.round(n.x) == 0
    //                         && Math.round(n.y) <= 0)) ? 1 : -1;
    //                     moveTo = false;
    
    //                     if (style == 'sharp') {
    //                         c.lineTo(p0.x - n.y * f, p0.y + n.x * f);
    //                         c.lineTo(p1.x - n.y * f, p1.y + n.x * f);
    //                         c.lineTo(p1.x, p1.y);
    //                     }
    //                     else if (style == 'arc') {
    //                         f *= 1.3;
    //                         c.curveTo(p0.x - n.y * f, p0.y + n.x * f,
    //                             p1.x - n.y * f, p1.y + n.x * f,
    //                             p1.x, p1.y);
    //                     }
    //                     else {
    //                         c.moveTo(p1.x, p1.y);
    //                         moveTo = true;
    //                     }
    
    //                     pts = [p1];
    //                     done = true;
    //                 }
    //             }
    //         }
    //         else {
    //             n = null;
    //         }
    
    //         if (!done) {
    //             pts.push(pt);
    //             last = pt;
    //         }
    //     }
    // }

    // connector.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
    // c.stroke();    
};