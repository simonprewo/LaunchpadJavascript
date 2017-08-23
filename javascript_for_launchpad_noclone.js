<script type="text/javascript">

var handlingOTConLaunchpad = {

	modifyApps: function(data, filterapplicationid, tcotcbasisurl) {
        $( 'div[appid='+filterapplicationid+'].myapp-body' ).each(function(iter, value) {
            handlingOTConLaunchpad.removeStringStarten($(this).find("div.myapps-image"));
			handlingOTConLaunchpad.removeManageUsersLink($(this).parent());

			var myAppElement = $(this);
			$.each(data.content, function(i, value) {
				if (typeof myAppElement.parent().find("a.myapps-manage-app") == typeof undefined || myAppElement.parent().find("a.myapps-manage-app") == false) {
					return;
				}
				if (myAppElement.parent().find("a.myapps-manage-app").attr('href').indexOf(value.companyEntitlementId) >= 0) {
					if (typeof myAppElement.find("div.status-title") == typeof undefined || myAppElement.find("div.status-title") == false) {
						return;
					}
					myAppElement.find("div.status-title").text(value.companyEntitlementExternalVendorIdentifier);
					myAppElement.find("div.status-title").css("font-size", "15px");
					return;
				}
			});
			/**var tcappdchannel = "";
			
			if (currentApp.partner !== "DEUTSCHE"){
				tcappdchannel= "ADT-TSI";
				var tcotcurl = tcotcbasisurl+tcappdchannel+"&xdomain_id="+currentApp.companyEntitlementExternalVendorIdentifier;
				setOtcLink(myAppElement, tcotcurl);
			}*/
        });
	},
		
	removeStringStarten: function(elementToRemoveFromTitle) {
		var title = elementToRemoveFromTitle.attr("title");
		if (typeof title !== typeof undefined && title !== false) {
			title = title.replace('starten','');
			elementToRemoveFromTitle.attr("title", title)			
		}
	},
	
	setOtcLink: function(otcItem, otcLink) {
	    otcItem.find("div.myapp-body").parent().off();
		otcItem.find("div.myapp-body").off().click(function(e) {
			window.open(otcLink, '_blank');
		});
	},
	
	removeManageUsersLink: function(oTCElement) {
		if (oTCElement.find("a.myapps-assign-users").length ) {
			oTCElement.find("a.myapps-assign-users").parent().remove();
		} else {
			oTCElement.closest( "div.myapps-item" ).find("a.myapps-assign-users").parent().remove();
		}
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
		if ( $( 'div[appid='+filterapplicationid+'].myapp-body' ).length == 0) {
			return;
		}
		$.get(tcmyappsapiuserurl,function(dat){
			tcmyappscompid = dat.company_id;
			tcmyappsusid = dat.user_id;
		},'json')
		.success(function( da ) {
			tcmyappsapiurl = tcmyappsapibasisurl+tcmyappscompid+"/memberships/"+tcmyappsusid+"/myapps";
			$.get(tcmyappsapiurl, function( data ) { handlingOTConLaunchpad.modifyApps(data,  filterapplicationid, tcotcbasisurl)}, 'json');
		});
	},1100);
});


/* END OF OTC MULTIPLIER */
</script>