
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var assignVendorButton = {};	// @button
	var assignCustButton = {};	// @button
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var sendToSalesRepButton = {};	// @button
	var sendToCustomerButton = {};	// @button
	var sendToVendorButton = {};	// @button
	var declineQuoteButton = {};	// @button
	var approveQuoteButton = {};	// @button
	var submitForQuoteButton = {};	// @button
	var copyQuoteButton = {};	// @button
	var newQuoteButton = {};	// @button
	var saveQuoteButton = {};	// @button
	var login1 = {};	// @login
	var menuItem9 = {};	// @menuItem
	var menuItem8 = {};	// @menuItem
	var menuItem7 = {};	// @menuItem
// @endregion// @endlock

var session = WAF.directory;
var reviewQuery = "ID = 0";
var pendingQuery;
var completeQuery = "quoteStatus = 'Complete'"; //"complete = true";
var approvedQuery = "approvedDate != null"; 
var declinedQuery = "declinedDate != null"; 

var currentTab = 1;

		if(session.currentUserBelongsTo("Customer"))
		{
			reviewQuery = "quoteStatus = 'Customer*'";
			pendingQuery = "quoteStatus != 'Customer*' and quoteStatus != 'Complete'";
		}
		else if (session.currentUserBelongsTo("SalesRep"))
		{
			reviewQuery = "quoteStatus = 'SalesRep*'";
			pendingQuery = "quoteStatus != 'SalesRep*' and quoteStatus != 'Complete'";								
		}
		else if (session.currentUserBelongsTo("Vendor"))
		{
			reviewQuery = "quoteStatus = 'Vendor*'";
			pendingQuery = "quoteStatus != 'Vendor*' and quoteStatus != 'Complete'";										
		}
		else if (session.currentUserBelongsTo("Admin"))
		{
			reviewQuery = "quoteStatus = '*Review'";
			pendingQuery = "quoteStatus != '*Review' and quoteStatus != 'Complete'";												
		}	

		WAF.sources.quoteRequest.query(reviewQuery);				
			
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
	
	var session = WAF.directory;
		
	function checkPermissions()
    {
        if (session.currentUserBelongsTo("Customer"))
        {
            $$('custButtonsContainer').show();
        }
        else
        {
            $$('custButtonsContainer').hide();
        }
        if (session.currentUserBelongsTo("SalesRep"))
        {
            $$('salesButtonsContainer').show();
            $$('salesRepChangesCont').show();
        }
        else
        {
            $$('salesButtonsContainer').hide(); 
            $$('salesRepChangesCont').destroy();
                       
        }        
        if (session.currentUserBelongsTo("Vendor"))
        {
            $$('vendButtonsContainer').show();
        }
        else
        {
            $$('vendButtonsContainer').hide();
        }   
                   

    }
    checkPermissions();

	};// @lock

	assignVendorButton.click = function assignVendorButton_click (event)// @startlock
	{// @endlock
		var vendorEmail=prompt("Please enter the vendor email for this quote request","");

		if (vendorEmail!=null)
  			{
  				var Result = ds.User.find("email = :1", {
  					params: [vendorEmail],
  					onSuccess: function(event)
  					{
  					var theVend=event.entity;
  					if(theVend!=null)
  					{
  						sources.quoteRequest.vendorUserID = theVend.ID.getValue();						
						sources.quoteRequest.save();
					  	alert(theVend.userName.getValue()+" saved as the linked vendor.");
			  				
  					}
  					else
  					{
  						alert('Vendor email not found.  Make sure that they have signed up for an account for this application before assigning.');
					}

  					return theCust;
  					}
  				})
  			}

	};// @lock

	assignCustButton.click = function assignCustButton_click (event)// @startlock
	{// @endlock
		var customerEmail=prompt("Please enter the customer email for this quote request","");

		if (customerEmail!=null)
  			{
  				var Result = ds.User.find("email = :1", {
  					params: [customerEmail],
  					onSuccess: function(event)
  					{
  					var theCust=event.entity;
  					if(theCust!=null)
  					{
  						sources.quoteRequest.customerUserID = theCust.ID.getValue();						
						sources.quoteRequest.save();
					  	alert(theCust.userName.getValue()+" saved as the linked customer.");
			  				
  					}
  					else
  					{
  						alert('Customer email not found.  Make sure that they have signed up for an account for this application before assigning.');
					}

  					return theCust;
  					}
  				})
  			}

	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		WAF.sources.quoteRequest.query(declinedQuery);
		currentTab = 5;	
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		WAF.sources.quoteRequest.query(approvedQuery);
		currentTab = 4;	
	};// @lock

	sendToSalesRepButton.click = function sendToSalesRepButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'SalesRep Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote request sent to Sales Rep.');				
			}
		});			
	};// @lock

	sendToCustomerButton.click = function sendToCustomerButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'Customer Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote request sent to Customer.');				
			}
		});			
	};// @lock

	sendToVendorButton.click = function sendToVendorButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'Vendor Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote request sent to Vendor.');				
			}
		});			
	};// @lock

	declineQuoteButton.click = function declineQuoteButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'Complete';
		sources.quoteRequest.declinedDate = new Date();		
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote price declined.  If you want another quote you may copy the declined quote details.');				
			}
		});			
	};// @lock

	approveQuoteButton.click = function approveQuoteButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'Complete';
		sources.quoteRequest.approvedDate = new Date();		
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote price approved.  You will be contacted with your final order confirmation.');				
			}
		});			
	};// @lock

	submitForQuoteButton.click = function submitForQuoteButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.quoteStatus = 'SalesRep Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
					WAF.sources.quoteRequest.query(reviewQuery);
					alert('Quote request submitted.  You will be notified via email when the status is updated or when a quote is provided.');				
			}
		});			
	};// @lock

// Note: source and dest must be entities of the same type
//       skipList is an array of attribute names NOT to copy
//       onlyList is an array of attribute names to copy
//       skipList and onlyList can NOT be used at the same time
// Note: This function does NOT yet protect against trying to
//       copy a 1 -> N attribute so make sure is in skipList
function copyEntity(source, dest, skipList, onlyList){
    var sourceAttrs  = [];
    var attrIterator = null;
    var attrName     = "";
    var haveSkip     = false;
    var haveOnly     = false;
    var idx          = 0;
    var result       = {
        ok       : false,
        error    : null,
        copied   : [],
        notCopied: []
    };

 
    if(source.getDataClass().getName() != dest.getDataClass().getName()){
        result.error = setError(2, "Source and destination are not the same data class");
        return result;
    }
    
    haveSkip = true;
 
    try{
        allAttributeNames = source.getDataClass().getAttributes();
        for(var i in allAttributeNames){
        	    var attrName = allAttributeNames[i].name;//source.getDataClass().getAttribute(allAttributeNames[i]).name;        	
        	    if((haveSkip === false) || (skipList.indexOf(attrName) < 0)){
                    dest[attrName] = source[attrName].getValue();
                    //dest[attrName].setValue(source[attrName].getValue());  
                   //dest.getAttribute(attrName) = source.getAttribute(attrName); 
                    //dest.getAttribute(attrName).setValue(source.getAttribute(attrName).getValue);                 
                                    
                    result.copied.push(attrName);
                }
                else{
                    result.notCopied.push(attrName);
                }                
        }

    }
    catch(e){
        result.error = setError(10, "Failed. Err:" + getCatchMessage(e));
        return result;
    }
    result.ok = true;
    return result;
}



	copyQuoteButton.click = function copyQuoteButton_click (event)// @startlock
	{// @endlock
		var currentEntity = sources.quoteRequest.getCurrentElement();
		sources.quoteRequest.newEntity();
		var skipList = ['ID','requiredDate','quoteChanges','complete','vendorQuote', 'approvedDate','declinedDate'];
		var onlyList = [];
		copyEntity(currentEntity, sources.quoteRequest, skipList, onlyList);
		sources.quoteRequest.requestDate = new Date();
		sources.quoteRequest.quoteStatus = 'Customer Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
				sources.quoteRequest.addEntity(sources.quoteRequest.getCurrentElement());
			}
		});
				
	};// @lock

	newQuoteButton.click = function newQuoteButton_click (event)// @startlock
	{// @endlock
		sources.quoteRequest.newEntity();
		sources.quoteRequest.requestDate = new Date();
		sources.quoteRequest.quoteStatus = 'Customer Review';
		sources.quoteRequest.save( {onSuccess: function(event)
			{
				sources.quoteRequest.addEntity(sources.quoteRequest.getCurrentElement());
			}
		});

	};// @lock

	saveQuoteButton.click = function saveQuoteButton_click (event)// @startlock
	{// @endlock

		WAF.sources.quoteRequest.save({
			onSuccess: function(event)
				{
					if(currentTab==1)
						WAF.sources.quoteRequest.query(reviewQuery);					
					else if (currentTab==2)	
						WAF.sources.quoteRequest.query(pendingQuery);					
					else if (currentTab==3)	
						WAF.sources.quoteRequest.query(completeQuery);
					alert('Changes saved.');
						
				},
			onError: function(error) {alert("error happened");}
				
		});
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		//WAF.sources.quoteRequest.query(reviewQuery);
		window.location = "/Login";

	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		WAF.sources.quoteRequest.query(reviewQuery);				
	};// @lock

	menuItem9.click = function menuItem9_click (event)// @startlock
	{// @endlock
		//WAF.sources.quoteRequest.query("complete = true");
		WAF.sources.quoteRequest.query(completeQuery);
		currentTab = 3;		
	};// @lock

	menuItem8.click = function menuItem8_click (event)// @startlock
	{// @endlock
		WAF.sources.quoteRequest.query(pendingQuery);
		currentTab = 2;				
		//var session = WAF.directory;
		//if(session.currentUserBelongsTo("Customer"))
		//	WAF.sources.quoteRequest.query("quoteStatus != 'Customer*' and complete = false");
		//else if (session.currentUserBelongsTo("SalesRep"))
		//	WAF.sources.quoteRequest.query("quoteStatus != 'SalesRep*' and complete = false");
		//else if (session.currentUserBelongsTo("Vendor"))
		//	WAF.sources.quoteRequest.query("quoteStatus != 'Vendor*' and complete = false");
		//else if (session.currentUserBelongsTo("Admin"))
		//	WAF.sources.quoteRequest.query("quoteStatus != '*Review' and complete = false");	
	};// @lock

	menuItem7.click = function menuItem7_click (event)// @startlock
	{// @endlock
		WAF.sources.quoteRequest.query(reviewQuery);
		currentTab = 1;				
		//var session = WAF.directory;
		//if(session.currentUserBelongsTo("Customer"))
		//{			
		//	WAF.sources.quoteRequest.query("quoteStatus = 'Customer*' and complete = false");
		//}	
		//else if (session.currentUserBelongsTo("SalesRep"))
		//	WAF.sources.quoteRequest.query("quoteStatus = 'SalesRep*' and complete = false");
		//else if (session.currentUserBelongsTo("Vendor"))
		//	WAF.sources.quoteRequest.query("quoteStatus = 'Vendor*' and complete = false");
		//else if (session.currentUserBelongsTo("Admin"))
		//	WAF.sources.quoteRequest.query("quoteStatus = '*Review' and complete = false");
			

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("assignVendorButton", "click", assignVendorButton.click, "WAF");
	WAF.addListener("assignCustButton", "click", assignCustButton.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("sendToSalesRepButton", "click", sendToSalesRepButton.click, "WAF");
	WAF.addListener("sendToCustomerButton", "click", sendToCustomerButton.click, "WAF");
	WAF.addListener("sendToVendorButton", "click", sendToVendorButton.click, "WAF");
	WAF.addListener("declineQuoteButton", "click", declineQuoteButton.click, "WAF");
	WAF.addListener("approveQuoteButton", "click", approveQuoteButton.click, "WAF");
	WAF.addListener("submitForQuoteButton", "click", submitForQuoteButton.click, "WAF");
	WAF.addListener("copyQuoteButton", "click", copyQuoteButton.click, "WAF");
	WAF.addListener("newQuoteButton", "click", newQuoteButton.click, "WAF");
	WAF.addListener("saveQuoteButton", "click", saveQuoteButton.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("menuItem9", "click", menuItem9.click, "WAF");
	WAF.addListener("menuItem8", "click", menuItem8.click, "WAF");
	WAF.addListener("menuItem7", "click", menuItem7.click, "WAF");
// @endregion
};// @endlock
