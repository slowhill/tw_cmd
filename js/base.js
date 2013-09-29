define(['jquery.min', 'OAuth', 'sha1', 'twitter', 'command_dispatch', 'commands', 'const'], function() {
    var $ext = window.$ext = chrome.extension.getBackgroundPage(),
        $content = window.$content = $('#content');
    
    chrome.browserAction.setBadgeText({text: ''});
    
    /* Make sure the user is logged in */
    if(!Twitter.isLoggedIn()) {   
        return Twitter.authenticate();
    }

//    Twitter.api("statuses/home_timeline", "GET", $.proxy(function(response){
//        console.log(response);
//        response.forEach(function(tweet) {
//            if (tweet.text.substring(0, 3) == "RT ") {
//                var output = tweet.retweeted_status.user.name + " (@" + tweet.retweeted_status.user.screen_name + "): " + tweet.retweeted_status.text;
//                var stamp = "Retweeted by " + tweet.user.name + " on " + tweet.created_at;
//            } else {
//                var output = tweet.user.name + " (@" + tweet.user.screen_name + "): " + tweet.text;
//                var stamp = "" + tweet.created_at;
//            }
//            console.log(output);
//            console.log(stamp);
//            $("#timeline").append("<li>"+output).trigger('create');
//            $("#timeline").append("<ul><li>"+stamp+"</li></ul></li>").trigger('create');
//        });
//        console.log("done.");
//        Cmd.dispatch("tl");
//        Cmd.dispatch("rt theyeung1");
//        Cmd.dispatch("reply theyeung1");
//    }));
    /*function testcmd_dispatch() {
        console.log("start cmd_dispatch");
        cmd_dispatch("ls");
        cmd_dispatch("rt theyeung1");
        cmd_dispatch("reply theyeung1");
        console.log("done");
    }
    testcmd_dispatch();*/
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