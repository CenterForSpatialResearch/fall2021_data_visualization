	var WIDTH = window.innerWidth
	var HEIGHT = window.innerHeight
	var translate = 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')'
	var svg = d3.select("#sticky").append("svg")
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
	var currentScrollTop = d3.select('#currentScrollTop')

	var panel = 0
	var grid = 10
	var columns = 100
	var padding = 300
	var mt = window.innerWidth/6
	var ml = window.innerHeight/3
	var summergroups = ["lightgreen","green","darkgreen","purple"]
	var fallgroups = ["yellow","bronze","red","darkgreen","purple"]
	var wintergroups = ["white","bronze","darkgreen","none"]
	var groupLabels = {lightgreen:"lightgreen", green:"green", none:"none", white:"white", yellow:"yellow", bronze:"bronze",red:"red", darkgreen:"darkgreen", purple:"purple"}
	var zipcode=parseInt(searchParam('id'))
	var treenumber=0
	d3.select("#temp").html(zipcode)

	function searchParam(key) {
	  return new URLSearchParams(location.search).get(key);
	};

function shuffle(array) {
return array.sort(() => Math.random() - 0.5);
}

Promise.all([d3.csv("data/treedata.csv")])
    .then(function(data){
        //set the public variable publicData to our dataset that was just loaded, now it is available for any function outside of this promise
        publicData = data//remember that even if we load just 1 dataset this way, it is still in an array of length 1
    })

d3.csv("data/treedata.csv").then(function(data)
{
			function setup(){
						console.log("zipcode="+zipcode)
						var dotData = []
								for(var f in data){
								if(data[f].postcode == zipcode)
								{dotData.push(data[f])
								treenumber++;
			}}
			d3.select("#tempnum").html(treenumber)

								console.log(treenumber)

						dotData = shuffle(dotData)

						svg.selectAll(".dot")
						.data(dotData)
						.enter()
						.append("circle")
						.attr("cx",function(d,i){
											return i%columns*grid;
						})
						.attr("cy",0)
						.attr("r",0)
						.attr("class","dot")
						.attr("transform","translate("+mt+","+ml+")")
			}
			setup()

			function start(){
					console.log("start")
					d3.selectAll(".dot")
					.each(function(d,i){
						d3.select(this).transition().delay(i/3)
						.attr("cx",function(){
						return i%columns*grid-50
						})
						.attr("cy",function(){
						return Math.floor(i/columns)*grid
						})
						.attr("r",(8+(d.dbh/5))*grid/40)
						.attr("class",function(){
						return "fall_"+d.c_f+" winter_"+d.c_w+" summer_"+d.c_sum+ " zc" + d.postcode + " dot"
						})
						.attr("transform","translate("+mt+","+ml+")")
						.attr("opacity",1)
						.attr("fill",colorfall(d.c_f))
					}
				)
			}
			start()

			function summertree(){
				console.log("summer")
				var columns = 30
				var offset = (columns+1)*grid
				d3.selectAll(".animationText").text("")

				for(var g in summergroups){
				d3.selectAll(".summer_"+summergroups[g])
				.each(function(d,i){
						d3.select(this).transition().delay(i/3)
						.attr("cx",function(){
						return i%columns*grid+15
						})
						.attr("cy",function(){
						return Math.floor(i/columns)*grid
						})
						.attr("transform","translate("+(offset*(parseInt(g)+1))+","+mt+")")
						.attr("fill", colorfall(d.c_sum))
					}
				)
				}
			}

			function falltree(){
				console.log("fall")
				var columns = 30
				var offset = (columns+1)*grid
				d3.selectAll(".animationText").text("")

				for(var g in fallgroups){
				d3.selectAll(".fall_"+fallgroups[g])
				.each(function(d,i){
						d3.select(this).transition().delay(i/3)
						.attr("cx",function(){
						return i%columns*grid-130
						})
						.attr("cy",function(){
						return Math.floor(i/columns)*grid
						})
						.attr("transform","translate("+(offset*(parseInt(g)+1))+","+mt+")")
						.attr("fill", colorfall(d.c_f))
					}
				)
				}
			}

			function wintertree(){
				console.log("winter")
				var columns = 40
				var offset = (columns+1)*grid
				d3.selectAll(".animationText").text("")

				for(var g in wintergroups){
				d3.selectAll(".winter_"+wintergroups[g])
				.each(function(d,i){
						d3.select(this).transition().delay(i/3)
						.attr("cx",function(){
						return i%columns*grid-400
						})
						.attr("cy",function(){
						return Math.floor(i/columns)*grid-100
						})
						.attr("r",(8+(d.dbh/5))*grid/40)
						.attr("transform","translate("+(offset*(parseInt(g)+1))+","+mt+")")
						.attr("fill", colorfall(d.c_w))
					}
				)
				}
			}

			// function button(){
			// 		console.log("button")
			// 		d3.selectAll(".dot")
			// 		.each(function(d,i){
			// 			d3.select(this).transition().delay(i/2)
			// 			.attr("cx",function(){
			// 			return +i%columns*grid*5-200
			// 			})
			// 			.attr("cy",function(){
			// 			return Math.floor(i/columns)*grid*4
			// 			})
			// 			.attr("r",grid*3)
			//
			// 			.attr("transform","translate("+mt+","+ml+")")
			// 			.attr("opacity",0.1)
			// 			.attr("fill",colorfall(d.c_f))
			// 		}
			// )
			// }

			var panels =[start, summertree, falltree, wintertree, start]

			var body = d3.select('body').node()
			var container = d3.select('#container')
			var content = d3.select('#content')

			var SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT

			var scrollTop = 0
			var newScrollTop = 0

				container
				.on("scroll.scroller", function() {
				newScrollTop = container.node().scrollTop
			});

			var setDimensions = function() {
			WIDTH = window.innerWidth / 2
			HEIGHT = window.innerHeight
			SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT

			}

			var render = function() {
			if (scrollTop !== newScrollTop) {
			scrollTop = newScrollTop
			var panelSize = window.innerHeight
			var panelNumber = Math.round(scrollTop/panelSize)
			if(panel!=panelNumber){
			console.log(panelNumber)
			panel = panelNumber
			panels[panel]()
			}
			currentScrollTop.text(scrollTop)
			}
			window.requestAnimationFrame(render)
			}
			window.requestAnimationFrame(render)
			window.onresize = setDimensions

});
