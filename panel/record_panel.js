$(document).ready(function(){
	$('button').click(addRecordListener);

});

function addRecordListener(e) {

	// get the current styles of the page
	$(e.target).toggleClass("recording");
	chrome.devtools.inspectedWindow.getResources(function(resources) {
		$("#before").val("");
		for (var i = 0; i <= resources.length; i++) {
			if (resources[i].type == "stylesheet") {
				$("#before").val(resources[i].type);
				var c = resources[i].getContent(function(content, encoding){
		    		$("#before").val(content);	
					chrome.devtools.inspectedWindow.eval('console.log("content:'+"hello content"+'")');
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
		chrome.devtools.inspectedWindow.eval('console.log("content:'+content+'")');
	    $("#after").val("");
	    $("#after").val(content);
	})
}