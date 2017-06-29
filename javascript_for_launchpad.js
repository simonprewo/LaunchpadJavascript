<script type="text/javascript">

var handlingOTConLaunchpad = {

	cloneApps: function(data, filterapplicationid, tcotcbasisurl) {
		var firstitemdet = true;
		var initialOTCElement = null;
		for (var waitExist = 1; waitExist < 50; waitExist++) {
			if ( $( 'div[appid='+filterapplicationid+'].myapp-body' ).length ) {
				initialOTCElement = $( 'div[appid='+filterapplicationid+'].myapp-body' ).parent();
				break;
			}
			setTimeout(function(){}, waitExist * 10);
		}
		for (var counterForApps = 0; counterForApps < data.content.length; counterForApps++) {
			var currentApp = data.content[counterForApps];
			if (currentApp.applicationId != null && currentApp.applicationId == filterapplicationid){
				if (firstitemdet == false){
					var tcappdchannel = "";
					if (currentApp.partner === "DEUTSCHE"){
						tcappdchannel= "ADT-TDG";
					} else {
						tcappdchannel= "ADT-TSI";
					}
					var tcotcurl = tcotcbasisurl+tcappdchannel+"&xdomain_id="+currentApp.companyEntitlementExternalVendorIdentifier;
					handlingOTConLaunchpad.cloneLaunchPadItem(initialOTCElement, currentApp.assignUrl, currentApp.manageUrl, currentApp.companyEntitlementExternalVendorIdentifier, tcotcurl);
				} else {
					var tentxtfirst = currentApp.companyEntitlementExternalVendorIdentifier;
					initialOTCElement.find("div.status-title").text(tentxtfirst);
					initialOTCElement.find("div.status-title").css("font-size", "15px");
					initialOTCElement.find("a.myapps-assign-users").parent().remove();
					handlingOTConLaunchpad.removeStringStarten(initialOTCElement.find("div.myapps-image"));
				}
				firstitemdet = false;
			}
		}
	},
	
	cloneLaunchPadItem: function(itemToBeCloned, assignUsersURL, manageAppURL, title, otcLink) {
		clonedItem = itemToBeCloned.clone(false, false);
		clonedItem.find("div.myapps-settings-menu").addClass("tctoggle");
		clonedItem.find("div.myapp-body").click(function(e) {
			window.open(otcLink, '_blank');
		});
		clonedItem.find("a.myapps-settings").click(function(event) {
			$(this).closest("div.myapps-item").find("div.myapps-settings-menu").toggle();
			if ( clonedItem.find("a.myapps-assign-users").length ) {
				$(this).closest("div.myapps-item").find("div.myapps-settings-menu").css({top: 108, left: 91, position:'absolute'});
			} else {
				$(this).closest("div.myapps-item").find("div.myapps-settings-menu").css({top: 148, left: 91, position:'absolute'});
			}
			event.stopPropagation();
		});
		if ( clonedItem.find("a.myapps-assign-users").length ) {
			clonedItem.find("a.myapps-assign-users").attr("href", assignUsersURL);
		}
		clonedItem.find("a.myapps-manage-app").attr("href", manageAppURL);
		clonedItem.find("div.status-title").text(title);
		clonedItem.appendTo( $("#myappsCollectionView").last()).show();
	},
	
	removeStringStarten: function(elementToRemoveFromTitle) {
		var title = elementToRemoveFromTitle.attr("title");
		title = title.replace('starten','');
		elementToRemoveFromTitle.attr("title", title)
	}
	
};

$( document ).ready(function() {
/* BEGIN CONFIGURATION */
var filterapplicationid = "2525";
tcotcbasisurl = "";
tcmyappsapiuserurl = "";
tcmyappsapibasisurl = "";
/* END CONFIGURATION */

	setTimeout(function() {
		$.get(tcmyappsapiuserurl,function(dat){
			tcmyappscompid = dat.company_id;
			tcmyappsusid = dat.user_id;
		},'json')
		.success(function( da ) {
			tcmyappsapiurl = tcmyappsapibasisurl+tcmyappscompid+"/memberships/"+tcmyappsusid+"/myapps";
			$.get(tcmyappsapiurl, function( data ) { handlingOTConLaunchpad.cloneApps(data,  filterapplicationid, tcotcbasisurl)}, 'json');
		});
	},900);
});
</script>