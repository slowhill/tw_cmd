var command_dictionary = 
    [
        {
            name: "help",
            command: "help",
            description: "Shows hows to use all the commands",
            usage: "help [command]"
        },
        {
            name:"tl",
            command: "tl",
            description: "Shows the timeline of a user's tweets",
            options:[
                {
                    syntax: "-u &lt;screenName&gt;",
                    description: "Shows the tweets of a specific user"
                },
                {
                    syntax: "-n &lt;number&gt;",
                    description: "Shows only the number of specified tweets"
                },
                {
                    syntax: "more [mentions]",
                    description: "Shows more tweets"
                },
                {
                    syntax: "mentions",
                    description: "Shows the tweets you are mentioned in"
                }
            ]
        },
        {
            name:"reply",
            command: "reply -id &lt;tweetId> \"&lt;message&gt;\"",
            description: "Replies to a specific tweet, where tweetID is the number the tweet shows up as in tl"
        },
        {
            name:"tweet",
            command: "tweet \"&lt;update&gt;\"",
            description: "Makes a new tweet using update as the content"
        },
        {
            name:"rt",
            command: "rt -id &lt;tweetId&gt;",
            description: "Retweets the tweet with tweetId, where tweetId is the number the tweet shows up as in tl"
        },
        {
            name:"whois",
            command: "whois &lt;screenName&gt;",
            description: "Shows the details of the user with screenName"
        },
        {
            name:"fav",
            command: "fav -id &lt;tweetId&gt;",
            description: "Favorites the tweet with tweetId, where tweetId is the number the tweet shows up as in tl"
        },
        {
            name:"clear",
            command:"clear",
            description: "Clears the terminal of old entries."
        },
        {
            name:"cc",
            command:"cc",
            description: "Changes the color of the terminal"
        }
    ];