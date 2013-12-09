
// Put your custom code here=========== Latitude and Longitude

function getLatLong() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude)
	$("#long").val(position.coords.longitude)
	//var element = document.getElementById('geolocation');
//        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />' +
//                            'Altitude: '           + position.coords.altitude              + '<br />' +
//                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
//                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//                            'Heading: '            + position.coords.heading               + '<br />' +
//                            'Speed: '              + position.coords.speed                 + '<br />' +
//                            'Timestamp: '          +                                   position.timestamp          + '<br />';
//alert (position.coords.latitude);
//alert ('nadira');
}

// onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

//====================================================================== Details Code

//var apipath='http://127.0.0.1:8000/mreporting/sync_mobile/';
//var dmpathUrl= "http://localhost/dmpath/index.php?CID=";
//var apipath='http://127.0.0.1:8000/mreporting/';
var apipath='http://e.businesssolutionapps.com/mrepdemo/';
    
var cidValue=''
var repid='';
var password='';
var loginResult='';
var memListStr='';

var errror_str='Network Not Available. Please Check that you have Internet active or Mobile have network signal. You can go to a place where network is available and submit the Data.';

//========================================
	
$(function() {
	$('#basicSync').click(function() {
		localStorage.cid="";
		localStorage.userid="";
		localStorage.password="";
		localStorage.synccode="";
		localStorage.routeList="";
		localStorage.itemList="";
		localStorage.itemDivCount="";
		
		 cidValue=$("#cid").val() ;
		 repid=$("#repid").val() ;
		 password=$("#password").val() ;
		 if (cidValue==""||repid==""||password==""){
			 $("#mySyncError").html('Require CID, User ID and Password.');	
		 }else{			 
			 //=======================
			 /*$.ajax({
			 //http://127.0.0.1:8000/mreporting/sync_mobile/syncRepJMobileSS?cid=DELTA&repid=13073&mobile=8801234567890&password=123
			 url: dmpathUrl+cidValue+'&HTTPPASS=e99business321cba',
			 success: function(dmresult) {
					
					if (dmresult==''){
						alert ('Sorry Network not available. If available, required base url settings');
					}
					//<start>http://127.0.0.1:8000/mreporting/<end>
					var urlPath = dmresult.substring(dmresult.indexOf("<start>"),dmresult.indexOf("<end>"));			
					if (urlPath==''){
						alert ('Required base url settings');
												
					}else{
						//http://127.0.0.1:8000/mreporting/
						apipath=urlPath;
						alert (apipath);
					}
		  	  },
			  error: function(result) {
				alert(errror_str);
			  }
			  
			});//end ajax*/
			 
		 //===============
		if (apipath==''){
			alert ('Gateway settings not available');
		}else{
			 //alert(apipath+'syncRepJMobileSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password);
			 $.ajax({
				 //http://127.0.0.1:8000/mreporting/sync_mobile/syncRepSS?cid=DELTA&repid=13073&mobile=8801234567890&password=123
				 //url: apipath+'sync_mobile/syncRepSS?cid=DEMO&dpid='+mobile+'&mobile=8801234567890&password='+password,
				 url: apipath+'sync_mobile/syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password,
				 success: function(result) {
						loginResult=result
						
						if (loginResult==''){
							alert ('Sorry, Network not available');
						}
						
						var loginResultArray = loginResult.split('rdrd');			
						if (loginResultArray[0]=='YES'){
							//alert (loginResult);
							syncCode=loginResultArray[1];
							routeListStr=loginResultArray[2];
							itemListStr=loginResultArray[3];
							dvCount=loginResultArray[4];
									
							localStorage.cid=cidValue;
							localStorage.userid=repid;
							localStorage.password=password;
							localStorage.synccode=syncCode;
							localStorage.routeList=routeListStr;
							localStorage.itemList=itemListStr;
							localStorage.itemDivCount=dvCount;
							
							$("#mySyncError").text("Authorization Synced Successfully");
							$("#cid").val("") ;
							$("#repid").val("") ;
							$("#password").val("") ;
							
							$('#routeList').empty();
							$('#routeList').append(localStorage.routeList).trigger('create');						
													
							//$("#routeList").html(localStorage.routeList)
							
							var url = "#pageSync";
							$(location).attr('href',url);
							
							//---------------
						}else if (loginResultArray[0]=='NO'){
							var url = "#pageSync";      
							
							$(location).attr('href',url);
							$("#mySyncError").html('Authentication Error');			
						}
				  },
				  error: function(result) {
					alert(errror_str);
				  }
				  
			});//end ajax
		  }//end else of blank apipath
		};//end else of blank field
		 
	});//end check click
	
	//================================
	
	$('#routeSync').click(function() {
		$("#routeID").val();
		var routeIdName=$("#routeID").val();
		if (routeIdName=="" || routeIdName==undefined){
			$("#mySyncError").html('Select Route');			
			
			var url = "#pageSync";      
			$(location).attr('href',url);
		
		}else{
			$("#mySyncError").text("");
			
			var routeIdNameArray = routeIdName.split('-');
			var routeId=routeIdNameArray[0];
			var routeName=routeIdNameArray[1];
			
			//alert(apipath+'sync_mobile/syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId);
			$.ajax({
				 //http://127.0.0.1:8000/mreporting/sync_mobile/syncClientSS?cid=DELTA&repid=101&password=123&synccode=8943&routeid=BP33
				 url: apipath+'sync_mobile/syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId,
				 success: function(result) {
						
						if (result==''){
							alert ('Sorry, Network not available');
						}
						//alert (result);
						var clientResArray = result.split('rdrd');			
						if (clientResArray[0]=='YES'){
							
							clientListStr=clientResArray[1];
																
							localStorage.routeId=routeId;
							localStorage.routeName=routeName;
							localStorage.clientListStr=clientListStr;
							
							$("#mySyncError").text("Route '"+localStorage.routeName+" ("+localStorage.routeId+" )' Synced Successfully");	
							
							
							//$('#clientList').empty();
							//$('#clientList').append(temp).trigger('create');
							
							/*$('#clientList').html(localStorage.clientListStr.toString());
							
							var url = "#pageClient";
							$(location).attr('href',url);*/
							
							//---------------
						}else if (clientResArray[0]=='NO'){
							$("#mySyncError").text('Authentication Error');		
							
							var url = "#pageSync";
							$(location).attr('href',url);
						}
				  },
				  error: function(result) {
					alert(errror_str);
				  }
				  
			});//end ajax
			
			}	
		
		
		});
	
	
	
}); 

//================== Sync page
function getSyncPage() {		
		
		if (localStorage.routeList=="" || localStorage.routeList=="None"){
			$("#mySyncError").html('Authorization Sync Required');	
			$('#routeList').empty();
					
		}else{
			$('#routeList').empty();
			$('#routeList').append(localStorage.routeList).trigger('create');	
			
			}
		
		var url = "#pageSync";      
		$(location).attr('href',url);		
	}


//================== Clear Sync
function clearSync() {
	localStorage.cid="";
	localStorage.userid="";
	localStorage.password="";
	localStorage.synccode="";
	localStorage.routeList="";
	localStorage.itemList="";
	localStorage.itemDivCount="";
	localStorage.routeId="";
	localStorage.routeName="";
	localStorage.clientListStr="";
}



//================== Client List
/*function getClientList() {	
		$("#routeID").val();
		var routeIdName=$("#routeID").val();
		if (routeIdName=="" || routeIdName==undefined){
			$("#mySyncError").html('Select Route');			
			
			var url = "#pageSync";      
			$(location).attr('href',url);
		
		}else{
			$("#mySyncError").text("");
			
			var routeIdNameArray = routeIdName.split('-');
			var routeId=routeIdNameArray[0];
			var routeName=routeIdNameArray[1];
			
			//alert(apipath+'sync_mobile/syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId);
			$.ajax({
				 //http://127.0.0.1:8000/mreporting/sync_mobile/syncClientSS?cid=DELTA&repid=101&password=123&synccode=8943&routeid=BP33
				 url: apipath+'sync_mobile/syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId,
				 success: function(result) {
						
						if (result==''){
							alert ('Sorry Network not available');
						}
						//alert (result);
						var clientResArray = result.split('rdrd');			
						if (clientResArray[0]=='YES'){
							
							clientListStr=clientResArray[1];
																
							localStorage.routeId=routeId;
							localStorage.routeName=routeName;
							localStorage.clientListStr=clientListStr;
							
							$("#mySyncError").text("Route '"+localStorage.routeName+" ("+localStorage.routeId+" )' Synced Successfully");	
							
							
							//$('#clientList').empty();
							//$('#clientList').append(temp).trigger('create');
							
							/*$('#clientList').html(localStorage.clientListStr.toString());
							
							var url = "#pageClient";
							$(location).attr('href',url);*/
							
							//---------------
/*						}else if (clientResArray[0]=='NO'){
							$("#mySyncError").text('Authentication Error');		
							
							var url = "#pageSync";
							$(location).attr('href',url);
						}
				  },
				  error: function(result) {
					alert(errror_str);
				  }
				  
			});//end ajax
			
		}		
}*/



//================== Client List
function clientList() {	
	var clientList=localStorage.clientListStr;
				
	if (clientList=="" || clientList==undefined){
			$("#myerror").text("Please Sync Route");
		
		}else{
			//$('#clientList').empty();
			//$('#clientList').append(clientList).trigger('create');
			
			$('#clientList').html(clientList);
			
			var url = "#pageClient";
			$(location).attr('href',url);
			}
			
}


//================== Order
function getOrder(clientIdName) {
		$("#clientErrMsg").text("");
		
		var clientIdName=clientIdName;
		var itemList=localStorage.itemList;
		if (itemList==""){
			$("#clientErrMsg").text("Item not available");	
		}else{	
				var clientArray=clientIdName.split("-");
				var clientId=clientArray[0];
				var clientName=clientArray[1];
				
				$("#clientID").val(clientId);
				$("#clientName").val(clientName);
								
				var clientStr='<table style="width:100%"><tr><td style="width:25%"> Client ID</td><td >: '+clientId+'</td></tr><tr><td style="width:25%"> Client Name</td><td>: '+clientName+'</td></tr><tr><td>'+'&nbsp;'+'</td><td>&nbsp;</td></tr></table>';
				
				
				$('#clientDiv').empty();
				$('#clientDiv').append(clientStr).trigger('create');
				
				
				$('#orderListDiv').empty();
				$('#orderListDiv').append(itemList).trigger('create');
				
				$('#itemCountDiv').empty();
				$('#itemCountDiv').append(localStorage.itemDivCount).trigger('create');
				
				var url = "#pageOrder";      
				$(location).attr('href',url);
			}
				  
}

//================== Order Next
function ordNext() {
		$("#ordErrMsg").text("");
		
		var clientID=$("#clientID").val();
		var clientName=$("#clientName").val();
		
		if (clientID==""){
			$("#reqErrMsg").text("Required Client");
		}else{
						
			var tableStr='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
			tableStr+='<tr><td >'+'<b>Client ID</b>'+'</td><td>:&nbsp;'+ clientID +'</td></tr>'
			tableStr+='<tr><td>'+'<b>Client Name</b>'+'</td><td>:&nbsp;'+ clientName +'</td></tr>'
			tableStr+='<tr><td>'+'&nbsp;'+'</td><td>&nbsp;</td></tr>'
			tableStr+='</table>'
			
			
			tableStr+='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
        	tableStr+='<tr><td style="font-size:12px"><b>Item Name (ID)</b></td><td style="font-size:12px;text-align:right"><b>Rate</b></td><td style="font-size:12px;text-align:right">&nbsp;<b>Qty</b></td><td style="font-size:12px;text-align:right"><b>Amount</b></td></tr>'
			
			var divCount=$("#divCount").val();
			//alert (divCount);
			var count=0;
			var submitStr='';
			var amount=0.0
			var totalAmt=0.0
			for (i=0; i<divCount; i++){
				count=count+1
				var itemIdNameRate=$("#itemId"+count).val();
				var itemIdNameRateArray = itemIdNameRate.split('-');
				
				var itemId=itemIdNameRateArray[0]
				var itemName=itemIdNameRateArray[1]
				var itemRate=itemIdNameRateArray[2]			
				var itemQty=$("#itemQty"+count).val();
				var amount=0
				if (itemQty=='' || itemQty==0){
					continue
				}else{                
					if (isNaN(itemQty)){
						continue
					}else{
						amount=(itemQty*itemRate)
						totalAmt=totalAmt+amount
						}
				}
				
				if (submitStr==''){
					submitStr=itemId+'fdfd'+itemName+'fdfd'+itemRate+'fdfd'+itemQty						
				}else{
					submitStr=submitStr+'fdrd'+itemId+'fdfd'+itemName+'fdfd'+itemRate+'fdfd'+itemQty
				}
				
			    tableStr+='<tr><td style="font-size:10px">'+itemName+' ('+itemId+')'+'</td><td style="font-size:10px; text-align:right">'+itemRate+'</td><td style="font-size:10px; text-align:right">'+ itemQty +'</td><td style="font-size:10px; text-align:right">'+ amount.toFixed(2) +'</td></tr>'
				
			}//end for loop
			//alert(totalAmt.toFixed(2))	
			tableStr+='<tr><td style="font-size:11px"><b>Total</b></td><td >'+''+'</td><td >'+ '' +'</td><td style="font-size:11px; text-align:right"><b>'+ totalAmt.toFixed(2) +'</b></td></tr>'
			tableStr+='</table>'
			
			submitStr=clientID+'rdrd'+submitStr
			//alert(submitStr)
			if (totalAmt > 0){				
				$("#voucherItem").val(submitStr);
				
				$('#voucherDiv').empty();
				$('#voucherDiv').append(tableStr).trigger('create');
				
				var url = "#pageVoucher";      
				$(location).attr('href',url);
				
			}else{
				$("#ordErrMsg").text("Required Item");
				}
				
		}
}

//========================== voucher Submit
function orderSubmit() {
		var voucherItem=$("#voucherItem").val();
		
		if (voucherItem!=''){
			getLatLong();
			
			var latitude=$("#lat").val();
			var longitude=$("#long").val();
			
			//alert (apipath+'orderSubmit?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem));
			$.ajax({
					 //http://127.0.0.1:8000/mreporting/sync_mobile/orderSubmit?cid=DELTA&repid=101&password=123&synccode=6520&routeid=DE15&mLatitude=&mLongitude=&data=14891rdrd170fdfdACTIVIT%20B%20100ML.%20SYRUPfdfd15.74fdfd5fdrd204fdfdACTIVIT%20GOLD%20TABfdfd135.34fdfd6
					  url: apipath+'sync_mobile/orderSubmit?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem),
					  success: function(result) {
						  
						if (result!='NO'){
							resArray=result.split(',')
							if (resArray[0]=='success'){
								var vRes="Voucher No. "+resArray[1]
								$('#successVno').empty();
								$('#successVno').append(vRes).trigger('create');
											
								url = "#pageEnd"; 
								$(location).attr('href',url);
							}							
						}else{
							alert('Authentication Error');
							}
						
					  },
					  error: function(result) {
						alert(errror_str);
					  }				  
			});
			
		}else{	
			alert (errorStr);		
			}
}

function pageEndNextClient() {
			url = "#pageClient";	
			$(location).attr('href',url);
}

//===================

function exit() {
navigator.app.exitApp();
}



