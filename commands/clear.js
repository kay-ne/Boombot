//CLEARS QUEUE EXCEPT CURRENT SONG
module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to clear the queue!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to clear!**"
        );
    }
    else
    if(!serverQueue)
    {
        return message.channel.send(
            "❌ **There are no songs in the queue to clear!**"
        )
    }
    if(!serverQueue.songs[1])
    {
        return message.channel.send(
            "❌ **There are no songs in the queue to clear!**"
        )
    }
    else
    {
        serverQueue.songs = [serverQueue.songs[0], ];
        message.channel.send("✅ **Queue cleared!**");
    }
}

module.exports.help = {
    name: "clear",
    aliases:["cl"] //to add more aliases separate with commas ex: "p", "pin"
}