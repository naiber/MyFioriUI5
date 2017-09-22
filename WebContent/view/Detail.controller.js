jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	handleNavButtonPress : function (evt) {
		var context = evt.getSource().getBindingContext();//per tornare indietro questa riga di codice si può anche omettere
		this.nav.back("Master",context);
	},
	
	handleApprove : function(evt) {
		//show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
				bundle.getText("ApproveDialogMsg"),
				function (oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						//notify user
						var successMsg = bundle.getText("ApproveDialogSuccessMsg");
						sap.m.MessageToast.show(successMsg);
					}
				},
				
				bundle.getText("ApproveDialogTitle")
		);
	},
	
	handleLineItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem",context);
	},
	
	onBeforeRendering : function(){
		this.byId("SupplierForm").bindElement("BusinessPartner");
	}
});