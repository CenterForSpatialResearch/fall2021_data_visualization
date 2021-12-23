

		//interactive charts

var w = 850
var h = 180   
d3.csv("chart/time_temperature_sunlight.csv")
.then(function(data){

    var svg = d3.select("#chart2").append("svg").attr("width",w).attr("height",h)
        dotChart(data,"temperature",svg,"rgb(28,171,226)")
        dotChart(data,"sunlight",svg,"orange")
		// console.log(data)
    })


function dotChart(data,column,svg,color){


var circles = svg.selectAll("circle")
    .enter()
    .append("circle");

circles.attr("cx", 20)
	   .attr("cy", 10)
	   .attr("r", 5);
	   
var max = parseInt(d3.max(data, function(d) { return d[column]; }))+20;
var min = parseInt(d3.min(data, function(d) { return d[column]; }))+3;
        var yScale = d3.scaleLinear()
            .domain([0,100])
            .range([h-30,30])
        var xScale = d3.scaleLinear().domain([0,11]).range([10,w-25])
	
	var cScale=d3.scaleLinear()
	.domain([min,max])
	.range([0.5,1])
	
	console.log(max)
	console.log(min)
   		
		var x = d3.scalePoint()
		 .domain(["Mar","April","May","Jun","July","Apr","Sep","Oct","Nov","Dec","Jan","Feb"])
	.range([10,w-25])
			
        var line = d3.line()
            .x(function(d,i){
                    return xScale(i)
            })
            .y(function(d,i){
                    return yScale(parseInt(d[column]))
            })   

     svg.selectAll(".labels")
			
         .data(data)
         .enter()
         .append("text")
			.style("fill",color)
			.style("font-size","11px")
		 .attr("class",column+"_label")
         .text(function(d){
             return d[column]
         })
         .attr("x",function(d,i){
                    return xScale(i)+6
             })
         .attr("y",function(d){
             return yScale(d[column])+2
         })
 
 
	svg.selectAll("line")
	   .data(data)
	   .enter()
	   .append("line")
	   .attr("x1", function(d,i) {
	   		return xScale(i);
	   })
	   .attr("x2", function(d,i) {
	   		return xScale(i);
	   })
	   .attr("y1", h+5)
	   .attr("y2", function(d) {
	   		return yScale(parseInt(d[column]))+5;
	   })
	   .attr("stroke", "#ddd")
	   .attr("stroke-width", 1);
 
 
     svg.selectAll("."+column)
         .data(data)
         .enter()
         .append("circle")
		 .attr("class",column)
             .attr("cx",function(d,i){
                    return xScale(i)
             })
             .attr("cy",function(d){
             return yScale(parseInt(d[column]))
             })
             .attr("r",5)
             .attr("fill",color)
			 .attr("fill-opacity",function(d){
 				return cScale(parseInt(d[column]+3));
 			})
 	 	   	
 			
			 .on("mouseover",function(d){
	   		d3.select(this)
	   			.attr("r", 8)
				 .attr("fill",color)
				 .attr("stroke","grey")
				 .attr("stroke-opacity",0.1)
			 })
			 
			 .on("mouseout",function(d){
	   		d3.select(this)
	   			.attr("r", 5)
	             .attr("fill",color)
				 .attr("fill-opacity",function(d){
	 				return cScale(d[column]);
			 })
		 })
			 
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (h-20 )+ ")")
			.call(d3.axisBottom(x))
		
			
		console.log(data)
}  