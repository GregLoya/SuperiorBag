
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		//alert('test');
		//debugger;
		var user = WAF.directory.currentUser();
		if(user=!null)
		{
			window.location = "/MyQuotes";
		}

	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		//debugger;
		var vObj = sources.regObj;
		
		ds.User.userSignUp(vObj.userName, vObj.password, vObj.email, {
			onSuccess: function(event) 
			{
				//alert('success');
				ds.User.login(vObj.userName, vObj.password);

				window.location = "/MyQuotes";
			},	
			onError: function(event) 
			{
				//alert(error.error[1].message[1]);
				//alert(event.error[0].message);
				$$('textField3').setErrorMessage( { message: event.error[0].message, tooltip: false } )				
			}					
		}); //
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
