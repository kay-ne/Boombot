const Discord = require('discord.js');
const search = require('yt-search');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
    {
        return message.channel.send(
            "❌ **You need to be in a voice channel to search for music!**"
        );
    }
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to search for music!**"
        );
    }
    if(!args[0] && !args[0])
    {
        return message.channel.send(
            "❌ **You have to provide a query to search!**"
        );
    }
    else
    {
        //return message.channel.send("**Sorry the search command is currently unavailable!**");
        const cancel = ['cancel'];
        search(args.join(' '), async function(err, res) {
            if(err)
            {
                return message.channel.send("Sorry, something went wrong.");
            }

            let videos = res.videos.slice(0,5);

            let response = '';
            for(var i in videos)
            {
                response += `**[${parseInt(i)+1}] **[${videos[i].title}](${videos[i].url}) | ${videos[i].timestamp}\n`;
            }

            response += `\n**Choose a number between: ** \`1-${videos.length}\``;
            
            searchEmbed = await new Discord.MessageEmbed()
                .setColor('#5cbeff')
                .setAuthor('Search', 'https://imgur.com/xBzkgG0.png')
                .setDescription(response + "\n\ntype `cancel` to stop search.")
            message.channel.send(searchEmbed);

            const filter = m => ((m.content < videos.length+1 && m.content > 0) || cancel.includes(m.content.toLowerCase()));
            const collector = message.channel.createMessageCollector(filter);
            
            collector.videos = videos;

            collector.once('collect', async function(m)
            {
                if(m.content.toLowerCase() === 'cancel')
                {
                    collector.stop();
                    message.channel.send("✅ **Search cancelled!**");
                }
                else
                {
                    let commandFile = require(`./play.js`);
                    commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], serverQueue, ops);
                    //message.channel.send(`Now Playing: **${this.videos[parseInt(m.content)-1].title}**`);     
                }
            })  
        });
    }
}

module.exports.help = {
    name: "search",
    aliases:[] //to add more aliases separate with commas ex: "p", "pin"
}