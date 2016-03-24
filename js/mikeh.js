// JavaScript Document

$(document).ready(function() {
	
	$("#searchFrm").submit(function(e){
		e.preventDefault();
		doAjaxSearch();
	});
	
	$("#searchFrm input[type=button]").bind('click', function() {
 		doAjaxSearch();
	}); 
	
	
	//functions***********************
	
	//requête ajax
	var doAjaxSearch = function() {
        var searchedString = "";
		var searchUrl = "";  
		var staticUrl = "https://cloudplatform.coveo.com/rest/search?access_token=6318103b-f9da-437c-854b-9e6f1f44e27b&q=";
		  
		//ici bien sûr on pourrait aller beaucoup plus loin avec message
		//d'erreur si le string de recherche est vide ou forcer un affichage
		//par défaut par exemple...
		searchedString = $("#mainSearch").val();
		
		//concaténation du string statique et de celui de recherche,
		//je doute qu'il soit très sécuritaire que ma clé se trouve directement dans le code mais bon,
		//il s'agit d'un démo ;)
		searchUrl = staticUrl + searchedString;
		
		$.ajax({
			url: searchUrl, 
			type: "POST",
			dataType: "json",
			success: function(answer){
			parseResults(answer);
		}});
     };
	 
	 
	 //parser et afficher
	 var parseResults = function(answer) { 
		 var strHTML = "";  
		
		$.each(answer.results, function (key, data) {
			strHTML = strHTML + "<div class='responseElem col-lg-3 col-sm-6 col-xs-12'><div>";
			
			//concoles.log laissés volontairement
			//console.log(data);
			//console.log(data.title);
			//console.log(data.printableUri);
			
				strHTML = strHTML + "<h4>" + data.title + "</h4>";
				strHTML = strHTML + "<img src='"+data.raw.tpthumbnailuri+"' />";
				strHTML = strHTML + "<p>" + data.excerpt + "</p>";
				strHTML = strHTML + "<a href='" + data.printableUri + "' target='_blank'>Consulter</a>";		
					
			strHTML = strHTML + "</div></div>";			
			
		});
		
		//affichage dans la zone prévue
		$("#resultArea").html(strHTML);
     };
});