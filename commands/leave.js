module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to make the bot leave!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to make it leave!**"
        );
    }
    else
    {
        if(serverQueue)
        {
            serverQueue.songs = [];
        }
        ops.queue.delete(message.guild.id);
        message.member.voice.channel.leave(true);
        message.channel.send("👋 **Boombot has left the voice channel!**");
        
    }
}

module.exports.help = {
    name: "leave",
    aliases:["le"] //to add more aliases separate with commas ex: "p", "pin"
}