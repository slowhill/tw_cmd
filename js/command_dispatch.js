(function() {

    var Cmd = {
        dispatch: function(input) {
            var split_input = input.split(" "); // split the input by space
            switch (split_input[0]) {
                case "tl":
                    switch (split_input.length){
                        case 1:
                            var tweets = this.showTweets(null, null);
                            break;
                        case 2:
                            this.showTweets(split_input[1], null);
                            break;
                        case 3: //user, specific number
                            this.showTweets(split_input[1], split_input[2]);
                            break;
                        default:
                            // error
                            break;
                    }
                    break;
                case "reply":
                    if (split_input.length < 3){
                        appendTo(incorrectSyntax); //Error
                        break;
                    }
                    this.replyTweet(split_input[1], split_input.slice(2));
                    break;
                case "rt": //retweet
                    if (split_input.length < 3){
                        appendTo(incorrectSyntax); //Error
                    }
                    this.retweet(split_input[1], split_input.slice(2));
                    break;

                case "tweet": // send a tweet
                    if (split_input.length < 2){
                        appendTo(incorrectSyntax); //Error
                    }
                    this.tweet(this.myConcat(split_input.slice(1)));
                    break;
                case "whois": // show one user's profile
                    if (split_input.length != 2){
                        appendTo(incorrectSyntax);
                    }
                    this.showUsr(split_input[1]);
                    break;
                case "fav":
                    if (split_input.length < 3) {
                        appendTo(incorrectSyntax);
                    } else {
                        this.favTweet(split_input[1], split_input[2]);
                    }
                    break;
                case "del":
                    break;
                case "help":
                    break;
                default:
                    appendTo(incorrectSyntax); //Error
                    break;
            }
        },
        showTweets: function(option, param) {
            if (option == null && param == null){ // no parameters so show all tweets
                Twitter.api("statuses/home_timeline", "GET", $.proxy(function(response){
                    //appendTo(twOps.getTimeline(response));
                    twOps.formatTimelineforTerm(response);
                }));
            } else {
                switch (option){
                    case "-u":
                        if (param == null){
                            appendTo(incorrectSyntax); //Error
                            break;
                        } else {
                            var p = {screen_name:param};
                            Twitter.api("statuses/user_timeline", p, "GET", 
                                $.proxy(function(response){
                                   twOps.formatTimelineforTerm(response);
                            }));
                        }
                        break;
                    case "-t":
                        // show what is trending
                        // options will be local and global and specific location
                        break;
                    case "-n":
                        if (param == null || !isNumber(param) || param > 200){
                            appendTo(incorrectSyntax); //Error
                            break;
                        };
                        Twitter.api("statuses/home_timeline", {count:param}, "GET", $.proxy(function(response){
                                twOps.formatTimelineforTerm(response);
                        }));
                        break;
                    case "more":
                        if (param == null) {
                            Twitter.api("statuses/home_timeline", {max_id: localStorage.getItem('lastTweetId')}, "GET", $.proxy(function(response){
                                twOps.formatTimelineforTerm(response);
                            }));
                        } else if (param == "mentions") {
                            Twitter.api("statuses/mentions_timeline", {max_id: localStorage.getItem('lastTweetId')}, "GET", $.proxy(function(response) {
                                twOps.formatTimelineforTerm(response);
                            }));
                        }
                        break;
                    case "mentions":
                        if (param == null) {
                            Twitter.api("statuses/mentions_timeline", "GET", $.proxy(function(response) {
                                twOps.formatTimelineforTerm(response);
                            }));
                        }
                        break;
                    default:
                        appendTo(incorrectSyntax); //Error
                        break;
                }        
            }
        },
        replyTweet: function(option, param) {
            console.log("reply_tweets");
            if (option == "-u"){ // reply to a user's last tweet
                console.log("reply to a user");
                //TODO: insert API call here
            } else if (option == "-id"){ // reply to a specific tweet
                console.log("reply to specific id");
                //TODO: insert API call here
                indexkey = param[0];
                id_key = localStorage.getItem(indexkey+"key");
                handler_filler = localStorage.getItem(indexkey+"handler");
                //console.log(param.slice(1));
                reply_msg = this.myConcat(param.slice(1));
                console.log(reply_msg);
                this.tweet(reply_msg, id_key);
            } else{
                appendTo(incorrectSyntax); //Error
            }
        },
        retweet: function(option, param) {
            if (option == "-u"){ // retweet a user's last tweet
                console.log("retweet a user");
                //TODO: insert API call here
            } else if (option == "-id"){ // retweet a specific tweet
                console.log("retweet a specific id");
                indexkey = param[0];
                id_key = localStorage.getItem(indexkey+"key");
                console.log(id_key);
                Twitter.api('statuses/retweet/' + id_key, 'POST', {include_entities: true}, $.proxy(function(response){
                    console.log(response);
                }));
            } else{
                appendTo(incorrectSyntax); //Error
            }
        },
        tweet: function(txt, reply_id) {
            console.log(txt);
            if (txt[0] != "\"" || txt[txt.length - 1] != "\"") {
                //TODO: add error message
                console.log("fail cause no quotes");
                return;
            }
            tweet_txt = txt.slice(1, -1);
            console.log(tweet_txt);
            if (tweet_txt.length > 140) {
                //TODO: add error message
                return;
            }
            
            //REPLIES
            console.log(reply_id);
            if (reply_id == null){
                var params = {status:tweet_txt};
            } else {
                console.log("i got an id");
                var params = {status:tweet_txt,
                              in_reply_to_status_id:reply_id}
            }
            
            Twitter.api('statuses/update', 'POST', params, $.proxy(function(response){
                console.log(response);
            }));
            console.log("tweeted: " + txt);
        },
        favTweet: function(option, param) {
            switch(option) {
                case "-u":
                    
                    break;
                case "-id":
                    if (param !== null && isNumber(param)) {
                        indexkey = param[0]
                        id_key = localStorage.getItem(indexkey+"key");
                        handler_key = localStorage.getItem(indexkey+"handler");
                        Twitter.api("favorites/create", {id:id_key}, "POST", $.proxy(function(response){
                            appendTo(twOps.favouriteTweet(response));
                        }));
                    } else {
                        appendTo(incorrectSyntax); //Error   
                    }
                    break;
                default:
                    appendTo(incorrectSyntax); //Error
                    break;
            }
        },
        showUsr: function(usrname) {
            //TODO: insert API call here
            console.log(usrname);
            var params = {screen_name:usrname};
            Twitter.api("users/lookup", params, "POST",
                        $.proxy(function(response){
                            twOps.formatUsrLookup(response);
                        }))
        },
        myConcat: function(txt_input){
            if (txt_input.length == 1){
                return txt_input[0];
            }
            return (txt_input[0] + " " + this.myConcat(txt_input.slice(1)));
        }
    };

    window.Cmd = Cmd;
})();
