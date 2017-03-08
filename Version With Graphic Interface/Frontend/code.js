
//initializing the map; url indicates the "empty map"
var raster = new ol.layer.Tile({
    source: new ol.source.XYZ({
       url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWNgYGD4DwABBAEAHnOcQAAAAABJRU5ErkJggg=="
    })
})
//initializing the points(verteces) 
var pointsSource = new ol.source.Vector();
var pointsLayer = new ol.layer.Vector({
	source: pointsSource,
	name:'pointsLayer',
	
	style: function(feature, resolution) {
		var id=feature.get("id");
		return [new ol.style.Style({
			fill: new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
			  color: 'black',
			  width: 10
			}),
			image: new ol.style.Circle({
				radius: 30,
				fill: new ol.style.Fill({
					color: '#2F2173'
				})
			}),
			text: new ol.style.Text({
				font: 'bold 30px Arial',
				text:id.toString(),
				fill: new ol.style.Fill({
					color: 'white'
				})
			})
		})];
	}	
});

 //Creating the property for the points - nummering 
var drawControl; // global so we can remove it later
var value = "Point";
drawControl = new ol.interaction.Draw({
	source: pointsSource,
	type: (value),
	stopEvent: false
});

var counter=0;


drawControl.on('drawend', function(e) {
  e.feature.setProperties({
    'id': counter
  });
  console.log(counter);
  counter=counter+1;
});


var selectionControl=new ol.interaction.Select({
	condition: ol.events.condition.singleClick,
	filter: function(feature, layer){	
		if (layer.get('name')=="pointsLayer") {
			return true;
		}
		return false;
	},
	stopEvent: false
});




var map = new ol.Map({
  layers: [raster, pointsLayer],
  target: 'map',
  view: new ol.View({
	border: 1,
    center: [0, 0],
    zoom: 10,
	projection: 'EPSG:4326',
	extent: [0,0,90,90],
	units:'degrees',
	minZoom: 9,
    maxZoom: 11

  })
});


//activate draw
var button1=document.getElementById('button1');
button1.onclick = function() {

	map.removeInteraction(selectionControl);
	
	map.removeInteraction(drawControl);
	map.addInteraction(drawControl);
	flag=false;
	
};


map.on("pointermove", function (evt) {
	var hit = evt.map.hasFeatureAtPixel(evt.pixel);
	this.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
