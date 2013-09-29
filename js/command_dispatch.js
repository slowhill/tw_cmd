(function() {

    var Cmd = {
        dispatch: function(input) {
            var split_input = input.split(" "); // split the input by space
            //console.log("went to cmd_dispatch");
            switch (split_input[0]) {
                case "tl":
                    switch (split_input.length){
                        case 1:
                            var tweets = this.showTweets(null, null);
                            //console.log("dem tweets")
                            //console.log(tweets);
                            break;
                        case 2:
                            this.showTweets(split_input[1], null);
                            break;
                        case 3: //user, specific number
                            this.showTweets(split_input[1], split_input[2]);
                            //show_tweets(split_input[1], split_input[2]);
                            break;
                        default:
                            // error
                            break;
                    }
                    break;
                case "reply":
                    if (split_input.length < 3){
                        //error
                        break;
                    }
                    this.replyTweet(split_input[1], split_input.slice(2));
                    break;

                case "rt": //retweet
                    if (split_input.length < 3){
                        //error
                    }
                    this.retweet(split_input[1], split_input.slice(2));
                    break;

                case "tweet": // send a tweet
                    if (split_input.length < 2){
                        //error
                    }
                    this.tweet(this.myConcat(split_input.slice(1)));
                    break;

                case "whois": // show one user's profile
                    if (split_input.length != 2){
                        // error
                    }
                    //show_usr(split_input[1]);
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
                        // show the tweets of one user
                        break;
                    case "-t":
                        // show what is trending
                        // options will be local and global and specific location
                        break;
                    case "-n":
                        // show a specific number of tweets
                        break;
                    case "more":
                        if (param == null) {
                            Twitter.api("statuses/home_timeline", {max_id: localStorage.getItem('lastTweetId')}, "GET", $.proxy(function(response){
                                twOps.formatTimelineforTerm(response);
                            }));
                        }
                        break;
                    default:
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
                id = param[0];
                reply_msg = this.myConcat(param.slice(1));
                this.tweet(reply_msg, id);
                
            } else{
                //error
            }
        },
        retweet: function(option, param) {
            if (option == "-u"){ // retweet a user's last tweet
                console.log("retweet a user");
                //TODO: insert API call here
            } else if (option == "-id"){ // retweet a specific tweet
                console.log("retweet a specific id");
                id = param[0];
                console.log(id);
                Twitter.api('statuses/retweet/' + id, 'POST', {include_entities: true}, $.proxy(function(response){
                    console.log(response);
                }));
                
            } else{
                //error
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
        showUsr: function(usrname) {
            //TODO: insert API call here
            console.log("showUsr");
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
