
var svgDoc=d3.select("#chrysler").append("svg").attr("viewBox","0 30 200 200");
				//NEW code for defining a gradient - there are many ways, this is the shortest I know.
				//You can fill any shape with a gradient, usually those are fuzzy, but here I am making the stops for different colors very close together - 1%, so that it looks like it is filling in a color
				var defs = svgDoc.append("defs");
				var linearGradient = defs.append("linearGradient")
				.attr("x1","100%")
				.attr("y1","0%")
				.attr("x2","100%")
				.attr("y2","100%")
				
				.attr("id", "Gradient");//this is the id of the gradien that we refer to below
				
				linearGradient
				    .append("stop")
					.attr("id","bluePart")
				    .attr("offset", "40%")
				.attr("stop-color", "#daa520");//first color
					
				linearGradient
				    .append("stop")
					.attr("id","goldPart")
				    .attr("offset", "41%")
				    .attr("stop-color", "#bfd4db");//2nd color
					
				
				//END OF GRADIENT DEFINE
				
             //define an icon store it in svg <defs> elements as a reusable component - this geometry can be generated from Inkscape, Illustrator or similar
            svgDoc.append("defs")
                .append("g")
                .attr("id","iconCustom2")
                .append("path")
			.attr('fill', 'url(#Gradient)') //NEW this line sets the fill of the shape to the graident above
					 .attr("d","M45.05,109.06c-11.56,0-21.1,16.41-22.8,37.82,5-11.41,13.14-18.85,22.4-18.85h-3c.65-3,2-8.9,2.6-11.85L46.86,128H44.65a17.55,17.55,0,0,1,4,.47l-.85-.31,6.5-10.25c-.4,3-1.2,9-1.59,12,6.25,2.94,11.78,9.17,15.28,17.43C67.55,125.71,56.69,109.06,45.05,109.06Zm-6.74,20-2.45.89-1.6-12,6.5,10.25Zm38.13,65.34c-4-51.81-59.57-51.78-63.58,0h-.21v19.76h.21c1.08-13.1,6.22-24.47,13.61-31.6-1-1-4.95-4.52-6.06-5.55l9.15,2.91c.65-.48,1.3-.94,2-1.36l-4.77-9.12,9,6.94c.36-.14.72-.26,1.08-.39l-1.53-11.48,6.5,10.24-.28.1a23,23,0,0,1,3.11-.21H42.44c.65-2.95,2-8.9,2.6-11.85l2.61,11.85h-3a23.82,23.82,0,0,1,4.56.45l-.94-.34,6.51-10.25-1.57,11.76.83.34,9.29-7.16-5,9.51c.54.36,1.08.74,1.6,1.14L69.69,177l-6.49,5.91c7.19,7.16,12.18,18.36,13.23,31.23h.22V194.42Zm-31.79-64c-14.9-.59-27.8,21.47-27.27,43.33,3.3-7.34,8.06-13.26,13.71-17l-4.84-9.26,9.07,7c.43-.18.85-.35,1.26-.54-.38-2.85-1.16-8.65-1.53-11.51,1.57,2.49,4.75,7.5,6.34,10,.36-.06.73-.12,1.11-.16.63-2.88,1.91-8.7,2.54-11.59.64,2.92,1.93,8.79,2.58,11.7l1,.19L55,142.42c-.39,3-1.18,8.87-1.57,11.81l1.05.44,9.32-7.17c-1.24,2.36-3.8,7.26-5,9.6,5.43,3.75,10,9.59,13.1,16.78C73.62,151.91,60,129.85,44.65,130.4Zm1.07-23.7c4.29.18,8.38,2.63,11.81,6.72,2.55-41.18-27.83-40.34-24.93.34C36.46,109.13,41,106.51,45.72,106.7ZM41.1,43.47h7.11v19H41.1ZM48.5,64H40.81l-2.07,5.53h0V84.22c3.35-4.32,8.16-4.87,11.85-.9V69.55h0ZM41.88,42.68h5.54v1.58H41.88Zm.8-1.58h4v2.37h-4Zm.79-25.29h2.37V41.89H43.47ZM44.26,0h.79V20.55h-.79Zm.39,200.27a23.54,23.54,0,0,0-23.31,23.87v66.7H68v-66.7A23.53,23.53,0,0,0,44.65,200.27Zm-11.46,89H28.45v-5.53h4.74Zm0-10.27H28.45v-5.53h4.74Zm0-11.07H28.45v-5.53h4.74Zm0-11.07H28.45v-5.52h4.74Zm0-10.27H28.45v-5.53h4.74Zm0-11.07H28.45V230h4.74Zm0-10.27H28.45v-5.53h4.74Zm3.16-17.39H41.1v5.54H36.35Zm7.12,81.41H38.73v-5.53h4.74v5.53Zm0-10.27H38.73v-5.53h4.74V279Zm0-11.07H38.73v-5.53h4.74v5.53Zm0-11.07H38.73v-5.52h4.74v5.52Zm0-10.27H38.73v-5.53h4.74v5.53Zm0-11.07H38.73V230h4.74v5.53Zm0-15.8v5.53H38.73v-5.53h0A5.13,5.13,0,0,1,43.47,215v4.72Zm6.32,69.55H45.05v-5.53h4.74Zm0-10.27H45.05v-5.53h4.74Zm0-11.07H45.05v-5.53h4.74Zm0-11.07H45.05v-5.52h4.74Zm0-10.27H45.05v-5.53h4.74Zm0-11.07H45.05V230h4.74Zm0-10.27H45.05V215a5.27,5.27,0,0,1,4.74,4.72h0ZM53,213.39H48.21v-5.54H53Zm7.11,75.87H55.32v-5.53h4.74Zm0-10.27H55.32v-5.53h4.74Zm0-11.07H55.32v-5.53h4.74Zm0-11.07H55.32v-5.52h4.74Zm0-10.27H55.32v-5.53h4.74Zm0-11.07H55.32V230h4.74Zm0-10.27H55.32v-5.53h4.74Zm-40.3,65.6c2.14-13.73-6-75,7-84.51l-5.69-5.2,8.51,2.7a22.8,22.8,0,0,1,2.16-1.47l-4.49-8.58,8.57,6.6c.4-.16.81-.3,1.22-.43-.36-2.69-1.11-8.27-1.47-11,1.57,2.48,4.75,7.47,6.32,9.94l.6,0c.63-2.88,1.91-8.68,2.54-11.56.63,2.91,1.92,8.75,2.56,11.64.18,0,.35.05.53.06l6.37-10c-.38,2.8-1.13,8.47-1.5,11.24l1,.37,8.84-6.8-4.69,9c.62.4,1.21.82,1.79,1.28L69,201.13l-6.12,5.58c12.39,9.12,4.63,71,6.66,84.13h7.11V216.55h-.22c-4-51.81-59.57-51.78-63.58,0h-.21v74.29ZM0,208.65H4.74v82.19H0Zm84.56,0H89.3v82.19H84.56ZM22.13,137.52,19,140.68l-1.59,19-3.16,4.74-.79,17.38c-2,3.06-2.13,16.92-2.37,20.55ZM68,139.1l3.15,3.16,1.59,19L75.87,166l.79,17.39c2,3,2.14,16.91,2.37,20.54ZM30,113l-6.32,6.32-.79,14.22Zm30.83,0,6.31,6.32.8,14.22ZM8.71,206.33l-2.39,2.32v82.19h4.74v-1.58H8.69v-5.53h2.37V279H8.69v-5.53h2.37v-5.54H8.69v-5.53h2.37v-5.54H8.69v-5.52h2.37v-4.75H8.69v-5.53h2.37v-5.54H8.69V230h2.37v-4.74H8.69v-5.53h2.37V204.05Zm74,2.32c-1.11-1.15-3.37-3.45-4.48-4.6v15.66h2.37v5.53H78.24V230h2.37v5.53H78.24v5.54h2.37v5.53H78.24v4.75h2.37v5.52H78.24v5.54h2.37v5.53H78.24v5.54h2.37V279H78.24v4.74h2.37v5.53H78.24v1.58H83V208.65Z");
            
            
            //background rectangle
            // svgDoc.append("rect").attr("width",500).attr("height",600);
            
            //specify the number of columns and rows for pictogram layout
            var numCols = 1;
            var numRows = 1;
            
            //padding for the grid
            var xPadding = 10;
            var yPadding = 15;
            
            //horizontal and vertical spacing between the icons
            var hBuffer = 8;
            var wBuffer = 10;
            
            //generate a d3 range for the total number of required elements
            var myIndex=d3.range(numCols*numRows);
            
 
            //create group element and create an svg <use> element for each icon
            svgDoc.append("g")
                .attr("id","pictoLayer")
                .selectAll("use")
                .data(myIndex)
                .enter()
                .append("use")
                    .attr("xlink:href","#iconCustom2")
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
 				   	var scrollTop = document.documentElement.scrollTop-1400
					//   console.log(scrollTop/window.innerHeight)
					   
					   
					   //NEW here below as the scroll happens we set the offsets of the gradient according to the scroll - calculated by dividing the scroll pixel by the total window height. this will need adjustment to match your other scroll
					d3.select("#bluePart")
				    .attr("offset", (scrollTop/window.innerHeight)*100+"%")
					   
					d3.select("#goldPart")
				    .attr("offset", (scrollTop/window.innerHeight)*100+1+"%") 
					   
					   
					   d3.selectAll("use").attr("class", function(d,i){
						   if (d<scrollTop)  {
							   return "iconSelected";
						   }	else {
							   return "iconPlain";
						   }
					   })
 				   })
 
            