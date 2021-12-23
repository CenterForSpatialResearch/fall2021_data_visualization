mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGVsbGV0dDMiLCJhIjoiY2t2dG94YXFrM2s5czJ2bXRkNDF2aDhsbCJ9.jfZwwgyfdKeSaS3EgCaMaA';

var map = new mapboxgl.Map({
  container: 'map',//thi sis the div that you have mad above in html that you are now placing your map in
  style: 'mapbox://styles/michellett3/ckwnsamrm0hgg15rhnfbnpole',//you will find the accessToken under "Share" in your specific map in mapbox studio
  center: [-74, 40.8],//the center of the map can be set to any initial value of [lng,lat]
  zoom: 12//note that some layers have zoom limits - for example, streets and building footprints are not visible when zoomed out
});

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});

//!!!!refer to this example!!!!!! https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

map.on("load",function(){
	console.log(map.getStyle().layers)
	map.on('mouseenter', 'data-driven-circles', (e) => {
		map.getCanvas().style.cursor = 'pointer';
		
		//below logs out all the possible properties
		console.log(e.features[0].properties)
		const coordinates = e.features[0].geometry.coordinates.slice();
		//I just chose the first one which is address
		const description = e.features[0].properties["Address 1"];
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
		coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
		popup.setLngLat(coordinates).setHTML(description).addTo(map);
		
	})
})