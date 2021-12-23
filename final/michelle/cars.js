
            var svgDoc=d3.select("#cars").append("svg").attr("viewBox","0 120 300 255");
            
             //define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
            svgDoc.append("defs")
                .append("g")
                .attr("id","iconCustom")
                .append("path")
                        .attr("d","M.52,2.49A.67.67,0,0,1,0,2a.29.29,0,0,1,.17-.34.84.84,0,0,1,.38-.08l.28,0s.06,0,.08,0l.19-.42c.09-.2.16-.4.26-.59A.87.87,0,0,1,2.2,0H5.93a2,2,0,0,1,.49.06A.86.86,0,0,1,7,.58c.14.32.27.65.4,1v0l.39,0a.81.81,0,0,1,.31.06.29.29,0,0,1,.2.4.64.64,0,0,1-.48.47h0c0,.15.11.31.15.46a3.1,3.1,0,0,1,.12.8c0,.55,0,1.1,0,1.64a2.47,2.47,0,0,1,0,.39.38.38,0,0,1-.37.37,2.23,2.23,0,0,1-.73,0,.36.36,0,0,1-.31-.37c0-.14,0-.29,0-.44V5.24H1.7v.13a3.54,3.54,0,0,1,0,.46.32.32,0,0,1-.29.32,2.26,2.26,0,0,1-.82,0,.33.33,0,0,1-.29-.33c0-.1,0-.2,0-.3V3.71a2.81,2.81,0,0,1,.18-1C.47,2.67.49,2.58.52,2.49Zm3.64.09H6.08l.86,0c.13,0,.19-.07.17-.2A1.19,1.19,0,0,0,7,2.07c-.14-.35-.29-.69-.44-1C6.54.9,6.47.76,6.4.62A.51.51,0,0,0,6,.36l-.2,0H2.42A.58.58,0,0,0,1.9.66,2.69,2.69,0,0,0,1.74,1c-.16.4-.32.8-.47,1.2a.86.86,0,0,0-.06.23c0,.09,0,.14.11.16l.15,0H4.16Zm-2,1v.72H6.13V3.54Zm4.92,0A.45.45,0,0,0,6.67,4a.45.45,0,0,0,.89,0A.44.44,0,0,0,7.12,3.58Zm-5.9,0a.44.44,0,1,0,0,.88A.45.45,0,0,0,1.66,4,.44.44,0,0,0,1.22,3.58Z");
            
            
            //background rectangle
            // svgDoc.append("rect").attr("width",500).attr("height",600);
            
            //specify the number of columns and rows for pictogram layout
            var numCols = 20;
            var numRows = 50;
            
            //padding for the grid
            var xPadding = 10;
            var yPadding = 100;
            
            //horizontal and vertical spacing between the icons
            var hBuffer = 8;
            var wBuffer = 10;
            
            //generate a d3 range for the total number of required elements
            var myIndex=d3.range(numCols*numRows);
            
            //text element to display number of icons highlighted
			
			var countDiv = d3.select("body").append("div").style("position","fixed")
			.style("top","1000px").style("right","30px").style("font-size","100px")
			
			
            countDiv//.append("text")
                .attr("id","txtValue")
                .attr("x",xPadding)
                .attr("y",yPadding)
                .attr("dy",-3)
                .html("0");
 
            //create group element and create an svg <use> element for each icon
            svgDoc.append("g")
                .attr("id","pictoLayer")
                .selectAll("use")
                .data(myIndex)
                .enter()
                .append("use")
                    .attr("xlink:href","#iconCustom")
                    .attr("id",function(d)    {
                        return "icon"+d;
                    })
                    .attr("x",function(d) {
                        var remainder=d % numCols;//calculates the x position (column number) using modulus
                        return xPadding+(remainder*wBuffer);//apply the buffer and return value
                    })
                      .attr("y",function(d) {
                        var whole=Math.floor(d/numCols)//calculates the y position (row number)
                        return yPadding+(whole*hBuffer);//apply the buffer and return the value
                    })
                    .classed("iconPlain",true);
 
 				   document.addEventListener("scroll",function(e){
 				   	var scrollTopCars = document.documentElement.scrollTop-1400
					   //NEW this puts the number of pixels at top left always
                       d3.select("#txtValue").text(Math.round(scrollTopCars));
					  //NEW set max and if scroll is larger than max, then just use the max
					   
					   var maxScroll = 930
					   if(scrollTopCars>maxScroll && scrollTopCars<950){
	                       d3.select("#txtValue").text(maxScroll);
						   
					   }else if(scrollTopCars>950){
						   
	                       d3.select("#txtValue").text("");
					   	
					   }
					   d3.selectAll("use").attr("class", function(d,i){
						   
						   if (d<scrollTopCars && d<maxScroll)  {
							   return "iconSelected";
						   }	else {
							   return "iconPlain";
						   }
					   })
 				   })
 
 
 
            // //create a jquery slider to control the pictogram
  //            $( "#sliderDiv" ).slider({
  //                 orientation: "horizontal",
  //                 min: 0,
  //                 max: 930,
  //                 value: 0,
  //                 slide: function( event, ui ) {
  //                   d3.select("#txtValue").text(ui.value);
  //                   d3.selectAll("use").attr("class",function(d,i){
  //                      if (d<ui.value)  {
  //                          return "iconSelected";
  //                      }    else    {
  //                          return "iconPlain";
  //                      }
  //                   });
  //                 }
  //            });