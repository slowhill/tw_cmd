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
            $('.cmdline').val('');
            $(document).scrollTop($(document).height()); // scrolls to the bottom
        }
    })
});

function appendTo(param) {
    $.each(param, function(index, tweet) {
        $('#output').append(tweet.text+"<br/>");
    });
    //$('#output').append(param);
    console.log("appendTo");
    console.log(param);
}