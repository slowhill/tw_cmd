chrome.extension.sendRequest({type: 'auth', session: window.location.search.substr(1)}, function(response) {
	window.open('', '_self', '');
	window.close();
});