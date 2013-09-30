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