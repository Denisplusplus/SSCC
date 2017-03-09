
var raster = new ol.layer.Tile({
    source: new ol.source.XYZ({
       url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWNgYGD4DwABBAEAHnOcQAAAAABJRU5ErkJggg=="
    })
})

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
					color: '#2F2173',
					
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
        
var drawControl; // global so we can remove it later
var value = "Point";


drawControl = new ol.interaction.Draw({
	source: pointsSource,
	type: (value),
	stopEvent: false

});

var counter=0;
var pointsArr=[];

drawControl.on('drawend', function(e) {
  e.feature.setProperties({
    'id': counter,
	
  });
  console.log(counter);
  pointsArr.push(counter);
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


var styleFunction = function(feature) {
        var geometry = feature.getGeometry();
        var styles = [
          // linestring
          new ol.style.Style({
		
            stroke: new ol.style.Stroke({
		
              color: '#D87A22',
              width: 6
			  
			  
            })
          })
        ];

        geometry.forEachSegment(function(start, end) {
          var dx = end[0] - start[0];
          var dy = end[1] - start[1];
          var rotation = Math.atan2(dy, dx);
          // arrows
          styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(end),
            image: new ol.style.Icon({
              src: 'https://s8.hostingkartinok.com/uploads/images/2017/03/d03c6532df9e065e2a381c44ddcee0e4.png',
              anchor: [3.5, 0.5],
              rotateWithView: true,
              rotation: -rotation
            })
          }));
        });

        return styles;
};


var edgeVectorSource = new ol.source.Vector();
var edgeLayer = new ol.layer.Vector({
	source: edgeVectorSource,
	style: styleFunction
});


var map = new ol.Map({
  layers: [raster, pointsLayer, edgeLayer],
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


var matr=[];

function makeLine(x1, y1, x2, y2, id1, id2) {
	var points = [ [x1, y1], [x2, y2] ];
	var featureLine = new ol.Feature({
		geometry: new ol.geom.LineString(points)
	});
	edgeVectorSource.addFeature(featureLine);	
	matr[id1][id2]=1;
}

var flag=false;
var x1=null;
var y1=null;
var id1=null;

selectionControl.getFeatures().on("add", function (e) {
	var feature = e.target.item(0);
	//console.log(feature.get("id"));
	var coord = feature.getGeometry().getCoordinates();
	
	var x = coord[0];
	var y = coord[1];
	var id = feature.get("id");
	
	if (flag) {
		makeLine(x1,y1,x,y,id1,id);
		flag=false;
		selectionControl.getFeatures().clear();
		return;
	}
	
	x1=x;
	y1=y;
	id1=id;
	flag=true;
	return;
	
});


//activate draw
var button1=document.getElementById('button1');
button1.onclick = function() {

	map.removeInteraction(selectionControl);
	
	map.removeInteraction(drawControl);
	map.addInteraction(drawControl);
	flag=false;
	
};

//actiave select
var button2=document.getElementById('button2');
button2.onclick = function() {
	map.removeInteraction(drawControl);
	map.removeInteraction(selectionControl);
	map.addInteraction(selectionControl);
	flag=false;
	
	console.log(pointsArr);
	
	for (var i=0;i<pointsArr.length;i++) {
		matr[i]=[];
		for (var j=0;j<pointsArr.length; j++) {
			matr[i][j]=0;
		}
	}
	printM(matr);
	
};

//actiave select
var button3=document.getElementById('button3');
button3.onclick = function() {
	printM(matr);
};

map.on("pointermove", function (evt) {
	var hit = evt.map.hasFeatureAtPixel(evt.pixel);
	this.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

function printM(tabInfos) {
var i = 0;
JSON.stringify(tabInfos, null, 2).split(/\n/).forEach(function(line) {
  window.console && console.log(
    (/\s{2}\S/.test(line)) ? i++ + line : line
  );
});
}
