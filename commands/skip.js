module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to skip the music!**"
        );
    }
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to skip!**"
        );
    }
    if(!serverQueue)
    {
        return message.channel.send("❌ **There is no song to skip!**");
    }
    else
    if(serverQueue.songs[0] === undefined)
    {
        message.channel.send("❌ **There is no song to skip!**");
        if(serverQueue.songs[0])
        {
            serverQueue.songs.shift();
        }
        return;
    }
    else
    if(args[0] < serverQueue.songs.length) //number of songs to skip
    {
        let msg = await message.channel.send("Skipping...");
        try
        {
            let count = 1;
            for(let x = 1; x < args[0]; x++)
            {
                let y = 1;
                count++;
                serverQueue.songs.splice(y, 1);
                y--;
            }
            message.channel.send(`✅ Successfully skipped **${count}** songs!`);
            msg.delete();
            serverQueue.connection.dispatcher.end();
            return;
        }
        catch
        {
            msg.delete();
            return message.channel.send("**Sorry an error occurred when skipping!**");
        }
    }
    else
    if(args[0] > serverQueue.songs.length)
    {
        return message.channel.send("❌ Can't skip over queue length! If you want to skip the whole queue, use the `clear` command!");
    }
    else //livestream
    if(serverQueue.songs[0].duration > -1 && serverQueue.songs[0].duration < 1)
    {
        serverQueue.connection.dispatcher.end();
        message.channel.send(`✅ **Song skipped!**`);
    }
    else //video
    {
        if(serverQueue.loop === true)
        {
            return message.channel.send("**You have the song on loop! Please use `loop` to disable and proceed with `skip`!**");
        }
        else
        {
            serverQueue.connection.dispatcher.end();
            return message.channel.send(`✅ **Song skipped!**`);
        }
    }
}

module.exports.help = {
    name: "skip",
    aliases:["s", "sk"] //to add more aliases separate with commas ex: "p", "pin"
}