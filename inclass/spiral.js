//reference http://bl.ocks.org/fabiovalse/81043bf96c6441f4bf72 for original code in v3
//below is in v5

var width = 960,
    height = 500;

var centerX = width/2,
    centerY = height/2,
    radius = 200,
    sides = 2000,
    coils = 5,
    rotation = 0;
    
// How far to step away from center for each side.
var awayStep = radius/sides; 
// How far to rotate around center for each side.
var aroundStep = coils/sides;// 0 to 1 based.
// Convert aroundStep to radians.
var aroundRadians = aroundStep * 2 * Math.PI;
// Convert rotation to radians.
rotation *= 2 * Math.PI;

var spiral = [];

// For every side, step around and away from center.
for(var i=1; i<=sides; i++){
  // How far away from center
  var away = i * awayStep;
  // How far around the center.
  var around = i * aroundRadians + rotation;
  // Convert 'around' and 'away' to X and Y.
  var x = centerX + Math.cos(around) * away;
  var y = centerY + Math.sin(around) * away;
  
  spiral.push({x: x, y: y});
}

console.log(spiral)
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g");

var lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })

svg.append("path")
  .attr("d", lineFunction(new_time))
  .attr("stroke", "gray")
  .attr("stroke-width", 0.5)
  .attr("fill", "none")  

