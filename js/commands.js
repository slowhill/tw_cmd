(function(){
    var twOps = {
        getCorrectText: function(tweet) {
            var correctText;
            if(tweet.text.substring(0, 3) == "RT ") {
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
                formattedArray[key] = new tweet(value.id, value.user.name, value.user.screen_name,
                    twOps.getCorrectText(value), value, value.created_at); //format the timestamp
            });
            console.log("twOps.getTimeLine");
            console.log(formattedArray);
            return formattedArray; //formatted array picking what we need
        }
    }
    
    window.twOps = twOps;
})();