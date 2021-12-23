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
            "#000000"   //other
        ]
        var colors2 = ["#D4D4D4", "#000000"] 

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
                console.log(d,i)
                d3.select("#agency-name").html(labels[i])
                d3.select("#acreage").html(d.data)
                d3.select(this)
                    .attr("stroke", "#ffffff")
                    .attr("stroke-width", 2)
                d3.select("#tooltipStates")
                .style("position","fixed")
                .style("left",event.clientX+"px")
                .style("top",event.clientY+"px")
                .style("background-color", "white")
            })

            .on("mouseout", function(d,i) {
                d3.select(this)
                .attr("stroke-width", 0);
            })


            // // BROWSER TOOLTIP WORKS (FOR THE MOST PART)
            // // browser tooltip
            // .append("title")
            // .attr("class",column+"_label")
            // .text(function(d){
            //     return d.data + " acres"; //HOW DO I ALSO ADD THE COLUMN NAME (AGENCY)?
            // })

    }
