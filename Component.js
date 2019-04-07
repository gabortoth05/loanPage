sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device"
	], function (UIComponent, Device) {
		"use strict";

		return UIComponent.extend("com.olit.lazyapp.Component", {

			metadata : {
				manifest: "json"
			},

			init : function () {
				UIComponent.prototype.init.apply(this, arguments);
				this.getRouter().initialize();
				
				console.log("test");
				
				
				
//				var uri  = "http://localhost:60946/comOlitAccessApp/AppliSapUI5Hostname.txt";
//				
//				
//				requestJSON(uri, function(json) {
//					console.log(json);
//				}); // end requestJSON Ajax call
//			
//		    
//		    function requestJSON(url, callback) {
//		        $.ajax({
//		          url: url,
//		          crossDomain: true,
//		          contentType: "application/x-www-form-urlencoded",
//		          complete: function(xhr) {
//		        	  
//		        	  
//		            callback.call(null, xhr.responseText);
//		          }
//		        });
//		      }
			},
			
			getContentDensityClass : function() {
				if (!this._sContentDensityClass) {
					if (!sap.ui.Device.support.touch) {
						this._sContentDensityClass = "sapUiSizeCompact";
					} else {
						this._sContentDensityClass = "sapUiSizeCozy";
					}
				}
				return this._sContentDensityClass;
			}

		});

	}
);

