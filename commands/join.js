module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to make the bot join!**"
        );
    }
    else
    if(!serverQueue && message.member.voice.channel !== undefined)
    {
        message.member.voice.channel.join();
        message.channel.send("👍 **Boombot has joined the voice channel!**");
    }
    else
    if(serverQueue && message.member.voice.channel !== undefined)
    {
        serverQueue.songs = [];
        message.member.voice.channel.join();
        message.channel.send("👍 **Boombot has joined the voice channel!**");
    }
    else
    if(serverQueue && message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **Boombot is in another voice channel and can't join right now!**"
        );
    }
}
        
module.exports.help = {
    name: "join",
    aliases:["j"] //to add more aliases separate with commas ex: "p", "pin"
}