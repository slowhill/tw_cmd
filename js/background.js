var stream = function() {
    var notifications = localStorage.optNotifications;
    if(notifications === '0') {
        return chrome.browserAction.setBadgeText({text: ''});
    }
    chrome.browserAction.setBadgeText({text: ''});
    Twitter.stream('user', function(res) {
        var notifications = localStorage.optNotifications;
        if(notifications === '0') {
            return chrome.browserAction.setBadgeText({text: ''});
        }
        if(res.friends) { return; }
        chrome.browserAction.getBadgeText({}, function(text) {
            var count = parseInt(text) || 0;
            count++;
            chrome.browserAction.setBadgeText({text: count.toString()});
            chrome.browserAction.setBadgeBackgroundColor({color: '#3BAAE0'});
        });
    });
}

/* Listen for messages from other app components */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    sendResponse({});
    
    /* Get an Access Token */
    var params = Twitter.deparam(request.session);
    Twitter.setOAuthTokens(params);
    Twitter.api('oauth/access_token', 'POST', params, function(res) {
        Twitter.setOAuthTokens(Twitter.deparam(res));
        setTimeout(stream, 3000);
    });
});

if(Twitter.isLoggedIn()) {   
    stream();
}

chrome.omnibox.setDefaultSuggestion({description: 'Browse twitter for %s'});


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
        {content: "@" + text, description: "Go to @" + text + "'s twitter profile"}
    ]);
});


// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {
    switch(true) {
        case !!(text.match(/@/)):
            window.open('https://twitter.com/' + encodeURIComponent(text.replace('@', '')));
        break;
        default:
            window.open('https://twitter.com/#!/search/' + encodeURIComponent(text));
        break;
    }
});