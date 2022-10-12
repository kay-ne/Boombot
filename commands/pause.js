module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to pause the music!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to pause!**"
        );
    }
    else
    {
        serverQueue.connection.dispatcher.pause(true);
        message.channel.send("⏸️ **Music paused.**");
    }
}

module.exports.help = {
    name: "pause",
    aliases:["pa"] //to add more aliases separate with commas ex: "p", "pin"
}