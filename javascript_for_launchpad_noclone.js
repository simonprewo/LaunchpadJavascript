<script type="text/javascript">

var handlingOTConLaunchpad = {

	modifyApps: function(data, filterapplicationid, tcotcbasisurl) {
        $( 'div[appid='+filterapplicationid+'].myapp-body' ).each(function(iter, value) {
			var myAppElement = $(this);
            handlingOTConLaunchpad.removeStringStarten(myAppElement.find("div.myapps-image"));
			handlingOTConLaunchpad.removeManageUsersLink(myAppElement.parent());
			
			if (typeof myAppElement.parent().find("a.myapps-manage-app") == typeof undefined || myAppElement.parent().find("a.myapps-manage-app") == false) {
					return;
			}
			$.each(data.content, function(i, value) {
			    if (typeof myAppElement.parent().find("a.myapps-manage-app") == typeof undefined || myAppElement.parent().find("a.myapps-manage-app") == false || myAppElement.parent().find("a.myapps-manage-app").length == 0) {
			        return;
		        }
				if (myAppElement.parent().find("a.myapps-manage-app").attr('href').indexOf(value.companyEntitlementId) >= 0) {
					handlingOTConLaunchpad.setTitle(myAppElement, value.companyEntitlementExternalVendorIdentifier);
					if (value.partner == "TSYSTEMS"){
						var tcotcurl = tcotcbasisurl+"ADT-TSI&xdomain_id="+value.companyEntitlementExternalVendorIdentifier;
						handlingOTConLaunchpad.setOtcLink(myAppElement, tcotcurl);
					}
					return;
				}
			});
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
	
	setTitle: function(myAppElement, title) {
		if (typeof myAppElement.find("div.status-title") == typeof undefined || myAppElement.find("div.status-title") == false) {
			return;
		}
		myAppElement.find("div.status-title").text(title);
		myAppElement.find("div.status-title").css("font-size", "15px");
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