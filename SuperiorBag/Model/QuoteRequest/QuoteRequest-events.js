model.QuoteRequest.events.onRestrictingQuery = function() {	var resultCollection = ds.QuoteRequest.createEntityCollection();	var session = currentSession();	if (currentUser().fullName=="administrator") //session.belongsTo('Admin')		resultCollection = ds.QuoteRequest.all();	else	{		var myID = sessionStorage.myID;					if (myID!= null)					{						//currentSession().promoteWith('Admin');						//	var me = ds.User.find("ID = :1", myID);						//	resultCollection = me.customer.allQuotes;						//currentSession().unPromote();						//resultCollection = ds.QuoteRequest.query("ID = :1", 1);														if (session.belongsTo("Customer"))        {        	resultCollection = ds.QuoteRequest.query("customerUserID = :1", myID);        }        else if (session.belongsTo("SalesRep"))        {        	resultCollection = ds.QuoteRequest.query("salesRepUserID = :1", myID);        }          else if (session.belongsTo("Vendor"))        {        	resultCollection = ds.QuoteRequest.query("vendorUserID = :1", myID);        }                         					}		}	return resultCollection;		};model.QuoteRequest.events.onInit = function() {	// Add your code here;	var session = currentSession();		var myID = sessionStorage.myID;	var mySalesRepID = sessionStorage.mySalesRepID;			    if (myID != null) // if a user is logged in    	{                        if (session.belongsTo("Customer"))        {       		this.customerUserID = myID; // we save the user ID in the owner attribute       		this.salesRepUserID = mySalesRepID;        }        else if (session.belongsTo("SalesRep"))        {       		this.salesRepUserID = myID; // we save the user ID in the owner attribute        }          else if (session.belongsTo("Vendor"))        {       		this.vendorUserID = myID; // we save the user ID in the owner attribute        }                  }    	};model.QuoteRequest.events.onSave = function() {    if (!this.isNew()){        var theClass = this.getDataClass(); //get its class//using its key, get a reference to the entity before it was updatedvar formerEntity = theClass(this.getKey());    	var theUserName = currentSession().user.name;    	//log all changes to attributes    	//debugger; 					var changes = this.getModifiedAttributes();					var changesText = '';					var myEntity = this;					changes.forEach(function(attName) {						changesText += attName + ' changed to '+myEntity[attName]+'\r';						new ds.QuoteChange({							quoteRequest: myEntity,							changeDate: new Date(),							changeBy: theUserName,							attributeName: attName,							oldValue: formerEntity[attName],							newValue: myEntity[attName]							//changes: changesText						}).save();																																										//changesText += 'From: ' + changes[attName].from + '\r';						//changesText += 'To: ' + changes[attName].to + '\r\r';											});					//if (changesText.length > 0)					//{//		//			}   	    	    	        //this.creationDate = new Date();        //check to see if the quoteStatus has changed and send email if so        var formerStatus = formerEntity.quoteStatus;        if(formerStatus != this.quoteStatus)			{				var promoteToken = currentSession().promoteWith('Admin');				var toEmailAddress = "";				var theUser;				debugger;				//get the user email we need to send to				if(this.quoteStatus=='Customer Review')				{					theUser = ds.User.find("ID = :1", this.customerUserID);				}				else if (this.quoteStatus=='SalesRep Review')				{					theUser = ds.User.find("ID = :1", this.salesRepUserID);					}								else if (this.quoteStatus=='Vendor Review')				{					theUser = ds.User.find("ID = :1", this.vendorUserID);				}				        		currentSession().unPromote(promoteToken);        		        		if(theUser != null) 					toEmailAddress = theUser.email; //"prometheusgl@gmail.com";               								if(toEmailAddress!="" && toEmailAddress != null)				{				var hostname = "smtp.emailsrvr.com"; // //smtp.gmail.com //secure.emailsrvr.com				var username = "remote@superiorbag.com"; // //prometheusgl@gmail.com				var emailFrom = "remote@superiorbag.com"; // //prometheusgl@gmail.com								var password = "r3m0t3"; // //adikin22				// port 465 ssl with true				var mail = require('waf-mail/mail'); 				var rec = [toEmailAddress];				var resultSend = mail.send(hostname, 587, false, username, password, emailFrom, rec, 'Superior Bag Quote Request Status Update', 'You have a quote request whose status has changed.  Please login to view the status.');				var after= true;				}    		}    		}};