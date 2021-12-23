Promise.all([d3.csv("time_scale_data.csv"),d3.csv("income_dropout.csv")])
.then(function(data){
	drawDropoutChart(data[1])
	barChart()
})

function drawDropoutChart(data){
	//Width and height
	var w = 800;
	var h = 800;
	var padding = 40;

	var dataset, xScale, yScale, xAxis, yAxis, cScale;  //Empty, for now

	//For converting strings to Dates
	var parseTime = d3.timeParse("%m/%d/%y");

	//For converting Dates to strings
	var formatTime = d3.timeFormat("%e");
			xScale = d3.scaleLinear()
						   .domain([
								0,  //Because I want a zero baseline
								d3.max(data, function(d) {return parseFloat(d["dropout_rate"]); })
							])
						   .range([padding,w-padding]);
   
						   console.log(d3.max(data, function(d) {return d["dropout_rate"]; }))
   
			yScale = d3.scaleLinear()
						   .domain([
								0,  //Because I want a zero baseline
								d3.max(data, function(d) { return parseInt(d["median_income"]); })
							])
						   .range([h - padding, padding]);

			var colorScale =  d3.scaleLinear()
						   .domain([
								0,  //Because I want a zero baseline
								d3.max(data, function(d) { return parseInt(d["median_income"]); })
							])
						   .range(["red","blue"]);


			var rScale =  d3.scaleLinear()
						   .domain([
								0,  //Because I want a zero baseline
								d3.max(data, function(d) { return parseInt(d["dropout_rate"]); })
							])
						   .range([2,10]);

			//TODO: make a linear scale named cScale for the colors you will use
			 //HINT: the domain is the Amount, and the range is an array of 2 colors such as ["red","blue"]

    

			//Define X axis
			xAxis = d3.axisBottom()
							  .scale(xScale)
							  .ticks(9)//TODO: change ticks 

			//Define Y axis
			yAxis = d3.axisLeft()
							  .scale(yScale)
							  .ticks(10);

       

			//Create SVG element
			var svg = d3.select("#chart1")
						.append("svg")
						.attr("width", w)
						.attr("height", h);



			//Generate circles last, so they appear in front
			svg.selectAll("circle")
			   .data(data)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d["dropout_rate"]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d["median_income"]);
			   })
			   .attr("r", function(d){
			   		return rScale(d["dropout_rate"])
			   })
			    .attr("fill",function(d){
				   return colorScale( d["median_income"])
			        //TODO: use your newly created cScale to the amount and return the corresponding color

			    })
			   .attr("opacity",.6)
			   .on("mouseover",function(d){
			   	console.log(d["median_income"], d["dropout_rate"])
			   });

			svg.selectAll("text")
			   .data(data)
			   .enter()
			   .append("text")
			   .attr("x", function(d) {
			   		return xScale(d["dropout_rate"]);
			   })
			   .attr("y", function(d) {
			   		return yScale(d["median_income"]);
			   })
			   .text(function(d){
			   	return d["Geo_NAME"]
			   })
			   .style("font-size","10px")
			   .attr("opacity",.8)

			//Create X axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);

			//Create Y axis
			svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);
}
