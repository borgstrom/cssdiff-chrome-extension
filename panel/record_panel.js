$(document).ready(function(){
	$('button').click(addRecordListener);

});

function addRecordListener(e) {
	 chrome.extension.getBackgroundPage().console.log("Hello, world!")
	// get the current styles of the page
	$(e.target).toggleClass("recording");
	chrome.devtools.inspectedWindow.getResources(function(resources) {
		$("#before").val("");
		for (var i = 0; i <= resources.length; i++) {
			if (resources[i].type == "stylesheet") {
				$("#before").val(resources[i].type);
				var c = resources[i].getContent(function(content, encoding){
		    		$("#before").val(content);	
		    		// if (!$(e.target).hasClass("recording")) {
		    		// 	$("#after").val(content);	

		    		// } else {
		    		// 	$("#after").val("");
		    		// }
				});
				break;
			}
			
			
		}
	});
	// listen for a inspector style change
	chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
	    $("#after").val("");
	    $("#after").val(content);
	})
}