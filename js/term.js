function tweet(id, uname, sname, text, summary, timestamp){
    this.id = id;
    this.user = uname;
    this.screen = sname;
    this.text = text;
    this.timestamp = twOps.formatTimestamp(timestamp);
    
    if (summary.retweeted_status != null) { //Retweeted from someone
        this.isRetweet = true;
        this.rtFrom = summary.retweeted_status.user.name;
        this.rtFromHandle = summary.retweeted_status.user.screen_name;
    } else {
        this.isRetweet = false;
    }
}

$(document).ready(function(){
    console.log("document ready!");
    $(document).scrollTop($(document).height()); // scrolls to the bottom
    if (localStorage.getItem('prevTerm') !== null) {
        $('#output').append(localStorage.getItem('prevTerm'));
    } else {
        $('#output').append('<div><div class=\"prompt history\">$></div><div class=\"input-line history\">' + 
                            'Welcome! Input "help" for more details.' + '</div></div>');
    }
    $('.cmdline').keypress(function (e){
        if (e.charCode == 13){
            console.log($('.cmdline').val());
            if ($('.cmdline').val() == "clear") {
                clearTerm();
                localStorage.removeItem('prevTerm');
            } else {
                $('#output').append('<div><div class=\"prompt history\">$></div><div class=\"input-line history\">'
                            + $('.cmdline').val() + '</div></div>');
                if($('.cmdline').val() == 'cc'){
                    changeTermCol();
                } else {
                    Cmd.dispatch($('.cmdline').val());
                }
                $('.cmdline').val('');
                $(document).scrollTop($(document).height()); // scrolls to the bottom
                localStorage.setItem('prevTerm', $('#output').html());
            }
        }
    })
});
function appendTo(param) {
    $('#output').append(param+"</br>");
    $('.cmdline').val('');
    localStorage.setItem('prevTerm', $('#output').html());
}

function clearTerm() {
    $('#output').empty();
    $('.cmdline').val('');
}

function isNumber (num) {
  return ! isNaN (num-0);
}

function changeTermCol (){
    if ($('body').css('background-color') == "rgb(0, 0, 0)"){
        $('body').css('background-color', 'white');
        $('div').css('color', '#000000');
        $('h2').css('color', '#000000');
    } else {
        $('body').css('background-color', 'black');
        $('div').css('color', '#48E310');
        $('h2').css('color', '#48E310');
    }
}