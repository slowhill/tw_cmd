$(document).ready(function(){
    console.log("document ready!");
    $('.cmdline').keypress(function (e){
        if (e.charCode == 13){
            console.log($('.cmdline').val());
            $('#output').append('<div><div class=\"prompt history\">$></div><div class=\"input-line history\">'
                                + $('.cmdline').val() + '</div></div>');
            $('.cmdline').val('');
            $(document).scrollTop($(document).height()); // scrolls to the bottom
        }
    })
});