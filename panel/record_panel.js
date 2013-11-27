var curr_replace_id = 0,
	before = "",
	after = "";

$(document).ready(function(){
	$('.record').click(addRecordListener);
	$('.differ').click(diffUsingJS);
	$('.zipper').click(generateZip);
	$('#showtext').click(function() {
		$('.text-area').css('display',$('#showtext').prop('checked') ? 'block' : 'none');
	});
	$('.next').click(function() {
		$("html, body").scrollTop($($('.anchor')[curr_replace_id]).offset().top);
		curr_replace_id++;
		if (curr_replace_id > $('.anchor').length-1) {
			curr_replace_id = 0;
		}
	});
	addRecordListener();
});

function addRecordListener(e) {
	$("#app-state").text("RECORDING")
	// get the current styles of the page
	//$(e.target).toggleClass("recording");
	chrome.devtools.inspectedWindow.getResources(function(resources) {
		$("#before").val("");
		for (var i = 0; i <= resources.length; i++) {
			if (resources[i].type == "stylesheet") {
				$("#before").val(resources[i].type);
				var c = resources[i].getContent(function(content, encoding){
		    		$("#before").val(content);
		    		before = content;
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
	    after = content;
	    $("button.differ").css('display','block');
	    $("button.zipper").css('display','block');
	    $(".credit").css('display','block');
	})
}

function generateZip() {

	var zip = new JSZip();
	var beforeFolder = zip.folder("before");
	beforeFolder.file("before.css", before);
	var afterFolder = zip.folder("after");
	afterFolder.file("after.css", after);
	var content = zip.generate();
	location.href="data:application/zip;base64,"+content;
}
function diffUsingJS() {
	"use strict";
	var byId = function (id) { return document.getElementById(id); },
		base = difflib.stringAsLines(before),
		newtxt = difflib.stringAsLines(after),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = byId("diffoutput"),
		contextSize = 10;

	diffoutputdiv.innerHTML = "";
	contextSize = contextSize || null;

	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: "Before",
		newTextName: "After",
		contextSize: contextSize,
		viewType: 1
	}));
	$('#next-container').css('display', 'block');
}

