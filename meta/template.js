$( document ).ready( function(){
	var colortabs = ["0066ff", "ff2ad4", "00d455", "ff2a2a"];
	var htmlstring = "";
	$("#main-menu").load("/meta/main-menu.html");
	
	//Build page from xml data
	//Load the xml file using ajax 
        $.get("main.xml", function (xml) {
                console.log("Success");
                // Parse the xml file and get data
                var xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
                $(xml).find("section").each(function () {
                        console.log("hey");
                        htmlstring+="<div class=\"body-box\">";
                        if($(this).find("title").text()!="")
                        {
                                htmlstring+="<h1>"+$(this).find("title").text()+"</h1>";
									console.log("<h1>"+$(this).find("title").text()+"</h1>");
                        }
                        if($(this).find("content").text()!="")
                        {
                                htmlstring+="<p>"+$(this).find("content").text()+"</p>";
                        }
                        if($(this).find("feed").text()!="")
                        {
				htmlstring+="<div class=\"feed\">";
				var feedurl = $(this).find("feed").text();
				console.log(feedurl);
				$.ajax({
				        type: "GET",
				        url: feedurl, 
				        async: false,
				        dataType: "xml",
				        success: function (feedxml) {
				                console.log("Success 2");
				                // Parse the xml file and get data
				                var feeddoc = $.parseXML(feedxml), $feedxml = $(feeddoc);
				                $(feedxml).find("entry").each(function(){
					                htmlstring+="<div class=\"entry\">";
					                if($(this).find("title").text()!="")
					                {
						                htmlstring+="<h2 class=\"feedtitle\">"+$(this).find("title").text()+"</h2>";
					                }
					                if($(this).find("author").text()!="")
					                {
						                htmlstring+="<p class=\"subtitle\">"+$(this).find("author").text()+"</p>";
					                }
					                if($(this).find("time").text()!="")
					                {
						                htmlstring+="<p class=\"subtitle\"><i>"+$(this).find("time").text()+"</i></p>";
					                }
					                if($(this).find("content").text()!="")
					                {
						                htmlstring+="<p class=\"feedcontent\">"+$(this).find("content").text()+"</p>";
					                }
					                htmlstring+="<hr />";
					                htmlstring+="</div>";
				                });
			                }
		                });
                                htmlstring+="</div>";
                        }
                        htmlstring+="</div>";
                });
		$("#main-body").append(htmlstring);
        }, "xml");
	
	$(".footer").html("<footer><p><a href=\"/\"><img class=\"footer-logo\" src=\"/media/IMSA_Undefined_Logo_White.png\" alt=\"IMSA Undefined\"></a>&nbsp;&nbsp;&nbsp;Copyright &copy; IMSA Undefined 2014</p></footer>");
});

