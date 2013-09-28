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
                            console.log("dem tweets")
                            console.log(tweets);
                            break;
                        case 2:
                            // error
                            break;
                        case 3:
                            this.showTweets(split_input[1], split_input[2]);
                            //show_tweets(split_input[1], split_input[2]);
                            break;
                        default:
                            // error
                            break;
                    }
                case "reply":
                    if (split_input.length < 3){
                        //error
                        break;
                    }
                    this.replyTweet(split_input[1], split_input.slice(2));
                    //reply_tweet(split_input[1], split_input.slice(2));
                case "rt": //retweet
                    if (split_input.length < 3){
                        //error
                    }
                    this.retweet(split_input[1], split_input.slice(2));
                    //retweet(split_input[1], split_input.slice(2));
                case "tweet": // send a tweet
                    if (split_input.length < 2){
                        //error
                    }
                    this.tweet(this.myConcat(split_input.slice(2)));
                    //tweet(split_input.slice(1));
                case "whois": // show one user's profile
                    if (split_input.length != 2){
                        // error
                    }
                    //show_usr(split_input[1]);
            }
        },
        showTweets: function(option, param) {
            if (option == null && param == null){ // no parameters so show all tweets

                Twitter.api("statuses/home_timeline", "GET", $.proxy(function(response){
                    //callback(twOps.getTimeline(data));
                    appendTo(twOps.getTimeline(response));
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
                //TODO: insert API call here
            } else{
                //error
            }
        },
        tweet: function(txt) {
            if (txt[0] != "\"" || txt[-1] != "\"") {
                //error
            }
            //TODO: insert API call here
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
            return (txt_input[0] + " " + txt_input.slice(1));
        }
    };

    window.Cmd = Cmd;
})();
