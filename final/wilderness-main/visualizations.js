Promise.all([
    d3.csv("chronology/wild-per-year.csv"),     //0
    d3.csv("units/wild-units-new.csv"),         //1
    d3.csv("states/agency-per-state.csv"),      //2
    d3.csv("states/wild-per-state.csv"),        //3
    d3.csv("introduction/fed-total.csv")        //4
    ])
        .then(function(data){
            drawChronology(data[0])
            drawUnits(data[1])
            drawStates()
            // drawBarTotal(data[4])
        });



    
///// CHRONOLOGY SCATTERPLOT
function drawChronology(data){

        // chart width and height
		var w = 1200;
		var h = 600;
		var padding = 80;
			
		var dataset, xScale, yScale, xAxis, yAxis;  // empty

		// console.log(data);

        xScale = d3.scaleLinear()
            .domain([
                d3.min(data, function(d){
                    return parseInt(d["year"] - 1);
                }),
                d3.max(data, function(d){
                    return parseInt(d["year"]);
                })
            ])
            .range([padding, w - padding]);

            // console.log(d3.max(data, function(d) {return d["year"]}))
                
        yScale = d3.scaleLinear() 
            .domain([
                -700,
                d3.max(data, function(d){ 
                    return parseInt(d["acres-designated"].split(",").join(""));
                })
            ])
            .range([h - padding, padding])

                
        var rScale = d3.scaleLinear()
            .domain([
                d3.min(data, function(d){
                    return parseInt(d["acres-designated"].split(",").join(""));
                })
                ,
                d3.max(data, function(d){
                    return parseInt(d["acres-designated"].split(",").join(""));
                })
            ])
            .range([2,80]);
                   
                    
        //define X axis
		xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(30) //45 values in array
            .tickFormat(d3.format("d"))

		//define Y axis
		yAxis = d3.axisLeft()
			.scale(yScale)
			.ticks(30);
                                  

		//create SVG element
		var svg = d3.select("#chronology-plot")
			.append("svg")
			.attr("width", w)
			.attr("height", h)        
                    

        //create circles
            svg.selectAll("circle")
			    .data(data)
			    .enter()
			    .append("circle")
			    .attr("cx", function(d) {
                // console.log(parseInt(d["year"]))
                    return xScale(parseInt(d["year"]));
			    })
				.attr("cy", function(d, i) { //WHY ADD i HERE?
                    return yScale(d["acres-designated"].split(",").join(""));
				})
				.attr("r", function(d){
                // console.log([d["acres-designated"], rScale(d["acres-designated"])])
				// return 5
                    return rScale(Math.abs(d["acres-designated"].split(",").join("")))
                })

                // circle colors
                .style("fill", function(d){
                //console.log(d)
                    if(d.party== "Democratic"){
                        return "blue"
                    }else{
                        return "red"
                    }
                })
                .style("cursor", "pointer")

                //show tooltip
                .on("mouseover", function(d){

                var xPosition = parseFloat(d3.select(this).attr("cx"));
                var yPosition = parseFloat(d3.select(this).attr("cy"));
                        
                d3.select("#tooltipChronology").style("visibility","visible")
                d3.select("#tooltipChronology")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#year")
                    .text(d.year) 
                d3.select("#tooltipChronology")
                    .select("#laws")
                    .text(d.legislation)
                d3.select("#tooltipChronology")
                    .select("#acres-designated")
                    .text(d["acres-designated"] + " acres");
                })

                //hide tooltip
                .on("mouseout",function(d,i){
				   d3.select("#tooltipChronology").classed("hidden", true)
                   d3.select("#tooltipChronology").style("visibility","hidden");
                })                
            
                //create x axis
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (h - padding) + ")")
                    .call(xAxis)
                    .style("stroke", 0);
			
			    // //create Y axis
			    // svg.append("g")
                //     .attr("class", "axis")
                //     .attr("transform", "translate(" + padding + ",0)")
                //     .call(yAxis);

            };




///// UNITS SCATTERPLOT
function drawUnits(data){

// chart width and height
var w = 1200;
var h = 600;
var padding = 80;

var colorDictionary = {
        BLM: "#c48b3a",
        FS: "#927c41",
        FWS: "#9d6b42",
        NPS: "#bc422a",
        DOD: "#f2d59a"
    }

var dataset, xScale, yScale, xAxis, yAxis, cScale;  // empty

    xScale = d3.scaleLinear()
        .domain([
            d3.min(data, function(d){
                return parseFloat(d["year"]) - 1;
            }),
            d3.max(data, function(d){
                return parseFloat(d["year"]);
            })
        ])
        .range([padding, w - padding]);

        // console.log(d3.max(data, function(d) {return d["year"]}))
    
    yScale = d3.scaleLinear() 
        .domain([
            -30,
            d3.max(data, function(d){ 
                return Math.sqrt(parseInt(d["Unit_acres"].split(",").join("")));
            })
        ])
        .range([h - padding, padding])

    
    var rScale = d3.scaleLinear()
        .domain([
        //     d3.min(data, function(d){
        //         return parseInt(d["Unit_acres"].split(",").join(""));
        //     })
            0
            ,
            d3.max(data, function(d){
                return parseInt(d["Unit_acres"].split(",").join(""));
            })
        ])
        .range([2,80]);
       
        
    //define X axis
    xAxis = d3.axisBottom()
                      .scale(xScale)
                      .ticks(30) //45 values in array
                      .tickFormat(d3.format("d"))

    //define Y axis
    yAxis = d3.axisLeft()
                      .scale(yScale)
                      .ticks(30);
                      

    //create SVG element
    var svg = d3.select("#units-plot")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
    

    //create circles
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", function(d, i) {
        // console.log(parseInt(d["year"]))
            // return xScale(parseInt(d["year"]));
            if (i%2) {
                return xScale(parseInt(d["year"]))
            }else{
                return xScale(parseInt(d["year"])) + 6
            }
       })
       .attr("cy", function(d, i) { 
            return yScale(Math.sqrt(d["Unit_acres"].split(",").join("")));
       })
       .attr("r", function(d){
        // console.log([d["acres-designated"], rScale(d["acres-designated"])])
        // return 5
            return rScale(d["Unit_acres"].split(",").join(""))
        })
        .style("cursor", "pointer")


        // circle colors
       .style("fill", function(d){
            return colorDictionary[d.Agency]
       })
       .style("opacity", .75)


        //show tooltip
        .on("mouseover", function(d){

            var xPosition = parseFloat(d3.select(this).attr("cx"));
            var yPosition = parseFloat(d3.select(this).attr("cy"));
            d3.select("#tooltipUnits").style("visibility","visible")
            d3.select("#tooltipUnits")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#year")
                .text(d.year) 
            d3.select("#size")
                .text(d.Unit_acres + " acres")
            d3.select("#name")
                .text(d.Name);
        })

        //hide tooltip
        .on("mouseout",function(d,i){
           d3.select(this).attr("fill","black")
           d3.select("#tooltipUnits").classed("hidden", true)
           d3.select("#tooltipUnits").style("visibility","hidden");
        })


    //create x axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    //create Y axis <-- MESSED UP BECAUSE xScale SQRT 
    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + padding + ",0)")
    //     .call(yAxis);

};



///// STATE DONUTS
function drawStates(data){

    var w = 200
    var h = 200
    var margin = 20
    var radius = Math.min(w, h) / 2 - margin
    
    // loading data from two files 
    var dataset1 = d3.csv("states/agency-per-state.csv")
    var dataset2 = d3.csv("states/wild-per-state.csv")
    
Promise.all([dataset1,dataset2])

.then(function(data){
    console.log(data[0])
    console.log(data[1])

    for(var i = 0; i<data[0].length; i++){
        var svg = d3.select("#state-donuts").append("svg").attr("width",w).attr("height",h)

    var colors1 = [
        "#c48b3a",  //BLM
        "#927c41",  //FS
        "#9d6b42",  //FWS
        "#bc422a",  //NPS
        "#f2d59a",  //DOD
        "#D4D4D4"   //other
    ]
    var colors2 = ["#000000", "#D4D4D4"] 

    pieChart(data[0][i],"outer",60,radius,svg,colors1,200)
    pieChart(data[1][i],"inner",40,58,svg,colors2,200)

    // console.log(data[0][i]["State"])
    // console.log(data[1][i]["State"])

    svg.append("text")
        .text(data[0][i]["State"])
        .attr("x", w/2)
        .attr("y", h/2)
        .attr("text-anchor", "middle")
    // ADD OVERFLOW FOR LONGER NAMES?
    
    // ADD TOTAL ACREAGE OF STATE TOO  
    // svg.append("text")
    //     .text(data[1][i]["wilderness_acres"+"non-wilderness"])
    //     .attr("x", w/2)
    //     .attr("y", (h/2) + 15)
    //     .attr("text-anchor", "middle")
    //     .style("font-size", ".75em")
    
    }
    
})


function pieChart(data,className,inner,outer,svg,colors,x){
    //  console.log(data)  
    var pie = d3.pie();
    var arc = d3.arc().innerRadius(inner).outerRadius(outer)
  
    var array = []

    // statement to filter out column headings
    var labels=[]
    for(var d in data){
        if(d!="State"){
            labels.push(d)
            array.push(data[d])
        }
        }
    
    //.log(data)
    // create arcs
    var arcs = svg.selectAll("g.arc")
        .data(pie(array))
        .enter()
        .append("g")
        .attr("transform", "translate(" + x/2+ "," + h/2 + ")")
        .append("path")
        .attr("fill", function(d, i) {
                return colors[i];
        })
        .attr("d", arc)

        .on("mouseover", function(d,i) {
            // console.log(d,i)
            d3.select("#tooltipStates").style("visibility","visible")
            d3.select("#agency-name").html(labels[i])
            d3.select("#acreage").html(d.data)
            d3.select(this)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2)
            d3.select("#tooltipStates")
            .style("position","fixed")
            .style("left",event.clientX+"px")
            .style("top",event.clientY+"px")
        })

        .on("mouseout", function(d,i) {
            d3.select(this)
                .attr("stroke-width", 0);
            d3.select("#tooltipStates")
                .classed("hidden", true);
            d3.select("#tooltipStates").style("visibility","hidden")        
        })

}
};



///// BAR-TOTAL 
// function drawBarTotal(data){

//     // chart width and height
//     var w = 1000;
//     var h = 300;
//     var barPadding = 5
//     var margin = 200
//     var xMargin = 40

//     var dataset; 

//     var colors = [
//     "#d4d4d4",	//non-federal
//     "#c48b3a",  //BLM
//     "#927c41",  //FS
//     "#9d6b42",  //FWS
//     "#bc422a",  //NPS
//     "#f2d59a",  //DOD
//     "#000000"   //other
//     ]

//     var xScale = d3.scaleLinear().domain([
//         0
//         ,
//         d3.max(dataset, function(d){return parseInt(d.TotalAcres);})
//         ])
//         .range([0,w])

//     var xAxis = d3.axisBottom()
//         .scale(xScale)
//         .ticks(10)

//     // SVG element
//     var svg = d3.select("#bar-total")
//                 .append("svg")
//                 .attr("width", w)
//                 .attr("height", h+xMargin);

//     // create bars			
//     svg.selectAll("rect")
//         .data(dataset)
//         .enter()
//         .append("rect")
//         .attr("y", function(d, i) {
//             return i * (h / dataset.length)
//         })
//         .attr("x", function(d) {
//                 return 0 + margin
//         })
//         .attr("height", h / dataset.length - barPadding)
//         .attr("width", function(d) {
//                 return xScale(d.TotalAcres)
//         })
//         .attr("fill", function(d, i){
//             return colors[i]
//         })

//     svg.selectAll("labels")
//         .data(dataset)
//         .enter()
//         .append("text")
//         .text(function(d){
//             return d.Agency;
//         })
//         .attr("y", function(d, i) {
//             return (i * (h / dataset.length)) +28 // HOW DO I CENTER TEXT IN MIDDLE OF BAR?
//         })
//         .attr("x", margin - 10)
//         .attr("text-anchor", "end")

//     // xAXIS 
//     svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + margin +"," + h + ")")			   
//         .call(xAxis)

// };
