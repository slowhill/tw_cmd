(function(){
    var twOps = {
        getCorrectText: function(tweet) {
            var correctText;
            if(tweet.text.substring(0, 3) == "RT " && tweet.retweeted_status) {
                correctText = tweet.retweeted_status.text;
            } else {
                correctText = tweet.text;
            }
            return correctText;
        },
        getTimeline: function(tweetarray) {
	        console.log(tweetarray); //array of tweets
            var formattedArray = new Array(tweetarray.length);
            $.each(tweetarray, function(key, value) {
                formattedArray[key] = new tweet(value.id_str, value.user.name, value.user.screen_name, twOps.getCorrectText(value), value, value.created_at); //format the timestamp
                if (key == (tweetarray.length - 1)) {
                    localStorage.setItem('lastTweetId', value.id);
                }
            });
            console.log("twOps.getTimeLine");
            console.log(formattedArray);
            return formattedArray; //formatted array picking what we need
        },
        formatTimelineforTerm: function(response) {
            var tlReply = new Array(response.length);
            tlReply = twOps.getTimeline(response);
            $.each(tlReply, function(index, tweet){
                //console.log(tweet);
                var twStr = index + ". ";
                if (!tweet.isRetweet) {
                    twStr += tweet.user + " (@" + tweet.screen + "): " + tweet.text;
                } else if (tweet.isRetweet) {
                    twStr += tweet.rtFrom + " (@" + tweet.rtFromHandle + "): " + tweet.text+ " -- Retweeted by " + tweet.user + " on " + tweet.timestamp;
                }
                localStorage.setItem(index+"key", tweet.id);
                localStorage.setItem(index+"handler", tweet.screen);
                appendTo(twStr);
            });
        },
        formatTimestamp: function(timestamp) {
            return timestamp.substring(4, 19).trim();
        },
        favouriteTweet: function(tweet) {
            appendTo("Favourited \"" + tweet.text + "\"");
        },
        formatUsrLookup: function(response) {
            console.log(response)
            if (response.errors){ // error with the response
                appendTo("Could not find user");
            }
            
            var usrlookup = response[0];
            
            appendTo(usrlookup.name);
            appendTo(usrlookup.location);
            appendTo(usrlookup.description);
            appendTo("Tweets: " + usrlookup.statuses_count);
            appendTo("Followers: " + usrlookup.followers_count);
            if (usrlookup.following){
                appendTo("You are following " + usrlookup.screen_name);
            } else {
                appendTo("You are not following " + usrlookup.screen_name);
            }
        },
        formatCommand: function(command){
            console.log(command);
            appendTo("COMMAND:");
            appendTo(command.command);
            appendTo(command.description);
            appendTo("");
            
            if (command.options){
                appendTo("OPTIONS:")
                for (i in command.options){
                    var op = command.options[i];
                    appendTo(op.syntax);
                    appendTo(op.description);
                }
            }
        }
    }
    
    window.twOps = twOps;
})();