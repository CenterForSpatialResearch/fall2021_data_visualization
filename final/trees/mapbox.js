


//1.bounds
//found at:https://docs.mapbox.com/mapbox-gl-js/example/restrict-bounds/
 // Set bounds to New York, New York
var bounds = [
[-74.04728500751165, 40.68392799015035], // Southwest coordinates
[-73.91058699000139, 40.87764500765852]  // Northeast coordinates
];

//this part of the example can be found at mapbox: https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
//you will find the accessToken and the style for your map under "Share" in your specific map in mapbox studio
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbmFhYW4xMjYiLCJhIjoiY2s5Zm9lYWR3MGY4bDNrbnVjcDl2cDZrNCJ9.YAsZ5UUy0GpfsZGtmvvshw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/shinaaan126/ckvmepkqz0gd714r2kxjugnor',
  center: [0, 20],
  zoom: 3,
  bearing: 30, 
  pitch: 60, 
maxBounds: bounds // Sets bounds as max
});


//2.zoom
map.addControl(new mapboxgl.NavigationControl());

//3.geolocation


//4.search
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    }
));

//5.tilt


//6.directions


//7.popup

const popup1 = new mapboxgl.Popup({ closeOnClick: false })
.setLngLat([-73.9803840750476, 40.76378849568562])
.setHTML("Click bottons to explore seasonal changes & Hover to learn tree species!")
.addTo(map);


//8.layers

map.on('idle', () => {
	
	
	
	const toggleableLayerIds = ['Spring', 'Summer','Fall','Winter'];
 
	// Set up the corresponding toggle button for each layer.
	for (const id of toggleableLayerIds) {
	// Skip layers that already have a button set up.
	if (document.getElementById(id)) {
	continue;
	}
 
	// Create a link.
	const link = document.createElement('a');
	link.id = id;
	link.href = '#';
	link.textContent = id;
	link.className = 'active';
 
	// Show or hide layer when the toggle is clicked.
	link.onclick = function (e) {
	const clickedLayer = this.textContent;
	e.preventDefault();
	e.stopPropagation();
 
	const visibility = map.getLayoutProperty(
	clickedLayer,
	'visibility'
	);
 
	// Toggle layer visibility by changing the layout object's visibility property.
	if (visibility === 'visible') {
	map.setLayoutProperty(clickedLayer, 'visibility', 'none');
	this.className = 'active';
	} else {
	this.className = 'active';
	map.setLayoutProperty(
	'Spring',
	'visibility',
	'none')
	map.setLayoutProperty(
	'Summer',
	'visibility',
	'none')
	map.setLayoutProperty(
	'Fall',
	'visibility',
	'none')
	map.setLayoutProperty(
	'Winter',
	'visibility',
	'none')
				
	map.setLayoutProperty(
	clickedLayer,
	'visibility',
	'visible'
	);
	}
	//9.hover+label
	const popup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false
	});
 
	map.on('mouseenter',clickedLayer, (e) => {
	// Change the cursor style as a UI indicator.
	map.getCanvas().style.cursor = 'pointer';
 
	// Copy coordinates array.
	
	const coordinates = e.features[0].geometry.coordinates.slice();
	const description = e.features[0].properties.spc_common;
 
	// Ensure that if the map is zoomed out such that multiple
	// copies of the feature are visible, the popup appears
	// over the copy being pointed to.

	while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	}
	// Populate the popup and set its coordinates
	// based on the feature found.
	popup.setLngLat(coordinates).setHTML(description).addTo(map);
	});
 
	map.on('mouseleave',clickedLayer, () => {
	map.getCanvas().style.cursor = '';
	popup.remove();
	});
	
	
	};
 
 
 
	const layers = document.getElementById('menu');
	layers.appendChild(link);
	}
	});


//10.data
	
//11.removing mapbox logo* not recommended in real applications - please adhere to rules when using outside of class

map.on("load",function(){
    d3.selectAll(".mapboxgl-ctrl-logo").remove()
    d3.selectAll(".mapboxgl-ctrl-attrib").remove()
});


