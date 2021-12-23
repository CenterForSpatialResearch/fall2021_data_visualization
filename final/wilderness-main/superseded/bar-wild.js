var colors = [
    "#c48b3a",  //BLM
    "#927c41",  //FS
    "#9d6b42",  //FWS
    "#bc422a",  //NPS
    "#f2d59a",  //DOD
    ]

var data_total = [
    {agency: "Bureau of Land Management", acres: 244400000},
    {agency: "Forest Service", acres: 192900000},
    {agency: "Fish and Wildlife Service", acres: 89200000},
    {agency: "National Park Service", acres: 79900000},
    {agency: "Department of Defense", acres: 8800000}
];
    
var data_wilderness = [
    {agency: "Bureau of Land Management", acres: 9986645},
    {agency: "Forest Service", acres: 36670166},
    {agency: "Fish and Wildlife Service", acres: 20702709},
    {agency: "National Park Service", acres: 44337407},
    {agency: "Department of Defense", acres: 0}
];

// set the dimensions and margins of the graph
var margin = {top: 20, right: 60, bottom: 60, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#bar-wild")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(data_total.map(function(d) { return d.agency; }))
.padding(0.2);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 244400000])
    .range([ height, 0]);
svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data) {

var u = svg.selectAll("rect")
    .data(data)

u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
    .attr("x", function(d) { return x(d.agency); })
    .attr("y", function(d) { return y(d.acres); })
    .attr("width", width / 6)
    .attr("height", function(d) { return height - y(d.acres); })
    .attr("fill", function(d, i){
           return colors[i]
       })        
    }

// Initialize the plot with the first dataset
update(data_total)

