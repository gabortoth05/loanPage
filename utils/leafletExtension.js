(function(){ 

	jQuery.sap.declare("com.olit.lazyapp.utils.leafletExtension");

	sap.ui.core.Control.extend('com.olit.lazyapp.utils.leafletExtension', {
	  metadata: {
	    properties: {
	      label:{type:"string",defaultValue:null},
	      value:{type:"string",defaultValue:null},
	      width:{type:"string",defaultValue:null},
	    }
	  },
	  
	  onInit: function(){
		  
	  },
	  
	  onAfterRendering: function() {

		  	console.log(document.getElementById("mapid"))
		  
			var mymap = L.map('mapid').setView([51.505, -0.09], 13);

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
				maxZoom: 18,
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
					'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.streets'
			}).addTo(mymap);
			
			
			// control that shows state info on hover
			var info = L.control();

			info.onAdd = function (map) {
				this._div = L.DomUtil.create('div', 'info');
				this.update();
				return this._div;
			};
			
			info.update = function (props) {
				this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
					'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
					: 'Hover over a state');
			};

			info.addTo(mymap);

	  },
	  
	  renderer: {
		  	
	        render : function(oRm, oControl) {
	        	oRm.write('<div id="mapid"></div>');

	        }
		  
	  },

	});
	
})();
