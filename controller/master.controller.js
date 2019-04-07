jQuery.sap.require("com.olit.lazyapp.utils.Formatter"); 
jQuery.sap.require("com.olit.lazyapp.utils.leafletExtension"); 
sap.ui.controller("com.olit.lazyapp.controller.master", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf comolitlazyapp.master
*/
	onInit: function() {
		
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

//		var oViewModel,
//			fnSetAppNotBusy,
//			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
//
//		oViewModel = new sap.ui.model.json.JSONModel({
//			busy : true,
//			delay : 1000
//		});
//		this.getView().setModel(oViewModel, "appView");
//
//		fnSetAppNotBusy = function() {
//			oViewModel.setProperty("/busy", false);
//			oViewModel.setProperty("/delay", iOriginalBusyDelay);
//		};
//
//		this.getOwnerComponent().getModel().metadataLoaded().then(fnSetAppNotBusy);
		
		
		
	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf comolitlazyapp.master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf comolitlazyapp.master
*/
	onAfterRendering: function() {
		this.onAjaxCall();
		this.onInitTableModel();
		
		this.getView().addStyleClass("sapUiSizeCozy");
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf comolitlazyapp.master
*/
//	onExit: function() {
//
//	}
	
	onLiveChange: function(oEvent){
		var sId = oEvent.getSource().sId;
		var nValue = sap.ui.getCore().byId(sId).getValue();
		
		console.log(oEvent.getSource().sId);
		
		console.log(nValue === "-");
		console.log(nValue.indexOf("-"));
		
		var userKeyRegExp = /[0-9]{2}\-[0-9]{2}\-[0-9]{2}?$/;
		
		var valid = userKeyRegExp.test(nValue);

		console.log(valid);
		
		/*if(nValue.indexOf("-") >= 0 ){
			console.log(nValue.indexOf("-") );
			
			
			
			sap.ui.getCore().byId(sId).setValue(nValue.slice(0,nValue.indexOf("-")));
			
		}*/
		
		
		
	},
	
	onExpandPanel:function(){
		
		console.log("collapse",this.getView().byId("showMorePanel").getExpanded());
		
		if(this.getView().byId("showMorePanel").getExpanded()){
			this.getView().byId("mainPanel").setExpanded(false);
		}
		else{
			this.getView().byId("mainPanel").setExpanded(true);
		}
		
		
		
	},
	
	onListItemPress: function(oEvt){
		console.log(oEvt.getSource().sId);
		var sButtonId = oEvt.getSource().sId;
		var viewId = this.getView().sId
		
		switch (sButtonId) {
		  case viewId + "--Button1":
			  this.getView().byId("navCon").to(this.getView().byId("p2"))
		    break;
		  case viewId + "--Button2":
			  this.getView().byId("navCon").to(this.getView().byId("p3"))
		    break;
		  case viewId + "--Button3":
			  this.getView().byId("navCon").to(this.getView().byId("p4"))
		    break;
		  case viewId + "--Button4":
			  this.getView().byId("navCon").to(this.getView().byId("p5"))
		    break;
		  case viewId + "--Button5":
			  this.getView().byId("navCon").to(this.getView().byId("p6"))
		    break;
		}

		
	},
	
	
	
	
	onInitTableModel: function(){
		var oTableModel = new sap.ui.model.json.JSONModel([]);
				
		this.getView().setModel(oTableModel,"tableModel");
		
	},
	
	onAddNewLine: function(){

		var sLength = this.getView().getModel("tableModel").getData().length;
		var oData = this.getView().getModel("tableModel").getData();
		var oNewEntry = {
				"NUM":"",
				"VRONAME":"",
				"DETAILID":"",
				"ISSUINGCOUNTRYCODE":"",
				"ORIGINALAMOUNT":"0",
				"REFUDGROSS":"0",
				"REFUNDFEE":"0",
				"EXTINVOICED":"0",
				"REFUNDTYPE":"cash",
				"STATUSBRO":true,
				"STATUSCUSTOM":true,
				"DELETABLE":true,
				"EDITABLE":true,
				"VISIBLE":true
			};
		
		if(sLength === 0){
			oData.push(oNewEntry);
		}
		else{
			
			console.log(oData[sLength-2]);
			oData[sLength-2].EDITABLE = false
			oData[sLength-1].NUM = "";
			oData.splice(sLength-1,0,oNewEntry);
			oData.join();
		}

		
		this.onCalculateTableTotal();
		this.getView().getModel("tableModel").refresh(true);
		this.getView().byId("tableSaveButton").setVisible(true);
		
	
	},
	
	onCalculateTableTotal: function(evt){
		
		var oModel = this.getView().getModel("tableModel");
		var sLength = oModel.getData().length;
		
		function calculateTotal(fieldName){
			var nTotal = 0;
			
			for(i=0; i<=sLength-2; i++){
				nTotal += Number(oModel.getData()[i][fieldName]);
			}
			
			oModel.getData()[sLength-1][fieldName] = nTotal;
		};
		
		
		if(sLength === 1){
			oModel.getData().push(
					{
						"NUM":"",
						"VRONAME":"",
						"DETAILID":"",
						"ISSUINGCOUNTRYCODE":"",
						"ORIGINALAMOUNT":oModel.getData(sLength-1).ORIGINALAMOUNT,
						"REFUDGROSS":oModel.getData(sLength-1).REFUDGROSS,
						"REFUNDFEE":oModel.getData(sLength-1).REFUNDFEE,
						"EXTINVOICED":oModel.getData(sLength-1).EXTINVOICED,
						"REFUNDTYPE":"",
						"STATUSBRO":"",
						"STATUSCUSTOM":"",
						"DELETABLE":false,
						"EDITABLE":false,
						"VISIBLE":false
					}	
			);
			this.getView().getModel("tableModel").refresh(true);
		}
		else{
			calculateTotal("ORIGINALAMOUNT");
			calculateTotal("REFUDGROSS");
			calculateTotal("REFUNDFEE");
			calculateTotal("EXTINVOICED");

			this.getView().getModel("tableModel").refresh(true);
			
		}
		

			
	},
	
	onSaveEntry: function(){
		
		var sLength = this.getView().getModel("tableModel").getData().length;
		var that = this;
		
		function calculateLineNumbers(length){
			for(i=0; i<length-1; i++){
				that.getView().getModel("tableModel").getData()[i].NUM = i+1
			}
		};

		calculateLineNumbers(sLength);
		this.onCalculateTableTotal();
		this.getView().getModel("tableModel").getData()[sLength-2].EDITABLE = false;
		console.log(this.getView().getModel("tableModel").getData()[sLength-1]);
		this.getView().getModel("tableModel").getData()[sLength-1].NUM = "";
		this.getView().byId("tableSaveButton").setVisible(false);
		this.getView().getModel("tableModel").refresh(true);
		
	},
	
	onDeleteEntry: function(evt){
		
		var sPath = evt.getSource().oPropagatedProperties.oBindingContexts.tableModel.sPath.replace("/","");
		var oModel = this.getView().getModel("tableModel");
		var sLength = oModel.getData().length;
		
		console.log(sLength);
		
		if(sLength == 2){
			oModel.getData().splice(0,sLength);
		}
		else{
			oModel.getData().splice(sPath,1);
			this.onCalculateTableTotal();
		}
		
		
		oModel.refresh(true);
	},
	
	onChangeStatus: function(evt){
		var sPath = evt.getSource().oPropagatedProperties.oBindingContexts.tableModel.sPath.replace("/","");
		var oData= this.getView().getModel("tableModel").getData();
		var sProperty =evt.getSource().mBindingInfos.src.binding.sPath;
		
		if(oData[sPath][sProperty] === true){
			oData[sPath][sProperty]  = false;
		}
		else if(oData[sPath][sProperty]  === false){
			oData[sPath][sProperty]  = true;
		}
		else{
			oData[sPath][sProperty]  = "";
		}
		
		this.getView().getModel("tableModel").refresh(true);
		
	},
	
	
	onPressHeaderButton : function(evt){
		console.log("test");
		// var oCashMachineChart = sap.ui.xmlfragment("cashMachineChart", "com.olit.refund.ext.fragments.CashMachineChart");
		// oCashMachineChart.open();
		if(!popup){
			var popup = sap.ui.xmlfragment("com.olit.lazyapp.fragments.CashMachineChart",this);
			this.getView().addDependent(popup);		
			popup.open();	
		}
	},
	
	onClosePopup: function(evt){
		sap.ui.getCore().byId("headerPopup").close();
		sap.ui.getCore().byId("headerPopup").destroy();
		
	},
	
	/**/
	
	onToPage2 : function () {
		this.getOwnerComponent().getRouter().navTo("detail");
	},
	
	
		onAjaxCall : function(){
		
			var that = this;
			var oModel = new sap.ui.model.json.JSONModel();
		
			var uri  = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc";
		
		
			requestJSON(uri, function(json) {
			
			}); // end requestJSON Ajax call
		
	    
	    function requestJSON(url, callback) {
	        $.ajax({
	          url: url,
	          crossDomain: true,
	          contentType: "application/x-www-form-urlencoded",
	          complete: function(xhr) {
	        	  
	        	  console.log(xhr);
	        	  
	            callback.call(null, xhr.responseJSON);
	          }
	        });
	      }
	}

});