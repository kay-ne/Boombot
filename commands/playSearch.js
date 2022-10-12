const Discord = require('discord.js');
const search = require('yt-search');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    search(args.join(' '), function(err, res) {
        if(err)
        {
            return message.channel.send("**Sorry, Boombot couldn't find **" + "`" + args.join(' ') + "`**.**" + " **Try being more specific or use** `search`**.**");
        }
        let commandFile = require(`./play.js`);
        
        let videos = res.videos.slice(0,1);

        commandFile.run(client, message, [videos[0].url], serverQueue, ops);
        //message.channel.send(`Now Playing: **${this.videos[parseInt(m.content)-1].title}**`);
    });
}

module.exports.help = {
    name: "playSearch",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}