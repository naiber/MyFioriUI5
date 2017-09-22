jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress : function (evt) {//evt è in sostanza l'evento che scatena il bottone premendolo
		var context = evt.getSource().getBindingContext();//dall'evento si estrae il context
		this.nav.to("Detail", context);//metodo del controller che ci permette di andare in un altra view passando il nome della view e l'evento che scatena questa azione
	},
	
	handleSearch : function(evt){
		//create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if(query && query.length > 0){
			var filter = new sap.ui.model.Filter("SoId",sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter)
		}else{
			console.log("query error")
		}
		console.log("filter-->",filters)
		//update list binding
		var list = this.getView().byId("list");
		console.log("list-->",list)
		var binding = list.getBinding("items");
		console.log("binding-->",binding)
		binding.filter(filters)
	},
	
	handleListSelect : function(evt){
		console.log("dentro handleListSelect")
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("Detail",context);
	},
	
	handleGroup : function(evt){
		//compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		console.log("item->",item)
		var key = (item) ? item.getKey() : null;
		console.log("key->",key)
		console.log("resource i18n -->",this.getView().getModel("i18n").getResourceBundle())
		if ("GrossAmount" === key || "LifecycleStatus" === key) {
			sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.demo.myFiori.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key,true,grouper));
		}
		
		//update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	}
});