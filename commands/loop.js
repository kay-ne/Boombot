const ytdl = require('ytdl-core');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to loop!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to loop!**"
        );
    }
    else
    if(!serverQueue)
    {
        return message.channel.send(
            "❌ **There is no song to loop!**"
        );
    }
    else
    if(serverQueue.songs[0].duration > -1 && serverQueue.songs[0].duration < 1)
    {
        return message.channel.send(`❌ **You can't loop a livestream!**`);
    }
    else
    if(serverQueue.loop === false)
    {
        serverQueue.loop = true;
        return message.channel.send(`🔁 **Loop enabled!**`);
    }
    else
    {
        serverQueue.loop = false;
        return message.channel.send(`🔁 **Loop disabled!**`);
    }
}

module.exports.help = {
    name: "loop",
    aliases:["l"] //to add more aliases separate with commas ex: "p", "pin"
}