<script type="text/javascript">


 /* END set OTC applicationid and urls */
 
var handlingOTConLaunchpad = {

	cloneApps: function(data, filterapplicationid, tcotcbasisurl) {
		var tcposition = [];
		var firstitemdet = true;
			for (var counti = 0; counti < data.content.length; counti++) {
				if (data.content[counti].applicationId != null && data.content[counti].applicationId == filterapplicationid){
					tcposition.push(counti);
					if (firstitemdet == false){
						if (data.content[counti].partner === "DEUTSCHE"){
							tcappdchannel= "ADT-TDG";
						}else{
							tcappdchannel= "ADT-TSI";
						}
						tcotcurl = tcotcbasisurl+tcappdchannel+"&xdomain_id="+data.content[counti].companyEntitlementExternalVendorIdentifier;
						/* clone myapps item */
						$tcappitem = $( "#myappsCollectionView div.myapps-item").eq(tcposition[0]+1).clone(false, false);
						$tcappitem.find("div.myapps-settings-menu").addClass("tctoggle");
						$tcappitem.find("div.myapp-body").click(function(e) {
							window.open(tcotcurl, '_blank');
						});
						$tcappitem.find("a.myapps-settings").click(function(event) {
							$(this).closest("div.myapps-item").find("div.myapps-settings-menu").toggle();
							$(this).closest("div.myapps-item").find("div.myapps-settings-menu").css({top: 108, left: 91, position:'absolute'});
							event.stopPropagation();
						});
						$tcappitem.find("a.myapps-assign-users").attr("href", data.content[counti].assignUrl);
						$tcappitem.find("a.myapps-manage-app").attr("href", data.content[counti].manageUrl);
						var tentxt = data.content[counti].companyEntitlementExternalVendorIdentifier;
						$tcappitem.find("div.status-title").text(tentxt);
						/* insert new myapps item */
						$tcappitem.appendTo( $("#myappsCollectionView").last()).show();
					} else {
						var tentxtfirst = data.content[counti].companyEntitlementExternalVendorIdentifier;
						$( "#myappsCollectionView div.myapps-item").eq(tcposition[0]+1).find("div.status-title").text(tentxtfirst);
					}
					firstitemdet = false;
					}
				}
			}
	};

$( document ).ready(function() {
/* OTC add myapps multiple items */
/* set OTC applicationid and urls */
var filterapplicationid = "2525";
tcotcbasisurl = "https://auth.otctest.t-systems.com/authui/saml/login?xdomain_type=";
tcmyappsapiuserurl = "https://wellstein.bmptest.de/api/account/v1/userinfo.json";
tcmyappsapibasisurl = "https://wellstein.bmptest.de/api/account/v2/companies/";
/* END set OTC applicationid and urls */	

var firstitemdet = true;
	setTimeout(function() {
		$.get(tcmyappsapiuserurl,function(dat){
			tcmyappscompid = dat.company_id;
			tcmyappsusid = dat.user_id;
		},'json')
		.success(function( da ) {
			tcmyappsapiurl = tcmyappsapibasisurl+tcmyappscompid+"/memberships/"+tcmyappsusid+"/myapps";
			$.get(tcmyappsapiurl, function( data ) { handlingOTConLaunchpad.cloneApps(data,  filterapplicationid, tcotcbasisurl)}, 'json');
		});
	},1200);
});
/* END OTC add myapps multiple items */
</script>