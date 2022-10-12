const Discord = require('discord.js');

module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to change the volume!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to change the volume!**"
        );
    }
    else
    if(!args[0])
    {
        if(!serverQueue)
        {
            return message.channel.send(
                "❌ **No song playing to see the volume!**"
            );
        }
        else
        {
            //var curVol = Number(serverQueue.connection.dispatcher.volume*100);
            var curVol = Number(serverQueue.volume*100);
            message.channel.send("🔊 **Current volume: **" + `${curVol}`);
        }
    }
    else
    if(args[0] && !serverQueue)
    {
        return message.channel.send(
            "❌ **You can't change the volume if there is no song playing!**"
        );
    }
    else
    if(args[0] / 100 === serverQueue.volume)
    {
        message.channel.send(`**The volume is already set to ${args[0]}!**`);
    }
    else
    if(Number(args[0]) <= 0 || Number(args[0]) > 100)
    {
        message.channel.send("❌ **You can only set the volume from 1-100**");
    }
    else
    {
        var newVol = args[0] / 100;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(newVol);
        serverQueue.volume = newVol;
        message.channel.send("🔊 **Volume set to: **" + `${args[0]}`);
    }
}

module.exports.help = {
    name: "volume",
    aliases:["vol", "v"] //to add more aliases separate with commas ex: "p", "pin"
}