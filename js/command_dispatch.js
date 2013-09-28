(function(input) {

    var Cmd = {
        dispatch: function(input) {
            var split_input = input.split(" "); // split the input by space
            console.log("went to cmd_dispatch");
            switch (split_input[0]) {
                case "ls":
                    switch (split_input.length){
                        case 1:
                            // error
                        case 2:
                            this.showTweets(null, split_input[1]);
                            //show_tweets(null, split_input[1]);
                        case 3:
                            this.showTweets(split_input[1], split_input[2]);
                            //show_tweets(split_input[1], split_input[2]);
                        default:
                            // error
                    }
                case "reply":
                    if (split_input.length < 3){
                        //error
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
                    this.tweet(split_input.slice(1));
                    //tweet(split_input.slice(1));
                case "whois": // show one user's profile
                    if (split_input.length != 2){
                        // error
                    }
                    //show_usr(split_input[1]);
            }
        },
        showTweets: function(option, param) {
            console.log("show_tweets");
        },
        replyTweet: function(option, param) {
            console.log("reply_tweets");
        },
        retweet: function(option, param) {
            console.log("retweet");
        },
        tweet: function(txt) {
            if !(txt[0] == "\"" && txt[-1] == "\"") {
                //error
            }
            console.log("tweet");
        },
        showUsr: function(usrname) {
            console.log("showUsr");
        }
    };

    window.Cmd = Cmd;
})();
