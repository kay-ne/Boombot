module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to resume the music!**"
        );
    }
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to resume!**"
        );
    }
    if(serverQueue.songs[0] === undefined)
    {
        message.channel.send("❌ **There is no song to resume!**");
        if(serverQueue.songs[1])
        {
            serverQueue.songs.shift();
        }
        return;
    }
    else
    {
        serverQueue.connection.dispatcher.resume(true);
        message.channel.send ("▶️ **Music resume.**");
    }
}

module.exports.help = {
    name: "resume",
    aliases:["re"] //to add more aliases separate with commas ex: "p", "pin"
}