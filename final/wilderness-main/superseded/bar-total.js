// chart width and height
var w = 1000;
var h = 300;
var barPadding = 5
var margin = 200
var xMargin = 40

var dataset; 

var colors = [
"#d4d4d4",	//non-federal
"#c48b3a",  //BLM
"#927c41",  //FS
"#9d6b42",  //FWS
"#bc422a",  //NPS
"#f2d59a",  //DOD
"#000000"   //other
]

//loading data
Promise.all([d3.csv("introduction/fed-total.csv")])
.then(function(data){	
drawBarTotal(data[0])
})


function drawBarTotal(dataset){

var xScale = d3.scaleLinear().domain([
    0
    ,
    d3.max(dataset, function(d){return parseInt(d.TotalAcres);})
    ])
    .range([0,w])

var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(10)

// SVG element
var svg = d3.select("#bar-total")
            .append("svg")
            .attr("width", w)
            .attr("height", h+xMargin);

// create bars			
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("y", function(d, i) {
       return i * (h / dataset.length)
   })
   .attr("x", function(d) {
           return 0 + margin
   })
   .attr("height", h / dataset.length - barPadding)
   .attr("width", function(d) {
           return xScale(d.TotalAcres)
   })
   .attr("fill", function(d, i){
       return colors[i]
   })

svg.selectAll("labels")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d){
       return d.Agency;
   })
   .attr("y", function(d, i) {
       return (i * (h / dataset.length)) +28 // HOW DO I CENTER TEXT IN MIDDLE OF BAR?
   })
    .attr("x", margin - 10)
       .attr("text-anchor", "end")
    
    // ACREAGE LABEL
    // .text(function(d){
    // 	return d.TotalAcres;
    // })
    // .attr("x", xScale(d.TotalAcres + 10))
    // .attr("text-anchor", "start")

// xAXIS ISN'T SHOWING UP...
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + margin +"," + h + ")")			   
   .call(xAxis)

}