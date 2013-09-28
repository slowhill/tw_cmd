function tweet(id, uname, sname, text, isRetweet, timestamp){
    this.id = id;
    this.user = uname;
    this.screen = sname;
    this.text = text;
    this.isRetweet = isRetweet;
    this.timestamp = timestamp;
}

$(document).ready(function(){
    console.log("document ready!");
    $('.cmdline').keypress(function (e){
        if (e.charCode == 13){
            console.log($('.cmdline').val());
            var result = Cmd.dispatch($('.cmdline').val());
            $('#output').append('<div><div class=\"prompt history\">$></div><div class=\"input-line history\">'
                                + $('.cmdline').val() + '</div></div>');
            $('#output').append(result)
            $('.cmdline').val('');
            $(document).scrollTop($(document).height()); // scrolls to the bottom
        }
    })
});

function getTimeline(tweetarray) {
    var formattedArray = new Array(tweetarray.length);
    $.each(tweetarray, function(key, value) {
    formattedArray[key] = new tweet(value.id, value.user.name, value.user.screen_name,
        getCorrectText(value), value.retweeted_status != null, value.created_at); //format the timestamp
    });
    console.log(formattedArray);
    return formattedArray; //formatted array picking what we need
}

function getCorrectText(tweet) {
    var correctText;
    if(tweet.text.substring(0, 2) == "RT ") {
        correctText = tweet.retweet_status.text;
    } else {
        correctText = tweet.text;
    }
    return correctText;
}