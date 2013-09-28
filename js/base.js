define(['jquery.min', 'OAuth', 'sha1', 'twitter'], function() {
    var $ext = window.$ext = chrome.extension.getBackgroundPage(),
        $content = window.$content = $('#content');
    
    chrome.browserAction.setBadgeText({text: ''});
    
    /* Make sure the user is logged in */
    if(!Twitter.isLoggedIn()) {   
        return Twitter.authenticate();
    }

    var route = function() {
        var path = window.location.hash.substr(1) || '';
        
        $content.empty();
        window.scrollTo(0,0);
        
        switch(true) {
            case (path == 'compose'):
                require(['compose'], function(compose) {
                    compose.load();
                });
            break;
            case !!(path.match(/reply\/[0-9]+/)):
                require(['compose'], function(compose) {
                    compose.load(path.replace('reply/', ''));
                });
            break;
            default:
                require(['feed'], function(feed) {
                    feed.load(path);
                });
            break;
        }
    };
    
    /* Otherwise just route the request */
    $(window).on('hashchange', function() {
        route();
    });
    route();
});