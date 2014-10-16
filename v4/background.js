// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
	// With a new rule ...
	chrome.declarativeContent.onPageChanged.addRules([
	    {
		// That fires when we hit the 2048 game
		conditions: [
		    new chrome.declarativeContent.PageStateMatcher({
			pageUrl: { hostEquals: 'gabrielecirulli.github.io' },
		    })
		],
		// And shows the extension's page action.
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	    }
	]);
    });
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
    	code: 'var s = document.createElement("script"); s.type  = "text/javascript"; s.src = "http://inst.eecs.berkeley.edu/~rohin/scholars/2048/play_2048.js"; document.body.appendChild(s);'
    });
});
