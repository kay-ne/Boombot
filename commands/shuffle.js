module.exports.run = async(client, message, args, serverQueue, ops) => 
{
    if(!message.member.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in a voice channel to shuffle the queue!**"
        );
    }
    else
    if(message.member.voice.channel !== message.guild.me.voice.channel)
    {
        return message.channel.send(
            "❌ **You have to be in the same voice channel as Boombot to shuffle!**"
        );
    }
    else
    if(!serverQueue.songs || serverQueue.songs.length < 2)
    {
        return message.channel.send(
            "❌ **There are no songs to shuffle!**"
        );
    }
    else
    if(serverQueue.songs.length < 3)
    {
        return message.channel.send(
            "❌ **There are not enough songs to shuffle!**"
        );
    }
    else
    {
        var currIndex = serverQueue.songs.length, tempValue, randValue;
            
        while(0 !== currIndex)
        {
            var y = 0;
            randValue = Math.floor(Math.random()*currIndex);
            currIndex -= 1;
    
            if(y != randValue)
            {
                tempValue = serverQueue.songs[currIndex];
                serverQueue.songs[currIndex] = serverQueue.songs[randValue];
                serverQueue.songs[randValue] = tempValue;
            }
        }
            //console to see song queue if shuffled
            //console.log(serverQueue.songs);
        return message.channel.send("✅ **Queue shuffled!**");
    }
}

module.exports.help = {
    name: "shuffle",
    aliases:["sh"] //to add more aliases separate with commas ex: "p", "pin"
}