
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonSave = {};	// @button
	var buttonCancel = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var button2 = {};	// @button
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	buttonSave.click = function buttonSave_click (event)// @startlock
	{// @endlock
		WAF.sources.purchaseOrder.save({
        onSuccess: function(event) {
        /* put the current entity in the datasource's 
        entity collection*/
            sources.purchaseOrder.addEntity(
                sources.purchaseOrder.getCurrentElement()
            ); 
             $$("tabView1").selectTab(1);
        },
     
        onError: function(error) {
            $$("tabView1").selectTab(1);
        }
    });
	};// @lock

	buttonCancel.click = function buttonCancel_click (event)// @startlock
	{// @endlock
		$$("tabView1").selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		    $$("tabView1").selectTab(2);
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		var myResultList = MyRPCModule.getItemList();
				//alert(myResultList);

		var itemDataObj = JSON.parse(myResultList);	
		arr1 = itemDataObj.itemDataArr;
		//itemData.push({name:'dan', id:1});	
		alert('almost done');		
		//sources.itemData.sync();
		
		//arr1.push({name:'dan', id:1, description:'test'});	
		//arr1.push({name:'dan2', id:13, description:'test4'});	
		//arr1 = [{name:'dan', id:1, description:'test'},{name:'dan2', id:13, description:'test4'}];
		sources.arr1.sync();
		
		alert('done');

	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
			sources.purchaseOrder.save();
			var myResult = MyRPCModule.postTo4D(sources.purchaseOrder.ID);
			
			if(myResult.match(/error*/)){
				alert(myResult);
			}
			else
			{
				sources.purchaseOrder.id_4D = parseInt(myResult);	
				sources.purchaseOrder.save();
				alert('PO Posted');			
			}
   			sources.purchaseOrder.sync(); // synchronize the datasource with its variable

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonSave", "click", buttonSave.click, "WAF");
	WAF.addListener("buttonCancel", "click", buttonCancel.click, "WAF");
	WAF.addListener("dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
