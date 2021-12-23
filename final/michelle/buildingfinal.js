//practice one
// set the dimensions and margins of the graph
var margin = {top: 20, right: 100, bottom: 100, left: 100},
    width = 1400 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svgBuilding = d3.select("#part1").attr("viewBox", "0 0 600 400")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
		.style("display", "block")
		// .style("margin", "auto")
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
		

//Read the data
d3.csv("Buildings_cleaned1.csv", function(data) {
//	console.log(data)
	data.sort(function(a,b){
		return a["Source_EUI"]-b["Source_EUI"]
	})
	
	var topbuild = data.slice(-10)
	//console.log(topbuild)
  // Add X axis
  var x = d3.scaleLinear()
    //.domain([0, 0])
    .range([ 0, width])
	
  svgBuilding.append("g")
    .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "0")
	
	


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, Math.sqrt(10700)])
    .range([ height, 0]);
  svgBuilding.append("g")
    .call(d3.axisLeft(y))
	.attr("font-family", "Montserrat")
	.attr("font-size", "14");
	

  var tooltip = d3.select("#part1")
    .append("div")
	.attr("id","tooltip")
  //  .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
	.style("font-family", "Montserrat")
	.style("z-index",999)

	var mouseover = function(d) {
		//console.log(d["Source_EUI"])
	    tooltip
	      .style("opacity", 1)
	  }

	var mousemove = function(d) {
	    tooltip
	      .html(d["Source_EUI"] + " kBtu/ft2")
		.style("left",event.clientX+"px")
		.style("top",event.clientY+"px")
	      // .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
	     // .style("top", (d3.mouse(this)[1]) + "px")
	  }

	  var mouseleave = function(d) {
	    tooltip
	      .transition()
	      .duration(800)
	      .style("opacity", 0)
	  }
  x.domain([1800, 2021])
	  

  svgBuilding//.append('g')
    .selectAll(".topbuildinglabel")
    .data(topbuild)
    .enter()
    .append("text")
	  .attr("class","topbuildinglabel")
      .attr("x", function (d) {return x(d.Year_Built); } )
      .attr("y", function (d) {return y(Math.sqrt(d.Source_EUI)); } )
	  .attr("font-family", "Montserrat")
      .text(function (d) { return d["Property Name"] })









  // Add dots
  svgBuilding.append('g')
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Year_Built); } )
      .attr("cy", function (d) { return y(d.Source_EUI); } )
      .attr("r", 4)
	  .attr("class","dot")
	  .attr("opacity", .3)
      .style("fill", "#daa520")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

  // new X axis
  svgBuilding.select(".myXaxis")
    .transition()
    .duration(500)
    .attr("opacity", "1")
	.attr("font-family", "Montserrat")
	.attr("font-size", "14")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));


svgBuilding.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width/2 + margin.left)
    .attr("y", height + 50 )
    .attr("font-family", "Montserrat")
	.attr("font-size", "18")
	.text("Year");
	
svgBuilding.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
 	.attr("y", -margin.left+30)
    .attr("x",0 - (height / 2))
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
	.attr("font-family", "Montserrat")
	.attr("font-size", "18")
    .text("Energy Usage Intensity");


  svgBuilding.selectAll("circle")
    /*
    .transition()
        .delay(function(d,i){return(i)})
        .duration(2000)*/
    
    .attr("cx", function (d) { return x(d.Year_Built); } )
    .attr("cy", function (d) { return y(Math.sqrt(d.Source_EUI)); } )
})
