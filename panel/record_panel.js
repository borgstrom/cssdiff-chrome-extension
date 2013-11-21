$(document).ready(function(){
	$('.record').click(addRecordListener);
	$('.differ').click(diffUsingJS);

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
		    		//alert(content);
		    		var str = String(content).substring(0,500);
					chrome.devtools.inspectedWindow.eval('console.log("content:'+"hello content"+'")');
					chrome.devtools.inspectedWindow.eval('console.log("content:'+str+'")');
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


function diffUsingJS() {
	"use strict";
	var byId = function (id) { return document.getElementById(id); },
		base = difflib.stringAsLines(byId("before").value),
		newtxt = difflib.stringAsLines(byId("after").value),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = byId("diffoutput"),
		contextSize = 0	;

	diffoutputdiv.innerHTML = "";
	contextSize = contextSize || null;

	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: "Bafore",
		newTextName: "After",
		contextSize: contextSize,
		viewType: "sidebyside"
	}));
}

