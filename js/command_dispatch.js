function cmd_dispatch(input) {
    var split_input = input.split(" "); // split the input by space
    switch (split_input[0]) {
        case "ls":
            switch (split_input.length){
                case 1:
                    // error
                case 2:
                    show_tweets(null, split_input[1]);
                case 3:
                    show_tweets(split_input[1], split_input[2]);
                default:
                    // error
            }
        case "reply":
            if (split_input.length < 3){
                //error
            }
            reply_tweet(split_input[1], split_input.slice(2));
        case "rt": //retweet
            if (split_input.length < 3){
                //error
            }
            retweet(split_input[1], split_input.slice(2));
        case "tweet": // send a tweet
            if (split_input.length < 2){
                //error
            }
            tweet(split_input.slice(1));
        case "whois": // show one user's profile
            if (split_input.length != 2){
                // error
            }
            show_usr(split_input[1]);
    };
}

function show_tweets(option, param){

}

function reply_tweet(option, param){

}

function retweet(option, param){

}

function tweet(txt){
    if !(txt[0] == "\"" && txt[-1] == "\"") {
        //error
    }
}

function show_usr(usrname){

}