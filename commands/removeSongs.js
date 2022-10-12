module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to remove a song!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to remove a song!**"
        );
    }
    else
    if(!serverQueue)
    {
        return message.channel.send("❌ **There are no songs in queue to remove!**");
    }
    else
    if(!args[0])
    {
        return message.channel.send("❌ **You must provide a number or a start and end indexes to remove songs!\nFormat: `remove <#>` or `remove <start> <end>`**");
    }
    else
    if(args[0] && !args[1])
    {
        if(args[0] > serverQueue.songs.length-1)
        {
           return message.channel.send(`❌ There is no song at **${args[0]}**!`);
        }
        else
        if(args[0] < 1 && args[0] > -1)
        {
            return message.channel.send("❌ **You can't remove the current song!**");
        }
        else
        {
            const index = serverQueue.songs.indexOf(serverQueue.songs[args[0]]);
            const title = serverQueue.songs[args[0]].title;
            if(index > 0)
            {
                serverQueue.songs.splice(index, 1);
            }
            return message.channel.send(`✅ Succesfully removed **${title}** from queue!`);
        }
    }
    else
    if(args[0] && args[1])
    {
        let start = args[0];
        let end = args[1];
        if(end > serverQueue.songs.length-1)
        {
            return message.channel.send(`❌ There is no song at **${args[1]}**!`);
        }
        else
        if(start < 1 && start > -1)
        {
            return message.channel.send("❌ **You can't remove the current song!**");
        }
        else
        if(parseInt(start) > parseInt(end))
        {
            return message.channel.send("❌ **Invalid inputs! Please put in the format of:\n`remove <start> <end>`**");
        }
        else
        {
            let count = 0;

            let msg = await message.channel.send("Removing songs...");
            for(let x = serverQueue.songs.indexOf(serverQueue.songs[end]); x >= start; x--)
            {
                count++;
                serverQueue.songs.splice(x, 1);
            }
            message.channel.send(`✅ Succesfully removed **${count}** songs from queue!`);
            msg.delete();
            return;
        }
    }
}

module.exports.help = {
    name: "remove",
    aliases:["r"] //to add more aliases separate with commas ex: "p", "pin"
}