jQuery.sap.declare("com.olit.lazyapp.utils.Formatter");
com.olit.lazyapp.utils.Formatter = {	
		
		getRefundIcon: function(value){
			return "sap-icon://money-bills";
		},
		
		getStatusIcon: function(value){
			if(value !== ""){
				if(value === true){
					return "sap-icon://accept";
				}
				else{
					return "sap-icon://decline";
				}
			}
			else{
				return "sap-icon://";
			}

		},
		
		getIconColor: function(value){
			if(value === true){
				return "Green";
			}
			else{
				return "Red";
			}
		},
		
		getCustomIcon: function(value){
			if(value !== ""){
				if(value === true){
					return "sap-icon://accept";
				}
				else{
					return "sap-icon://decline";
				}
			}
			else{
				return "sap-icon://";
			}
		}

	
		
		
};